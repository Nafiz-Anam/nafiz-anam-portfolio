import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { BookingButton } from "@/components/sections/BookingButton";

export function AboutCTA() {
  return (
    <section
      id="contact-cta"
      className="dark bg-texture-lines bg-background px-6 py-36 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Ready to Start
          </p>
          <h2 className="max-w-[720px] font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
          >
            Let's Build Something{" "}
            <span className="font-serif italic text-accent">That Lasts.</span>
          </h2>
          <p className="max-w-[520px] text-[15px] leading-[1.85] text-foreground/55">
            Whether you're planning a new product, scaling an existing system, or need
            senior engineering leadership—I'd like to hear what you're working on.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <BookingButton className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <Link
              href="/case-studies"
              className="rounded-[5px] border border-foreground/20 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              View My Work
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
