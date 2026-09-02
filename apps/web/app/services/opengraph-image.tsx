import { ImageResponse } from "next/og";
import { ogImageTemplate, ogImageSize, ogImageContentType } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Services — Nafiz Anam";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      headlineLines: ["Engineering", "Services"],
      sub: "Custom software development, SaaS engineering, AI automation, cloud infrastructure, and technical leadership.",
    }),
    { ...size }
  );
}
