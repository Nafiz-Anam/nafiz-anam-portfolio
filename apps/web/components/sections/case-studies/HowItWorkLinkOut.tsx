import Link from "next/link";

export function HowItWorkLinkOut() {
  return (
    <section className="bg-texture-lines bg-surface py-16 text-panel-foreground">
      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-3 px-6 text-center lg:px-16">
        <p className="text-[15px] text-panel-foreground/60">
          Curious how I actually work, end to end?
        </p>
        <Link
          href="/how-i-work"
          className="group inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-75"
        >
          See My Full Process
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </section>
  );
}
