import { NextRequest, NextResponse } from "next/server";

const API = process.env.INTERNAL_API_URL ?? "http://localhost:4000";

export async function POST(req: NextRequest) {
  // Forward logout to Express (revokes refresh token in DB)
  const accessToken = req.cookies.get("portfolio_access")?.value;
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  }).catch(() => {});

  const res = NextResponse.json({ ok: true });
  res.cookies.delete("portfolio_access");
  res.cookies.delete("portfolio_access_pub");
  return res;
}
