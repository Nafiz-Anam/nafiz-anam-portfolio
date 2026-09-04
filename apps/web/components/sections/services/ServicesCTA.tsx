import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { BookingButton } from "@/components/sections/BookingButton";

export function ServicesCTA() {
  return (
    <section
      id="services-cta"
      className="bg-panel bg-texture-lines-panel px-6 py-36 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Start Here
          </p>
          <h2
            className="max-w-[720px] font-bold leading-[1.0] tracking-tight text-panel-foreground"
            style={{ fontSize: "clamp(38px, 5.5vw, 70px)" }}
          >
            Let's Find the Actual Problem.{" "}
            <span className="font-serif italic text-accent">
              Then Fix It.
            </span>
          </h2>
          <p className="max-w-[500px] text-[15px] leading-[1.85] text-panel-foreground/55">
            Book a 30-minute discovery call. No pitch, no pressure, just a real
            conversation about what's going on and whether I'm the right person to help.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <BookingButton location="services_cta" className="rounded-[5px] bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-opacity duration-250 hover:opacity-90">
              Book Discovery Call
            </BookingButton>
            <Link
              href="/case-studies"
              className="rounded-[5px] border border-panel-foreground/20 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-widest text-panel-foreground transition-colors duration-250 hover:border-accent hover:text-accent"
            >
              View Case Studies
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
