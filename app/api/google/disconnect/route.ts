import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const googleCookies = [
  "lihi_google_access_token",
  "lihi_google_refresh_token",
  "lihi_google_connected",
  "lihi_google_email",
  "lihi_google_name",
  "lihi_google_oauth_state",
];

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  googleCookies.forEach((name) => cookieStore.delete(name));
  return NextResponse.redirect(new URL("/?google=disconnected", request.url));
}
