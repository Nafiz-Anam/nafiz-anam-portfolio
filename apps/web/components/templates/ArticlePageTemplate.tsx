"use client";

import { motion } from "framer-motion";
import { Button } from "@portfolio/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { ArticleData, ContentBlock, RelatedArticle } from "@/lib/article-content";

/* ─── Animation wrapper ─── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTENT BLOCK RENDERERS
═══════════════════════════════════════════════════════════ */

function BlockP({ html }: { html: string }) {
  return (
    <p
      className="text-[17px] leading-[1.9] text-foreground/75 [&_code]:rounded-[3px] [&_code]:border [&_code]:border-foreground/[0.10] [&_code]:bg-foreground/[0.05] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-foreground/85 [&_strong]:font-semibold [&_strong]:text-foreground/90 [&_em]:italic"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function BlockH2({ id, text }: { id: string; text: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-[26px] font-bold leading-[1.2] tracking-tight text-foreground sm:text-[30px]"
    >
      {text}
    </h2>
  );
}

function BlockH3({ id, text }: { id: string; text: string }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 text-[20px] font-bold leading-[1.25] tracking-tight text-foreground sm:text-[22px]"
    >
      {text}
    </h3>
  );
}

function BlockUl({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[17px] leading-[1.8] text-foreground/72">
          <span
            className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "hsl(var(--accent))" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockOl({ items }: { items: readonly string[] }) {
  return (
    <ol className="flex flex-col gap-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4 text-[17px] leading-[1.8] text-foreground/72">
          <span className="mt-0.5 shrink-0 font-mono text-[13px] font-bold tabular-nums text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function BlockBlockquote({
  text,
  attribution,
}: {
  text: string;
  attribution?: string;
}) {
  return (
    <blockquote className="flex flex-col gap-3 border-l-2 border-accent pl-6">
      <p className="text-[17px] italic leading-[1.85] text-foreground/70">
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-foreground/35">
          — {attribution}
        </p>
      )}
    </blockquote>
  );
}

const CALLOUT_STYLES = {
  info: {
    border: "border-foreground/[0.12]",
    bg: "bg-foreground/[0.03]",
    label: "text-foreground/55",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  tip: {
    border: "border-accent/25",
    bg: "bg-accent/[0.05]",
    label: "text-accent",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L12 17l-3.7-2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z" />
      </svg>
    ),
  },
  warning: {
    border: "border-amber-400/30",
    bg: "bg-amber-400/[0.06]",
    label: "text-amber-600 dark:text-amber-400",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
} as const;

function BlockCallout({
  variant,
  title,
  text,
}: {
  variant: "info" | "tip" | "warning";
  title: string;
  text: string;
}) {
  const s = CALLOUT_STYLES[variant];
  return (
    <div className={`flex flex-col gap-3 rounded-[5px] border ${s.border} ${s.bg} px-6 py-5`}>
      <div className={`flex items-center gap-2 ${s.label}`}>
        {s.icon}
        <p className="text-[11px] font-bold uppercase tracking-[0.16em]">{title}</p>
      </div>
      <p className="text-[15px] leading-[1.8] text-foreground/65">{text}</p>
    </div>
  );
}

function BlockCode({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-[5px] border border-foreground/[0.08]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-foreground/[0.08] bg-foreground/[0.04] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/[0.12]" />
        </div>
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/30">
          {lang}
        </span>
      </div>
      {/* Code body */}
      <div className="overflow-x-auto bg-foreground/[0.03] p-6">
        <pre className="font-mono text-[13.5px] leading-[1.75] text-foreground/75">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function BlockPullquote({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <span
        className="font-serif text-[64px] leading-none"
        style={{ color: "hsl(var(--accent) / 0.25)" }}
        aria-hidden
      >
        &ldquo;
      </span>
      <p
        className="max-w-[600px] font-serif text-[22px] italic leading-[1.6] tracking-tight text-foreground/80 sm:text-[26px]"
      >
        {text}
      </p>
    </div>
  );
}

function BlockImage({
  src,
  alt,
  caption,
}: {
  src: string | null;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <ImagePlaceholder
        src={src}
        alt={alt}
        label={alt}
        aspectClassName="aspect-[16/9]"
        className="!rounded-[5px] w-full"
      />
      {caption && (
        <figcaption className="text-center text-[12px] leading-[1.7] text-foreground/38">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function BlockTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="overflow-x-auto rounded-[5px] border border-foreground/[0.08]">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b border-foreground/[0.08] bg-foreground/[0.03]">
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-3.5 font-bold uppercase tracking-[0.1em] text-[11px] text-foreground/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-foreground/[0.06] transition-colors duration-100 hover:bg-foreground/[0.02] ${ri === rows.length - 1 ? "border-b-0" : ""}`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`px-5 py-4 leading-[1.6] text-foreground/65 ${ci === 0 ? "font-medium text-foreground/80" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full"
          style={{ background: "hsl(var(--accent) / 0.45)" }}
        />
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "p":
      return <BlockP key={i} html={block.html} />;
    case "h2":
      return <BlockH2 key={i} id={block.id} text={block.text} />;
    case "h3":
      return <BlockH3 key={i} id={block.id} text={block.text} />;
    case "ul":
      return <BlockUl key={i} items={block.items} />;
    case "ol":
      return <BlockOl key={i} items={block.items} />;
    case "blockquote":
      return <BlockBlockquote key={i} text={block.text} attribution={block.attribution} />;
    case "callout":
      return <BlockCallout key={i} variant={block.variant} title={block.title} text={block.text} />;
    case "code":
      return <BlockCode key={i} lang={block.lang} code={block.code} />;
    case "pullquote":
      return <BlockPullquote key={i} text={block.text} />;
    case "image":
      return <BlockImage key={i} src={block.src} alt={block.alt} caption={block.caption} />;
    case "table":
      return <BlockTable key={i} headers={block.headers} rows={block.rows} />;
    case "divider":
      return <BlockDivider key={i} />;
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Hero
═══════════════════════════════════════════════════════════ */
function ArticleHero({
  category,
  title,
  subtitle,
  publishedDate,
  readingTime,
  author,
  coverImage,
}: Pick<
  ArticleData,
  "category" | "title" | "subtitle" | "publishedDate" | "readingTime" | "author" | "coverImage"
>) {
  return (
    <section className="px-6 pb-0 pt-20 lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 flex items-center gap-2 text-[12px] text-foreground/35"
        >
          <a href="/insights" className="hover:text-foreground/60 transition-colors duration-150">
            Insights
          </a>
          <span>/</span>
          <span className="text-foreground/50">{category}</span>
        </motion.div>

        {/* Content column — centered, constrained width */}
        <div className="mx-auto max-w-[860px]">
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-7"
          >
            <span className="rounded-[3px] border border-accent/25 bg-accent/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
              {category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mb-6 font-bold leading-[1.08] tracking-tight text-foreground"
            style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="mb-10 text-[18px] leading-[1.75] text-foreground/52"
          >
            {subtitle}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
            className="mb-14 flex items-center gap-5 border-y border-foreground/[0.07] py-5"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-full">
                <ImagePlaceholder
                  src={author.avatarUrl}
                  alt={author.name}
                  label={author.name}
                  aspectClassName="aspect-square"
                  className="!rounded-full h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[13px] font-semibold text-foreground/80">{author.name}</p>
                <p className="text-[11px] text-foreground/36">{author.role}</p>
              </div>
            </div>

            <span className="h-4 w-px bg-foreground/[0.10]" />

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-foreground/40">
              <span>{publishedDate}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-foreground/20" />
              <span>{readingTime}</span>
            </div>
          </motion.div>
        </div>

        {/* Cover image — wider than content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 }}
          className="mx-auto max-w-[1200px]"
        >
          <ImagePlaceholder
            src={coverImage}
            alt={title}
            label={title}
            aspectClassName="aspect-[21/9]"
            className="!rounded-[5px] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Article Content
═══════════════════════════════════════════════════════════ */
function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section className="bg-background px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-[860px]">
        <Reveal>
          <div className="flex flex-col gap-8">
            {blocks.map((block, i) => renderBlock(block, i))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — Key Takeaways
═══════════════════════════════════════════════════════════ */
function KeyTakeaways({ takeaways }: { takeaways: string[] }) {
  return (
    <section className="bg-background px-6 pb-24 lg:px-16">
      <div className="mx-auto max-w-[860px]">
        <Reveal>
          <div className="rounded-[5px] border border-accent/20 bg-accent/[0.04] px-8 py-9 sm:px-10 sm:py-11">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: "hsl(var(--accent) / 0.12)" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Key Takeaways
              </p>
            </div>

            {/* Takeaway list */}
            <ul className="flex flex-col gap-4">
              {takeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-0.5 font-mono text-[12px] font-bold tabular-nums text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-[1.75] text-foreground/68">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — Related Articles
═══════════════════════════════════════════════════════════ */
function RelatedCard({ article }: { article: RelatedArticle }) {
  return (
    <a
      href={`/insights/${article.slug}`}
      className="group flex flex-col gap-5 rounded-[5px] border border-panel-foreground/[0.08] bg-background p-7 transition-colors duration-150 hover:border-panel-foreground/[0.18]"
    >
      <span className="rounded-[3px] border border-accent/20 bg-accent/[0.07] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent w-fit">
        {article.category}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] font-bold leading-snug tracking-tight text-panel-foreground transition-colors duration-150 group-hover:text-accent">
          {article.title}
        </h3>
        <p className="text-[13px] leading-[1.75] text-panel-foreground/45">
          {article.excerpt}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-3 text-[11px] text-panel-foreground/30">
        <span>{article.readingTime}</span>
        <span className="h-0.5 w-0.5 rounded-full bg-panel-foreground/20" />
        <span>{article.date}</span>
      </div>
    </a>
  );
}

function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  return (
    <section className="bg-panel bg-texture-lines-panel px-6 py-24 text-panel-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Continue Reading
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-panel-foreground sm:text-4xl">
            Related{" "}
            <span className="font-serif italic text-accent">Articles</span>
          </h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((a) => (
            <RelatedCard key={a.slug} article={a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — CTA
═══════════════════════════════════════════════════════════ */
function ArticleCTA() {
  return (
    <section className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            Work Together
          </p>
          <h2
            className="max-w-[680px] font-bold leading-[1.05] tracking-tight text-foreground"
            style={{ fontSize: "clamp(30px, 4vw, 56px)" }}
          >
            Need help applying these ideas to{" "}
            <span className="font-serif italic text-accent">your product?</span>
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[1.85] text-foreground/50">
            I help founders and technical teams design, build, and scale software
            products the right way. Let's talk about your specific challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact">
              <Button className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90">
                Book Discovery Call
              </Button>
            </a>
            <a href="/insights">
              <Button
                variant="outline"
                className="rounded-[5px] border-foreground/20 px-8 py-3.5 text-xs font-bold uppercase tracking-wide hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Back to Insights
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN TEMPLATE
═══════════════════════════════════════════════════════════ */
export function ArticlePageTemplate({ article }: { article: ArticleData }) {
  return (
    <>
      <div className="dark bg-texture-lines bg-background text-foreground">
        <ArticleHero
          category={article.category}
          title={article.title}
          subtitle={article.subtitle}
          publishedDate={article.publishedDate}
          readingTime={article.readingTime}
          author={article.author}
          coverImage={article.coverImage}
        />
      </div>
      <ArticleContent blocks={article.blocks} />
      <KeyTakeaways takeaways={article.takeaways} />
      <RelatedArticles articles={article.relatedArticles} />
      <ArticleCTA />
    </>
  );
}
