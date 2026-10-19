const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const apiHostname = (() => {
  try { return new URL(API_URL).hostname; } catch { return "localhost"; }
})();

const isDev = process.env.NODE_ENV !== "production";
const apiOrigin = (() => {
  try { return new URL(API_URL).origin; } catch { return "http://localhost:4000"; }
})();

// GTM (plus the sst.nafizanam.com server-side container) and Turnstile are the only script hosts. Any tag GTM loads
// (Meta, TikTok, etc.) needs its hosts added to script-src / connect-src / img-src.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://sst.nafizanam.com https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https: ${apiOrigin}`,
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} https://sst.nafizanam.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net https://challenges.cloudflare.com`,
  "frame-src https://challenges.cloudflare.com https://www.googletagmanager.com https://sst.nafizanam.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

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
          { key: "Content-Security-Policy", value: csp },
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
