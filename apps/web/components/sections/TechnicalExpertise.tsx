"use client";

import { motion } from "framer-motion";
import { SectionReveal, titleVariants, bodyVariants, cardVariants } from "@/components/ui/SectionReveal";

const CAPABILITIES = [
  {
    title: "Frontend Engineering",
    description: "Designing fast, accessible and scalable user interfaces.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "React Native"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Backend Technology",
    description: "Building secure APIs and scalable business logic.",
    tags: ["Node.js", "NestJS", "Express", "Laravel", "PHP", "GraphQL"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H2" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        <path d="M6 16h.01M10 16h.01" />
      </svg>
    ),
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploying reliable, secure and scalable production environments.",
    tags: ["AWS", "Docker", "Kubernetes", "Nginx", "Cloudflare"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: "Data Engineering",
    description: "Designing efficient and scalable data architectures.",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    description: "Building intelligent workflows and AI-powered business solutions.",
    tags: ["OpenAI", "Claude", "LangChain", "AI Agents", "Workflow Automation"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
        <path d="M9 11v2M15 11v2M9 17s1 1 3 1 3-1 3-1" />
      </svg>
    ),
  },
  {
    title: "Architecture & Leadership",
    description: "Leading engineering teams and designing scalable software systems.",
    tags: ["System Design", "Microservices", "Code Reviews", "Mentoring", "Scalability"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
] as const;

function CapabilityRow({
  title,
  description,
  tags,
  icon,
  isLast,
}: (typeof CAPABILITIES)[number] & { isLast: boolean }) {
  return (
    <>
      <div className="group relative transition-colors duration-[250ms] hover:bg-panel-foreground/[0.025]">
        {/* left orange accent bar */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-transparent transition-all duration-[250ms] group-hover:bg-accent" />

        <div className="flex flex-col gap-6 px-10 py-11 lg:flex-row lg:items-start lg:gap-0">

          {/* left: icon + title + description */}
          <div className="flex shrink-0 gap-4 lg:w-[38%] lg:pr-14">
            <span className="mt-0.5 shrink-0 text-panel-foreground/40 transition-colors duration-[250ms] group-hover:text-accent">
              {icon}
            </span>
            <div className="flex flex-col gap-1.5">
              <p className="text-[15px] font-bold leading-snug tracking-tight text-panel-foreground">
                {title}
              </p>
              <p className="text-[12px] leading-[1.75] text-panel-foreground/45">
                {description}
              </p>
            </div>
          </div>

          {/* right: chips */}
          <div className="flex flex-1 flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-panel-foreground/10 bg-panel-foreground/[0.04] px-3 py-1.5 text-[11px] font-medium leading-none text-panel-foreground/65 transition-all duration-[250ms] group-hover:border-panel-foreground/20 group-hover:bg-panel-foreground/[0.07]"
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

export function TechnicalExpertise() {
  return (
    <section
      id="expertise"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">

        {/* Header */}
        <SectionReveal className="mb-20 flex flex-col items-center gap-5 text-center" stagger={0.14}>
          <motion.p variants={bodyVariants} className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Technical Expertise
          </motion.p>
          <div style={{ overflow: "hidden" }}>
            <motion.h2 variants={titleVariants} className="max-w-[700px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Modern Technologies.{" "}
              <span className="font-serif italic text-accent">Practical Experience.</span>
            </motion.h2>
          </div>
          <motion.p variants={bodyVariants} className="max-w-[640px] text-[15px] leading-relaxed text-foreground/55">
            Technology choices get made based on business requirements, not trends.
            Every tool below has shipped in a real production environment.
          </motion.p>
        </SectionReveal>

        {/* Capability matrix — rows stagger in */}
        <SectionReveal className="overflow-hidden rounded-[5px] border border-panel-foreground/10 bg-panel-foreground/[0.04]" stagger={0.09} delay={0.05}>
          {CAPABILITIES.map((cap, i) => (
            <motion.div key={cap.title} variants={cardVariants}>
              <CapabilityRow
                {...cap}
                isLast={i === CAPABILITIES.length - 1}
              />
            </motion.div>
          ))}
        </SectionReveal>

      </div>
    </section>
  );
}
