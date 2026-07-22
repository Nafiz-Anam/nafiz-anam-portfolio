import { NextRequest, NextResponse } from "next/server";

const API = process.env.INTERNAL_API_URL ?? "http://localhost:4000";
const ACCESS_MAX_AGE = 7 * 24 * 60 * 60;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("portfolio_refresh")?.value;
  if (!refreshToken) {
    return NextResponse.json({ error: { message: "no refresh token" } }, { status: 401 });
  }

  const apiRes = await fetch(`${API}/api/auth/refresh`, {
    method: "POST",
    headers: { Cookie: `portfolio_refresh=${refreshToken}` },
  });

  const data = await apiRes.json() as { user?: unknown; accessToken?: string; error?: unknown };

  if (!apiRes.ok || !data.accessToken) {
    const res = NextResponse.json(data, { status: apiRes.status });
    res.cookies.delete("portfolio_access");
    res.cookies.delete("portfolio_access_pub");
    return res;
  }

  const secure = process.env.NODE_ENV === "production";
  const res = NextResponse.json({ user: data.user });

  res.cookies.set("portfolio_access", data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });

  res.cookies.set("portfolio_access_pub", data.accessToken, {
    httpOnly: false,
    secure,
    sameSite: "lax",
    maxAge: ACCESS_MAX_AGE,
    path: "/",
  });

  return res;
}
