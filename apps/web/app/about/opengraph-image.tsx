import { ImageResponse } from "next/og";
import { ogImageTemplate, ogImageSize, ogImageContentType } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "About — Nafiz Anam";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      headlineLines: ["About", "Nafiz Anam"],
      sub: "Lead Software Engineer, Software Architect, and Founder helping businesses design, build, and scale reliable software products.",
    }),
    { ...size }
  );
}
