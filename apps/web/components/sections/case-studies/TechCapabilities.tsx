"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CAPABILITIES = [
  {
    group: "Frontend",
    description: "High-performance interfaces that users trust.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js", "React Native"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    group: "Backend",
    description: "Secure APIs and scalable server-side systems.",
    tags: ["Node.js", "NestJS", "Express", "Laravel", "PHP", "REST", "GraphQL", "WebSockets"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        <path d="M6 16h.01M10 16h.01" />
      </svg>
    ),
  },
  {
    group: "Cloud & Infrastructure",
    description: "Reliable, scalable production environments.",
    tags: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Nginx", "Traefik", "Cloudflare", "VPS"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    group: "DevOps & CI/CD",
    description: "Automated pipelines from commit to production.",
    tags: ["GitHub Actions", "GitLab CI", "Jenkins", "Terraform", "Ansible", "Linux", "Monitoring", "Logging"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    group: "Databases",
    description: "Optimized data persistence for any scale.",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Drizzle ORM", "Elasticsearch", "ClickHouse"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    group: "AI & Automation",
    description: "Intelligent systems that reduce manual business overhead.",
    tags: ["OpenAI", "Claude", "LangChain", "AWS", "AI Agents", "MCP", "Workflow Automation"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
        <path d="M9 11v2M15 11v2M9 17s1 1 3 1 3-1 3-1" />
      </svg>
    ),
  },
  {
    group: "Mobile",
    description: "Cross-platform apps with native performance.",
    tags: ["React Native", "Expo", "iOS", "Android", "Push Notifications", "Offline-first", "App Store"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    group: "Architecture & Leadership",
    description: "System design and leadership at scale.",
    tags: ["Microservices", "Event-Driven Design", "Domain-Driven Design", "System Design", "Code Reviews", "Mentoring", "Scalability"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
] as const;

function CapabilityRow({
  group,
  description,
  tags,
  icon,
  isLast,
}: (typeof CAPABILITIES)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative transition-colors duration-[250ms]"
        style={{ backgroundColor: hovered ? "hsl(var(--panel-foreground) / 0.025)" : "transparent" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-all duration-[250ms]"
          style={{ backgroundColor: hovered ? "hsl(var(--accent))" : "transparent" }}
        />

        <div className="flex flex-col gap-6 px-10 py-11 lg:flex-row lg:items-start lg:gap-0">
          <div className="flex shrink-0 gap-4 lg:w-[38%] lg:pr-14">
            <span
              className="mt-0.5 shrink-0 transition-colors duration-[250ms]"
              style={{ color: hovered ? "hsl(var(--accent))" : "hsl(var(--panel-foreground) / 0.4)" }}
            >
              {icon}
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[15px] font-bold leading-snug tracking-tight text-panel-foreground">
                {group}
              </p>
              <p className="text-[12px] leading-[1.75] text-panel-foreground/45">
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3 py-1.5 text-[11px] font-medium leading-none transition-all duration-[250ms]"
                style={{
                  backgroundColor: hovered
                    ? "hsl(var(--panel-foreground) / 0.07)"
                    : "hsl(var(--panel-foreground) / 0.04)",
                  borderColor: hovered
                    ? "hsl(var(--panel-foreground) / 0.20)"
                    : "hsl(var(--panel-foreground) / 0.10)",
                  color: "hsl(var(--panel-foreground) / 0.65)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="mx-10 border-b border-panel-foreground/[0.06]" />
      )}
    </>
  );
}

export function TechCapabilities() {
  return (
    <section className="bg-texture-lines bg-surface py-28 text-panel-foreground">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Technology Capabilities
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            The Right Tool for{" "}
            <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
              Every Problem.
            </span>
          </h2>
          <p className="max-w-[580px] text-[15px] leading-[1.85] text-panel-foreground/50">
            Technology choices are informed by business requirements, not trends. Every capability
            below has been deployed in real production environments serving real users.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.08]"
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityRow
              key={cap.group}
              {...cap}
              isLast={i === CAPABILITIES.length - 1}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
