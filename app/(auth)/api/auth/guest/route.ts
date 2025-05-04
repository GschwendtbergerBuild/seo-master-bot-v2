import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { signIn } from "@/app/(auth)/auth";
import { isDevelopmentEnvironment } from "@/lib/constants";
import redis from "@/lib/redis";

// Debug‑Log
console.log("▶️ [route] GET /api/auth/guest invoked");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  // Bereits eingeloggt?
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });
  if (token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Guest‑Timestamp in Redis speichern
  await redis.set("guest:lastCreated", new Date().toISOString());

  // Guest‑Login via next-auth
  return signIn("guest", { callbackUrl: redirectUrl });
}
