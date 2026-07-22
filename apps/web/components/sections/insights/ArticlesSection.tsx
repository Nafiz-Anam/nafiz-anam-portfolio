"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { BlogListItem } from "@portfolio/types";

function formatDate(iso: Date | string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function ArticleCard({ post }: { post: BlogListItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-col rounded-[5px] border border-panel-foreground/[0.08] bg-background transition-colors duration-200 hover:border-panel-foreground/[0.16]"
    >
      <div className="overflow-hidden rounded-t-[5px]">
        {post.coverImageUrl ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-accent/20 via-accent/5 to-background flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-wider text-panel-foreground/30">{post.category}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-center gap-3">
          <span className="rounded-[3px] border border-accent/25 bg-accent/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {post.category}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold leading-[1.25] tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent">
            {post.title}
          </h3>
          <p className="text-[13px] leading-[1.8] text-panel-foreground/48">{post.excerpt}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-3 text-[11px] text-panel-foreground/32">
            <span>{post.readTimeMinutes} min read</span>
            <span className="h-0.5 w-0.5 rounded-full bg-panel-foreground/24" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <Link
            href={`/insights/${post.slug}`}
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-accent/60 transition-all duration-150 hover:gap-1.5 hover:text-accent"
          >
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ArticlesSection({
  posts,
  categories,
}: {
  posts: BlogListItem[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allCategories = ["All", ...categories];
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section
      id="articles"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-14 flex flex-col gap-5"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Browse by Topic</p>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
            Latest <span className="font-serif italic text-accent">Articles</span>
          </h2>
        </motion.div>

        {allCategories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
            className="mb-14 flex flex-wrap gap-2"
          >
            {allCategories.map((cat) => (
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
        )}

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
              filtered.map((post) => <ArticleCard key={post.slug} post={post} />)
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
