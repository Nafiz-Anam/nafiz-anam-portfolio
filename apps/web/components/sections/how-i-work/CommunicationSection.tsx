"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "Regular check-ins, not just a kickoff and a delivery date.",
    body: "A recurring cadence, weekly or biweekly depending on the engagement, where you see actual progress, not a slide summarizing it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Communication happens where you already work.",
    body: "Slack, email, or your existing project tracker, whatever your team already uses. You shouldn't have to adopt a new tool just to stay informed about a project you're paying for.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    title: "Decisions get explained, not just announced.",
    body: "When a technical tradeoff gets made, you'll know why, in plain language, not just that it happened.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 0 2h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1 0-2h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
        <path d="M9 11v2M15 11v2M9 17s1 1 3 1 3-1 3-1" />
      </svg>
    ),
  },
] as const;

function PointRow({ title, body, icon, isLast }: (typeof POINTS)[number] & { isLast: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-6 px-10 py-11 lg:flex-row lg:items-start lg:gap-0">
        <div className="flex shrink-0 gap-4 lg:w-[45%] lg:pr-14">
          <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
          <p className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground">
            {title}
          </p>
        </div>
        <div className="flex-1">
          <p className="max-w-[520px] text-[13px] leading-[1.8] text-panel-foreground/50">
            {body}
          </p>
        </div>
      </div>
      {!isLast && <div className="mx-10 border-b border-panel-foreground/[0.06]" />}
    </>
  );
}

export function CommunicationSection() {
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
            During the Engagement
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            No Black Boxes,{" "}
            <span className="font-serif italic" style={{ color: "hsl(var(--accent))" }}>
              No Surprises
            </span>
          </h2>
          <p className="max-w-[580px] text-[15px] leading-[1.85] text-panel-foreground/50">
            A common failure mode with outside technical help isn&apos;t bad work, it&apos;s
            silence. Weeks go by, then a status update arrives that doesn&apos;t match
            expectations. That gap is where trust breaks down, and it&apos;s avoidable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] border border-panel-foreground/[0.08]"
        >
          {POINTS.map((point, i) => (
            <PointRow key={point.title} {...point} isLast={i === POINTS.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
