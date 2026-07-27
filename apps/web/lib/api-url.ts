// Server-side: use internal Docker network name when available
// Client-side: NEXT_PUBLIC_API_URL is baked in at build time
export const SERVER_API =
  process.env.INTERNAL_API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";
