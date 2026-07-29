"use client";

import { motion } from "framer-motion";
import { SectionReveal, titleVariants, bodyVariants, cardVariants } from "@/components/ui/SectionReveal";

const SERVICES = [
  {
    title: "Custom Software Development",
    description:
      "Build tailored web platforms, enterprise applications, and business systems designed specifically around your workflows and long-term goals.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <polyline points="9 9 12 12 15 9" />
      </svg>
    ),
  },
  {
    title: "SaaS Product Engineering",
    description:
      "Transform ideas into scalable SaaS products with modern architecture, secure infrastructure, and production-ready engineering.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "AI Automation & Business Systems",
    description:
      "Automate repetitive workflows, integrate AI capabilities, and streamline operations to improve productivity and efficiency.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z" />
        <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
        <path d="M9 15s1 1 3 1 3-1 3-1" />
      </svg>
    ),
  },
  {
    title: "Technical Consulting & Architecture",
    description:
      "Receive expert guidance on software architecture, technology decisions, scalability planning, code quality, and technical strategy.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description:
      "Deploy secure, scalable cloud environments with CI/CD pipelines, monitoring, containerization, and reliable infrastructure.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    title: "Engineering Leadership",
    description:
      "Support growing teams with technical leadership, product planning, engineering processes, mentoring, and strategic execution.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
] as const;

function ServiceCard({ title, description, icon }: (typeof SERVICES)[number]) {
  return (
    <motion.div
      className="group relative flex flex-col gap-7 rounded-[5px] border border-panel-foreground/10 bg-panel p-10 transition-[box-shadow,border-color] duration-250 hover:border-accent hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* icon */}
      <span className="block w-fit -translate-y-0 text-panel-foreground/50 transition-[color,transform] duration-250 group-hover:-translate-y-[3px] group-hover:text-accent">
        {icon}
      </span>

      <div className="flex flex-col gap-4">
        <p className="text-[18px] font-bold leading-snug tracking-tight text-panel-foreground">
          {title}
        </p>
        <p className="text-[13px] leading-[1.8] text-panel-foreground/50">
          {description}
        </p>
      </div>

      {/* learn more */}
      <div className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-panel-foreground/35">
        <span>Learn More</span>
        <span className="inline-block translate-x-0 transition-transform duration-250 group-hover:translate-x-1">
          →
        </span>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">

        {/* Header — cascades label → heading → body */}
        <SectionReveal className="mb-20 flex flex-col items-center gap-5 text-center" stagger={0.14}>
          <motion.p variants={bodyVariants} className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Services
          </motion.p>
          <div style={{ overflow: "hidden" }}>
            <motion.h2 variants={titleVariants} className="max-w-[700px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Helping Businesses{" "}
              <span className="font-serif italic text-accent">Build</span>
              {", "}
              <span className="font-serif italic text-accent">Scale</span>
              {" & "}
              <span className="font-serif italic text-accent">Modernize</span>
              {" Software"}
            </motion.h2>
          </div>
          <motion.p variants={bodyVariants} className="max-w-[600px] text-[15px] leading-relaxed text-foreground/55">
            From product strategy and scalable architecture to AI automation and cloud
            infrastructure, I help businesses build reliable software systems that support
            long-term growth.
          </motion.p>
        </SectionReveal>

        {/* Cards — each card staggers in */}
        <SectionReveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12} delay={0.05}>
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={cardVariants}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </SectionReveal>

      </div>
    </section>
  );
}
