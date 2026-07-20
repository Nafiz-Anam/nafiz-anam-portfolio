"use client";

import { motion } from "framer-motion";

const SERIES = [
  {
    slug: "building-saas-from-scratch",
    label: "Series 01",
    title: "Building a SaaS From Scratch",
    description:
      "A step-by-step series covering everything from initial architecture decisions to production deployment, billing integration, and scaling your first SaaS product.",
    totalArticles: 8,
    publishedArticles: 3,
    topics: ["Architecture", "SaaS", "Infrastructure"],
  },
  {
    slug: "modern-devops",
    label: "Series 02",
    title: "Modern DevOps",
    description:
      "Containers, CI/CD pipelines, cloud infrastructure, monitoring, and the operational practices that separate brittle systems from reliable ones.",
    totalArticles: 6,
    publishedArticles: 4,
    topics: ["Cloud & DevOps", "Docker", "CI/CD"],
  },
  {
    slug: "ai-engineering",
    label: "Series 03",
    title: "AI Engineering",
    description:
      "From embeddings to RAG pipelines to production AI systems — practical lessons from building real AI-powered business applications.",
    totalArticles: 7,
    publishedArticles: 2,
    topics: ["Artificial Intelligence", "Systems", "Automation"],
  },
  {
    slug: "engineering-leadership",
    label: "Series 04",
    title: "Engineering Leadership",
    description:
      "The mindset, processes, and practical skills required to lead engineering teams — without losing the technical depth that makes great leaders great.",
    totalArticles: 5,
    publishedArticles: 5,
    topics: ["Leadership", "Teams", "Strategy"],
  },
] as const;

function ProgressDots({
  total,
  published,
}: {
  total: number;
  published: number;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-5 rounded-full transition-colors duration-150 ${
            i < published ? "bg-accent" : "bg-panel-foreground/[0.12]"
          }`}
        />
      ))}
    </div>
  );
}

export function SeriesSection() {
  return (
    <section
      id="series"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
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
            Series
          </p>
          <h2 className="max-w-[620px] text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Multi-Part Deep{" "}
            <span className="font-serif italic text-accent">Dives</span>
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[1.85] text-panel-foreground/50">
            Some topics deserve more than one article. These series go deep on
            subjects that matter most to engineering leaders and technical founders.
          </p>
        </motion.div>

        {/* Series grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERIES.map((series, i) => (
            <motion.div
              key={series.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
              className="group flex flex-col gap-7 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-9 transition-colors duration-200 hover:border-panel-foreground/[0.16]"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  {series.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {series.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-panel-foreground/[0.10] px-2.5 py-0.5 text-[10px] font-medium text-panel-foreground/38"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title + Description */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[22px] font-bold leading-snug tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent">
                  {series.title}
                </h3>
                <p className="text-[13px] leading-[1.8] text-panel-foreground/45">
                  {series.description}
                </p>
              </div>

              {/* Progress */}
              <div className="flex flex-col gap-3">
                <ProgressDots
                  total={series.totalArticles}
                  published={series.publishedArticles}
                />
                <p className="text-[11px] text-panel-foreground/35">
                  <span className="font-bold text-panel-foreground/60">
                    {series.publishedArticles}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-panel-foreground/60">
                    {series.totalArticles}
                  </span>{" "}
                  articles published
                </p>
              </div>

              {/* CTA */}
              <a
                href={`/insights/series/${series.slug}`}
                className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-panel-foreground/28 transition-all duration-150 hover:gap-2 hover:text-accent"
              >
                <span>
                  {series.publishedArticles === series.totalArticles
                    ? "Read Series"
                    : "Continue Reading"}
                </span>
                <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
