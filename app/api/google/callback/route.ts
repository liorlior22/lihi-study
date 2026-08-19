import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  email?: string;
  name?: string;
};

const secureCookie = process.env.NODE_ENV === "production";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("lihi_google_oauth_state")?.value;

  if (error) {
    cookieStore.delete("lihi_google_oauth_state");
    return NextResponse.redirect(new URL(`/?google=${encodeURIComponent(error)}`, request.url));
  }

  if (!clientId || !clientSecret || !code || !state || !expectedState || state !== expectedState) {
    cookieStore.delete("lihi_google_oauth_state");
    return NextResponse.redirect(new URL("/?google=error", request.url));
  }

  const redirectUri = `${request.nextUrl.origin}/api/google/callback`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;

  if (!tokenResponse.ok || !tokenData.access_token) {
    cookieStore.delete("lihi_google_oauth_state");
    return NextResponse.redirect(new URL("/?google=token-error", request.url));
  }

  let userInfo: GoogleUserInfo = {};
  try {
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    });
    if (userResponse.ok) userInfo = (await userResponse.json()) as GoogleUserInfo;
  } catch {
    // The Calendar connection can still work even if profile lookup fails.
  }

  cookieStore.set("lihi_google_access_token", tokenData.access_token, {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(300, tokenData.expires_in ?? 3600),
  });

  if (tokenData.refresh_token) {
    cookieStore.set("lihi_google_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "lax",
      path: "/",
      maxAge: 180 * 24 * 60 * 60,
    });
  }

  cookieStore.set("lihi_google_connected", "1", {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 180 * 24 * 60 * 60,
  });

  if (userInfo.email) {
    cookieStore.set("lihi_google_email", userInfo.email, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "lax",
      path: "/",
      maxAge: 180 * 24 * 60 * 60,
    });
  }

  if (userInfo.name) {
    cookieStore.set("lihi_google_name", userInfo.name, {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "lax",
      path: "/",
      maxAge: 180 * 24 * 60 * 60,
    });
  }

  cookieStore.delete("lihi_google_oauth_state");
  return NextResponse.redirect(new URL("/?google=connected", request.url));
}
