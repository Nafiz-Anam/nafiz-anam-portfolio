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
