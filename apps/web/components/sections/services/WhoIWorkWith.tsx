"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CLIENTS = [
  {
    type: "Funded Founders & Startups",
    description:
      "You have funding and a real product, or a real idea behind it, and you need someone who can make the technical calls, not just execute the ones you've already made. I work as a technical lead or architecture partner from early build through scale.",
  },
  {
    type: "Growing Businesses",
    description:
      "Your business runs, but your systems don't keep up. Whether that's manual processes, disconnected tools, or a legacy platform you've outgrown, I design and build what removes the bottleneck, with an eye on where the business is headed, not just where it is now.",
  },
  {
    type: "Product & Engineering Teams",
    description:
      "You have a team that's shipping, but a specific decision, a system, or a piece of architecture needs a senior second opinion before it goes further. I step in for exactly that, without adding permanent headcount.",
  },
] as const;

function ClientRow({
  type,
  description,
  isLast,
}: (typeof CLIENTS)[number] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative transition-colors duration-[250ms]"
        style={{
          backgroundColor: hovered
            ? "hsl(var(--panel-foreground) / 0.025)"
            : "transparent",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* left accent bar */}
        <div
          className="absolute inset-y-0 left-0 w-[2px] transition-all duration-[250ms]"
          style={{
            backgroundColor: hovered
              ? "hsl(var(--accent))"
              : "transparent",
          }}
        />

        <div className="flex flex-col gap-4 px-10 py-10 lg:flex-row lg:items-baseline lg:gap-0">
          <div className="shrink-0 lg:w-[32%]">
            <p
              className="text-[22px] font-bold tracking-tight transition-colors duration-[250ms]"
              style={{
                color: hovered
                  ? "hsl(var(--accent))"
                  : "hsl(var(--foreground))",
              }}
            >
              {type}
            </p>
          </div>
          <div className="lg:w-[68%]">
            <p className="max-w-[680px] text-[14px] leading-[1.85] text-foreground/50">
              {description}
            </p>
          </div>
        </div>
      </div>
      {!isLast && (
        <div className="mx-10 border-b border-foreground/[0.07]" />
      )}
    </>
  );
}

export function WhoIWorkWith() {
  return (
    <section
      id="who-i-work-with"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Who I Work With
          </p>
          <h2 className="max-w-[640px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Two Kinds of Clients,{" "}
            <span className="font-serif italic text-accent">
              One Underlying Problem
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="overflow-hidden rounded-[5px] bg-texture-lines-inset bg-surface"
        >
          {CLIENTS.map((c, i) => (
            <ClientRow
              key={c.type}
              {...c}
              isLast={i === CLIENTS.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
