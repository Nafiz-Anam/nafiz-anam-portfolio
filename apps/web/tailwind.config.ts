import type { Config } from "tailwindcss";
import preset from "@portfolio/config/tailwind.preset.js";

const config: Config = {
  presets: [preset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground) / 0.72)",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--accent))",
            "--tw-prose-bullets": "hsl(var(--accent))",
            maxWidth: "none",
            h2: {
              marginTop: "3em",
              marginBottom: "1em",
              paddingTop: "2em",
              borderTop: "1px solid hsl(var(--foreground) / 0.08)",
              fontWeight: "700",
              letterSpacing: "-0.01em",
            },
            "h2:first-child": {
              marginTop: 0,
              paddingTop: 0,
              borderTop: "none",
            },
            h3: {
              marginTop: "2em",
              marginBottom: "0.75em",
              fontWeight: "700",
            },
            // Kill the browser's native bullet everywhere — only our pseudo-element bullets show.
            ul: { listStyle: "none", paddingLeft: 0, marginLeft: 0 },
            li: { marginTop: "0.5em", marginBottom: "0.5em" },
            // Top-level lists — square checkbox bullets
            "ul > li": {
              position: "relative",
              paddingLeft: "1.85em",
            },
            "ul > li::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "0.32em",
              width: "1.15em",
              height: "1.15em",
              borderRadius: "4px",
              backgroundColor: "hsl(var(--accent) / 0.15)",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E\")",
              backgroundSize: "0.75em",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            },
            // Nested lists — plain dash, no checkbox
            "ul ul": { marginTop: "0.5em", marginBottom: "0.5em" },
            "ul ul > li": {
              paddingLeft: "1.4em",
            },
            "ul ul > li::before": {
              content: '"–"',
              width: "auto",
              height: "auto",
              top: "0",
              left: 0,
              borderRadius: 0,
              backgroundColor: "transparent",
              backgroundImage: "none",
              color: "hsl(var(--accent) / 0.7)",
              fontWeight: "700",
            },
          },
        },
      }),
    },
  },
};

export default config;
