import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { draftMode } from "next/headers";
import { fetchBlogPost, fetchBlogList } from "@/lib/blog";
import { sanitizeContent } from "@/lib/sanitize";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { posts } = await fetchBlogList({ limit: 500 });
  return posts.map((p) => ({ slug: p.slug }));
}

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function processHtml(rawHtml: string) {
  const html = sanitizeContent(rawHtml);
  type TocItem = { id: string; text: string };
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  const processed = html.replace(/<(h[2-4])((?:\s[^>]*)?)>([\s\S]*?)<\/\1>/gi, (_m, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const level = parseInt(tag[1], 10);
    const base = slugifyHeading(text) || `h${level}-${seen.size + 1}`;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    if (level === 2) toc.push({ id, text });
    const cleanAttrs = attrs.replace(/\s+id="[^"]*"/, "").replace(/\s+style="[^"]*"/, "");
    return `<${tag}${cleanAttrs} id="${id}" style="scroll-margin-top:96px">${inner}</${tag}>`;
  });
  return { processed, toc };
}

function formatDate(iso: string | Date | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await fetchBlogPost(slug);
  if (!data) return { title: "Insights" };
  const { post } = data;
  return {
    title: post.seoTitle || post.title,
    alternates: { canonical: `/insights/${slug}` },
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.ogImage || post.coverImageUrl || undefined,
      type: "article",
      publishedTime: post.publishedAt?.toString() ?? undefined,
      authors: [post.authorName],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.ogImage || post.coverImageUrl || undefined,
    },
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const data = await fetchBlogPost(slug, isPreview);
  if (!data) notFound();

  const { post, prev, next } = data;
  const { processed, toc } = processHtml(post.contentHtml);
  const SITE_URL_DRAFT = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
  const initials = post.authorName.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.ogImage || post.coverImageUrl || undefined,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.authorName, url: SITE_URL },
    publisher: { "@type": "Person", name: "Nafiz Anam", url: SITE_URL },
    url: `${SITE_URL}/insights/${post.slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category || undefined,
    wordCount: post.readTimeMinutes ? post.readTimeMinutes * 200 : undefined,
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {isPreview && (
        <div className="flex items-center justify-between bg-amber-500 px-6 py-2 text-xs font-bold text-black">
          <span>DRAFT PREVIEW — not published</span>
          <a href={`${SITE_URL_DRAFT}/api/disable-draft`} className="underline">Exit preview</a>
        </div>
      )}

      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>

      <article className="relative">
        {/* Hero */}
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-14 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={12} /> All insights
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {post.category && (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {post.category}
              </span>
            )}
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-[2rem] font-bold leading-[1.3] tracking-tight sm:text-[2.75rem] sm:leading-[1.25]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-7 flex flex-wrap items-center gap-4 rounded-xl border border-border/60 bg-card/40 px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {initials}
              </div>
              <div>
                <div className="text-sm font-semibold">{post.authorName}</div>
                <div className="text-[11px] text-muted-foreground">Lead Software Engineer</div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={12} /> {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={12} /> {post.readTimeMinutes} min read
              </div>
            </div>
          </div>
        </div>

        {post.coverImageUrl && (
          <div className="mx-auto max-w-4xl px-6 pb-10 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border">
              <Image src={post.coverImageUrl} alt={post.title} width={1200} height={630} className="h-auto w-full object-cover" priority />
            </div>
          </div>
        )}

        {/* Content + TOC */}
        <div className="mx-auto max-w-4xl px-6 pb-20 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Article body */}
            <div className="min-w-0 lg:flex-1">
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-base"
                dangerouslySetInnerHTML={{ __html: processed }}
              />

              {/* Prev / Next */}
              {(prev || next) && (
                <div className="mt-12 border-t border-border pt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Continue reading</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {prev ? (
                      <Link
                        href={`/insights/${prev.slug}`}
                        className="flex flex-col gap-1.5 rounded-xl border border-border bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-accent">
                          <ChevronLeft size={12} /> Previous
                        </span>
                        <span className="text-sm font-semibold leading-snug line-clamp-2">{prev.title}</span>
                      </Link>
                    ) : <div />}
                    {next ? (
                      <Link
                        href={`/insights/${next.slug}`}
                        className="flex flex-col items-end gap-1.5 rounded-xl border border-border bg-card/60 p-4 text-right transition-all hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:text-accent">
                          Next <ChevronRight size={12} />
                        </span>
                        <span className="text-sm font-semibold leading-snug line-clamp-2">{next.title}</span>
                      </Link>
                    ) : <div />}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky TOC */}
            {toc.length > 0 && (
              <aside className="mt-10 hidden lg:mt-0 lg:block lg:w-[240px] lg:shrink-0">
                <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">On this page</p>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-[13px] text-muted-foreground transition-colors hover:text-foreground line-clamp-2"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
