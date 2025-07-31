// app/api/ably/route.ts
import { NextResponse } from "next/server";
import Ably from "ably/promises";

export async function GET() {
  const client = new Ably.Rest(
    "CBwIKA.woc3jA:KQEcUQrKxMpZRK3eSqhZuGmqwxAe_Rwu4Fm9yBifHKk"
  );
//   const client = new Ably.Rest(process.env.ABLY_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "live-cursors-demo",
  });
  return NextResponse.json(tokenRequestData);
}
