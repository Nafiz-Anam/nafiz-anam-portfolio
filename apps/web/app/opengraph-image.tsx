import { ImageResponse } from "next/og";
import { ogImageTemplate, ogImageSize, ogImageContentType } from "@/lib/og-template";

export const runtime = "edge";
export const alt = "Nafiz Anam | Lead Software Engineer & Founder";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return new ImageResponse(
    ogImageTemplate({
      headlineLines: ["Lead Software", "Engineer & Founder"],
      sub: "Helping founders & businesses design, build, and scale reliable software products.",
    }),
    { ...size }
  );
}
