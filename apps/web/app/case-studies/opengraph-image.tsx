import { ImageResponse } from "next/og";
import { ogImageTemplate, ogImageSize, ogImageContentType } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Case Studies — Nafiz Anam";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      headlineLines: ["Case Studies"],
      sub: "Real engineering challenges, measurable business outcomes, across healthcare, logistics, finance, and more.",
    }),
    { ...size }
  );
}
