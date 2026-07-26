"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0E0E1D", color: "#F4F4F8", fontFamily: "sans-serif" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8623C", margin: 0 }}>
            Critical error
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0, lineHeight: 1.05 }}>
            Something went wrong
          </h1>
          <p style={{ maxWidth: "360px", fontSize: "15px", lineHeight: 1.8, color: "rgba(244,244,248,0.55)", margin: 0 }}>
            The page failed to load. This has been logged.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={reset}
              style={{
                background: "#E8623C",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "14px 32px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                border: "1px solid rgba(244,244,248,0.1)",
                color: "rgba(244,244,248,0.6)",
                borderRadius: "5px",
                padding: "14px 32px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
