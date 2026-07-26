import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type") as "blog" | "project" | null;

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!slug || !type) {
    return new Response("slug and type required", { status: 400 });
  }

  (await draftMode()).enable();

  const path = type === "blog" ? `/insights/${slug}` : `/case-studies/${slug}`;
  redirect(path);
}
