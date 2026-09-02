"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { BlogListItem } from "@portfolio/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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
      className="dark group flex flex-col rounded-[5px] border border-panel-foreground/[0.08] bg-background transition-colors duration-200 hover:border-panel-foreground/[0.16]"
    >
      <Link href={`/insights/${post.slug}`} className="block overflow-hidden rounded-t-[5px]">
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
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-center gap-3">
          <span className="rounded-[3px] border border-accent/25 bg-accent/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
            {post.category}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[17px] font-bold leading-[1.25] tracking-tight">
            <Link href={`/insights/${post.slug}`} className="text-panel-foreground transition-colors duration-150 group-hover:text-accent">
              {post.title}
            </Link>
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
  posts: initialPosts,
  categories,
  total = 0,
  initialLimit = 12,
}: {
  posts: BlogListItem[];
  categories: string[];
  total?: number;
  initialLimit?: number;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const allLoaded = posts.length >= total;

  const allCategories = ["All", ...categories];
  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase().trim();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  async function loadMore() {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API}/blog?page=${nextPage}&limit=${initialLimit}`);
      const data = await res.json() as { posts: BlogListItem[] };
      setPosts((prev) => [...prev, ...(data.posts ?? [])]);
      setPage(nextPage);
    } catch {
      // silent fail — user can retry
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <section
      id="insights"
      className="bg-panel bg-texture-lines-panel px-6 py-28 text-panel-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-10 flex flex-col gap-5"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Browse by Topic</p>
            <h2 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight text-panel-foreground sm:text-5xl">
              Latest <span className="font-serif italic text-accent">Insights</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="mb-6 flex flex-wrap gap-2"
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

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
          className="mb-14 flex justify-end"
        >
          <input
            type="search"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="dark w-full rounded-[5px] border border-panel-foreground/10 bg-background/50 px-4 py-2.5 text-sm text-panel-foreground placeholder:text-panel-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent sm:w-64"
          />
        </motion.div>

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
              <div className="col-span-full flex flex-col items-center gap-6 py-20 text-center">
                <p className="max-w-[480px] text-[14px] leading-[1.85] text-panel-foreground/45">
                  The first article is on its way. In the meantime, if you have
                  a specific question about architecture, engineering
                  leadership, or scaling a technical team, reach out directly.
                  I read every message myself.
                </p>
                <Link
                  href="/contact"
                  className="rounded-[5px] bg-accent px-7 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
                >
                  Get in Touch
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {!search && activeCategory === "All" && !allLoaded && (
          <div className="mt-14 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center gap-2 rounded-[5px] border border-panel-foreground/15 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-panel-foreground/60 transition-colors hover:border-panel-foreground/30 hover:text-panel-foreground/90 disabled:opacity-50"
            >
              {loadingMore && <Loader2 size={13} className="animate-spin" />}
              {loadingMore ? "Loading…" : `Load more (${posts.length} of ${total})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
