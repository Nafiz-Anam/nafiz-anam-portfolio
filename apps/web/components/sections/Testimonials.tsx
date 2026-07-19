"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@portfolio/ui";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { placeholderTestimonials } from "@/lib/placeholder-content";

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export function Testimonials() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const testimonial = placeholderTestimonials[index]!;

  function go(i: number, dir: number) {
    setState([(i + placeholderTestimonials.length) % placeholderTestimonials.length, dir]);
  }

  function next() {
    go(index + 1, 1);
  }

  function prev() {
    go(index - 1, -1);
  }

  return (
    <section className="dark bg-texture-lines bg-background px-6 py-20 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <FadeIn>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_auto_auto]">
            <h2 className="text-5xl font-bold leading-none sm:text-6xl lg:col-start-1 lg:row-start-1">
              <span className="font-serif italic text-accent-soft">Happy</span>{" "}
              <span className="font-sans text-foreground">Words.</span>
            </h2>

            <div className="flex justify-end gap-3 lg:col-start-2 lg:row-start-1">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <ArrowUpLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="flex gap-4 self-end lg:col-start-1 lg:row-start-2">
              {placeholderTestimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Show testimonial from ${t.name}`}
                  className="h-[160px] w-[150px] shrink-0 overflow-hidden rounded-[5px]"
                >
                  <ImagePlaceholder
                    src={t.photoUrl}
                    label={t.name}
                    aspectClassName="aspect-square"
                    className="h-full w-full rounded-[5px] object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[5px] bg-[#3A2822] lg:col-start-2 lg:row-start-2">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-[45%_55%]"
                >
                  <div className="relative aspect-[3/4] sm:aspect-auto sm:min-h-[430px]">
                    <ImagePlaceholder
                      src={testimonial.photoUrl}
                      label={testimonial.name}
                      aspectClassName="aspect-auto"
                      className="absolute inset-0 h-full w-full rounded-none object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
                    <p className="text-xl leading-relaxed text-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {testimonial.name}{" "}
                      <span className="text-sm font-normal text-accent-soft/80">{testimonial.role}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-end lg:col-start-2 lg:row-start-3">
              <Button className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                Read all review 🤙
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
