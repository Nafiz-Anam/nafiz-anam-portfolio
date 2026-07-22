import { NextRequest, NextResponse } from "next/server";

const API = process.env.INTERNAL_API_URL ?? "http://localhost:4000";
const ACCESS_MAX_AGE = 7 * 24 * 60 * 60;       // 7 days in seconds
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60;     // 30 days

export async function POST(req: NextRequest) {
  const body = await req.json();

  const apiRes = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await apiRes.json() as { user?: unknown; accessToken?: string; error?: unknown };

  if (!apiRes.ok || !data.accessToken) {
    return NextResponse.json(data, { status: apiRes.status });
  }

  const secure = process.env.NODE_ENV === "production";
  const res = NextResponse.json({ user: data.user }, { status: 200 });

  // httpOnly — for middleware to read server-side
  res.cookies.set("portfolio_access", data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });

  // non-httpOnly — for axios client to read and send as Bearer
  res.cookies.set("portfolio_access_pub", data.accessToken, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });

  return res;
}
