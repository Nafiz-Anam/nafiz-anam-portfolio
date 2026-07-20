"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const GUIDES = [
  {
    slug: "building-scalable-saas-platforms",
    title: "Building Scalable SaaS Platforms",
    description:
      "Architecture, multi-tenancy, billing, and deployment — everything you need to build a SaaS that scales beyond the MVP.",
    category: "SaaS",
    readingTime: "22 min read",
  },
  {
    slug: "docker-in-production-guide",
    title: "Docker in Production",
    description:
      "A complete guide to running Docker reliably in production: volumes, networking, Compose, CI/CD pipelines, and zero-downtime deployments.",
    category: "Cloud & DevOps",
    readingTime: "18 min read",
  },
  {
    slug: "server-side-tracking-explained",
    title: "Server-Side Tracking Explained",
    description:
      "Why client-side tracking is dying, how server-side tracking works, and how to implement it without losing critical analytics data.",
    category: "Software Engineering",
    readingTime: "14 min read",
  },
  {
    slug: "choosing-right-tech-stack",
    title: "Choosing the Right Tech Stack",
    description:
      "A framework for evaluating technology choices that goes beyond hype — considering team, timeline, maintainability, and future scale.",
    category: "Architecture",
    readingTime: "16 min read",
  },
  {
    slug: "modern-software-architecture",
    title: "Modern Software Architecture",
    description:
      "From layered to event-driven. A practical map of architectural patterns, when to use each, and the trade-offs that matter in the real world.",
    category: "Architecture",
    readingTime: "25 min read",
  },
  {
    slug: "building-ai-business-automation",
    title: "Building AI Business Automation",
    description:
      "Move beyond chatbots. Learn to design RAG pipelines, workflow automation, and intelligent decision systems using modern AI tooling.",
    category: "Artificial Intelligence",
    readingTime: "20 min read",
  },
  {
    slug: "cloud-deployment-best-practices",
    title: "Cloud Deployment Best Practices",
    description:
      "Infrastructure, CI/CD, secrets management, monitoring, and rollback strategies — the complete production deployment playbook.",
    category: "Cloud & DevOps",
    readingTime: "19 min read",
  },
] as const;

export function PopularGuides() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="popular-guides"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-20 flex flex-col gap-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Popular Guides
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Evergreen Content for{" "}
            <span className="font-serif italic text-accent">
              Technical Decision-Makers
            </span>
          </h2>
        </motion.div>

        {/* Guides list */}
        <div className="flex flex-col divide-y divide-foreground/[0.07]">
          {GUIDES.map((guide, i) => (
            <motion.a
              key={guide.slug}
              href={`/insights/${guide.slug}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.04 }}
              className="group relative flex items-start gap-8 py-8 sm:items-center"
              onMouseEnter={() => setHovered(guide.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Number */}
              <span
                className="shrink-0 font-mono text-[52px] font-bold leading-none tracking-tight transition-colors duration-200 sm:text-[64px]"
                style={{
                  color:
                    hovered === guide.slug
                      ? "hsl(var(--accent) / 0.55)"
                      : "hsl(var(--foreground) / 0.06)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-[18px] font-bold leading-snug tracking-tight text-foreground transition-colors duration-150 group-hover:text-accent sm:text-[20px]">
                    {guide.title}
                  </p>
                  <p className="max-w-[560px] text-[13px] leading-[1.75] text-foreground/40 transition-colors duration-150 group-hover:text-foreground/55">
                    {guide.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <span className="rounded-[3px] border border-accent/20 bg-accent/[0.06] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                    {guide.category}
                  </span>
                  <span className="text-[11px] text-foreground/28 sm:text-right">
                    {guide.readingTime}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <motion.span
                className="hidden shrink-0 text-foreground/20 transition-colors duration-150 group-hover:text-accent sm:block"
                animate={{ x: hovered === guide.slug ? 5 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
