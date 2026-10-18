const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const apiHostname = (() => {
  try { return new URL(API_URL).hostname; } catch { return "localhost"; }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@portfolio/ui", "@portfolio/types"],

  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "4000", pathname: "/uploads/**" },
      { protocol: "https", hostname: apiHostname, pathname: "/uploads/**" },
    ],
    // Default imageSizes jumps 384 -> 640 (first deviceSize), so a fixed
    // ~256-288px slot at 2x DPR (effective 512-576px) gets rounded up all
    // the way to 640px. Filling the gap lets the browser pick a closer size.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480, 576],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
