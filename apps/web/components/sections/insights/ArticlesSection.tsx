"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const CATEGORIES = [
  "All",
  "Software Engineering",
  "Architecture",
  "Cloud & DevOps",
  "Artificial Intelligence",
  "SaaS",
  "Startups",
  "Leadership",
  "System Design",
] as const;

type Category = (typeof CATEGORIES)[number];

const ARTICLES = [
  {
    slug: "why-saas-products-fail-year-two",
    title: "Why Most SaaS Products Fail in Year Two",
    excerpt:
      "The technical decisions founders make in year one quietly become the ceiling of what's possible in year two. Here's what to watch for.",
    category: "SaaS",
    readingTime: "8 min read",
    date: "Jun 2025",
  },
  {
    slug: "multi-tenant-architecture-scale",
    title: "Designing Multi-Tenant Architectures That Scale",
    excerpt:
      "Shared schema, separate schemas, or hybrid? A practical breakdown of the trade-offs and when each approach makes sense for your product.",
    category: "Architecture",
    readingTime: "12 min read",
    date: "May 2025",
  },
  {
    slug: "real-cost-of-technical-debt",
    title: "The Real Cost of Technical Debt",
    excerpt:
      "Technical debt isn't just slow development. It's compounding risk, lost engineers, and a business that can't adapt when it needs to most.",
    category: "Software Engineering",
    readingTime: "7 min read",
    date: "May 2025",
  },
  {
    slug: "docker-in-production",
    title: "Docker in Production: What Most Tutorials Miss",
    excerpt:
      "Running Docker in development is easy. Running it reliably in production—with proper volumes, networking, and rollback—is a different discipline.",
    category: "Cloud & DevOps",
    readingTime: "10 min read",
    date: "Apr 2025",
  },
  {
    slug: "ai-automation-beyond-chatbot",
    title: "AI Automation: Beyond the Chatbot",
    excerpt:
      "Most businesses are still thinking about AI as a chat interface. The real business value is in intelligent process automation and decision augmentation.",
    category: "Artificial Intelligence",
    readingTime: "9 min read",
    date: "Apr 2025",
  },
  {
    slug: "choosing-tech-stack-2025",
    title: "Choosing the Right Tech Stack in 2025",
    excerpt:
      "The best tech stack isn't the newest one. It's the one that fits your team, your timeline, and the specific scaling characteristics of your product.",
    category: "Software Engineering",
    readingTime: "6 min read",
    date: "Mar 2025",
  },
  {
    slug: "engineering-leadership-founders-wrong",
    title: "Engineering Leadership: What Founders Get Wrong",
    excerpt:
      "Most founders think hiring a senior engineer solves their technical leadership problem. It rarely does. Here's what actually matters.",
    category: "Leadership",
    readingTime: "11 min read",
    date: "Mar 2025",
  },
  {
    slug: "monolith-to-microservices-worth-it",
    title: "From Monolith to Microservices: When It's Worth It",
    excerpt:
      "Microservices solve real problems. But they also introduce 20 new ones. The question isn't whether to split—it's when and how.",
    category: "Architecture",
    readingTime: "13 min read",
    date: "Feb 2025",
  },
  {
    slug: "saas-zero-to-first-customer",
    title: "SaaS From Zero: What Changes After Your First Customer",
    excerpt:
      "Building before you have customers is exploration. Building after is discipline. The mindset shift that separates products that scale from those that collapse.",
    category: "Startups",
    readingTime: "8 min read",
    date: "Feb 2025",
  },
] as const;

function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  readingTime,
  date,
}: (typeof ARTICLES)[number]) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col rounded-[5px] border border-panel-foreground/[0.08] bg-background transition-colors duration-200 hover:border-panel-foreground/[0.16]"
    >
      {/* Cover */}
      <div className="overflow-hidden rounded-t-[5px]">
        <ImagePlaceholder
          src={null}
          label={title}
          aspectClassName="aspect-[16/9]"
          className="!rounded-none w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-center gap-3">
          <span className="rounded-[3px] border border-accent/25 bg-accent/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {category}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold leading-[1.25] tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent">
            {title}
          </h3>
          <p className="text-[13px] leading-[1.8] text-panel-foreground/48">
            {excerpt}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-[11px] text-panel-foreground/32">
            <span>{readingTime}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-panel-foreground/24" />
            <span>{date}</span>
          </div>
          <a
            href={`/insights/${slug}`}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent/60 transition-all duration-150 hover:gap-1.5 hover:text-accent"
          >
            Read More
            <span>→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ArticlesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <section
      id="articles"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 flex flex-col gap-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Browse by Topic
          </p>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Latest{" "}
            <span className="font-serif italic text-accent">Articles</span>
          </h2>
        </motion.div>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="mb-14 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold tracking-wide transition-all duration-150 ${
                activeCategory === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-panel-foreground/[0.12] bg-transparent text-panel-foreground/50 hover:border-panel-foreground/[0.24] hover:text-panel-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Article grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.length > 0 ? (
              filtered.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-[14px] text-panel-foreground/32">
                No articles in this category yet. Check back soon.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
