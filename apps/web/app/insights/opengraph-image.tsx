import { ImageResponse } from "next/og";
import { ogImageTemplate, ogImageSize, ogImageContentType } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Insights — Nafiz Anam";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      headlineLines: ["Insights"],
      sub: "Practical engineering insights, architecture lessons, and technical leadership perspectives.",
    }),
    { ...size }
  );
}
