"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionReveal, titleVariants, bodyVariants } from "@/components/ui/SectionReveal";
import { Reveal } from "@/components/ui/Reveal";
import type { Testimonial } from "@portfolio/types";

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0, scale: 0.99 }),
};

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[index % testimonials.length]!;

  function go(i: number, dir: number) {
    setState([(i + testimonials.length) % testimonials.length, dir]);
  }

  return (
    <section className="dark bg-texture-lines bg-background px-6 py-20 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_auto_auto]">

          {/* Heading — clip reveal */}
          <SectionReveal className="lg:col-start-1 lg:row-start-1" stagger={0.12}>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                variants={titleVariants}
                className="text-5xl font-bold leading-none sm:text-6xl"
              >
                <span className="font-serif italic text-accent">Client</span>{" "}
                <span className="font-sans text-foreground">Results.</span>
              </motion.h2>
            </div>
          </SectionReveal>

          {/* Controls */}
          <Reveal className="flex justify-end gap-3 lg:col-start-2 lg:row-start-1" delay={0.2}>
            <button
              onClick={() => go(index - 1, -1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-80"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => go(index + 1, 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground transition-opacity hover:opacity-80"
            >
              <ArrowRight size={18} />
            </button>
          </Reveal>

          {/* Thumbnails — window of 3, sliding with the active testimonial */}
          <Reveal className="flex gap-4 self-end lg:col-start-1 lg:row-start-2" delay={0.15}>
            <div className="flex gap-4">
              {Array.from({ length: Math.min(3, testimonials.length) }, (_, slot) => {
                const i = (index + slot) % testimonials.length;
                const t = testimonials[i]!;
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => go(i, slot === 0 ? -1 : 1)}
                    aria-label={`Show testimonial from ${t.name}`}
                    className="h-[160px] w-[150px] shrink-0 overflow-hidden rounded-[5px]"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    animate={{ opacity: slot === 0 ? 1 : 0.45 }}
                  >
                    {t.photoUrl ? (
                      <Image src={t.photoUrl} alt={t.name} fill className="rounded-[5px] object-cover" sizes="150px" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-[5px] bg-accent/20 text-2xl font-bold text-accent">
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </Reveal>

          {/* Carousel */}
          <Reveal className="relative overflow-hidden rounded-[5px] bg-[#3A2822] lg:col-start-2 lg:row-start-2" delay={0.1}>
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
                className="grid grid-cols-1 sm:grid-cols-[45%_55%]"
              >
                <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[430px]">
                  {testimonial.photoUrl ? (
                    <img
                      src={testimonial.photoUrl}
                      alt={testimonial.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-accent/20 text-6xl font-bold text-accent">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                  <p className="text-xl leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {testimonial.name}{" "}
                    <span className="text-sm font-normal text-accent/80">
                      {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}
                    </span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
