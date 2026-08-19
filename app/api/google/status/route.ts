import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const configured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const connected = cookieStore.get("lihi_google_connected")?.value === "1";

  return Response.json(
    {
      configured,
      connected,
      email: connected ? cookieStore.get("lihi_google_email")?.value : undefined,
      name: connected ? cookieStore.get("lihi_google_name")?.value : undefined,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
