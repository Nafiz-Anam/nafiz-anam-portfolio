import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { draftMode } from "next/headers";
import { fetchProject, fetchProjectList } from "@/lib/projects";
import { sanitizeContent } from "@/lib/sanitize";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { projects } = await fetchProjectList({ limit: 500 });
  return projects.map((p) => ({ slug: p.slug }));
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

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await fetchProject(slug);
  if (!data) return { title: "Case Studies" };
  const { project } = data;
  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.excerpt,
    keywords: project.tags,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.excerpt,
      images: project.ogImage || project.coverImageUrl
        ? [{ url: (project.ogImage || project.coverImageUrl) as string }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.excerpt,
      images: [project.ogImage || project.coverImageUrl || "/opengraph-image"],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const data = await fetchProject(slug, isPreview);
  if (!data) notFound();

  const { project, prev, next, related } = data;
  const { processed, toc } = processHtml(project.contentHtml);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.seoTitle || project.title,
    description: project.seoDescription || project.excerpt,
    image: project.ogImage || project.coverImageUrl || undefined,
    datePublished: project.publishedAt ?? project.createdAt,
    dateModified: project.updatedAt,
    author: { "@type": "Person", name: "Nafiz Anam", url: SITE_URL },
    publisher: { "@type": "Person", name: "Nafiz Anam", url: SITE_URL },
    url: `${SITE_URL}/case-studies/${project.slug}`,
    keywords: project.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      {isPreview && (
        <div className="flex items-center justify-between bg-amber-500 px-6 py-2 text-xs font-bold text-black">
          <span>DRAFT PREVIEW — not published</span>
          <a href={`${SITE_URL}/api/disable-draft`} className="underline">Exit preview</a>
        </div>
      )}
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>

      <article>
        {/* Hero */}
        <div className="dark bg-background px-6 pb-12 pt-14 lg:px-16">
          <div className="mx-auto max-w-[1800px]">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={12} /> All case studies
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {project.industry && (
                <span className="rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
                  {project.industry}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={11} /> {project.year}
                </span>
              )}
              {project.tags.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.2] tracking-tight sm:text-[3rem]">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.excerpt}</p>

            {/* Meta strip */}
            <div className="mt-8 flex flex-wrap gap-6 rounded-xl border border-border/60 bg-card/40 px-6 py-4">
              {project.client && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Client</p>
                  <p className="mt-1 text-sm font-semibold">{project.client}</p>
                </div>
              )}
              {project.role && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">My Role</p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{project.role}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Key Outcome</p>
                  <p className="mt-1 text-sm font-bold text-accent">{project.outcome}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {project.coverImageUrl && (
          <div className="dark bg-background px-6 pb-12 lg:px-16">
            <div className="mx-auto max-w-[1800px]">
              <div className="overflow-hidden rounded-2xl border border-border">
                <img src={project.coverImageUrl} alt={project.title} className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        )}

        {/* Content + TOC */}
        {project.contentHtml && (
          <div className="bg-background px-6 pb-20 lg:px-16">
            <div className="mx-auto max-w-[1800px]">
              <div className="lg:flex lg:gap-16">
                <div className="min-w-0 lg:flex-1">
                  <div
                    className="prose prose-slate dark:prose-invert max-w-none text-base"
                    dangerouslySetInnerHTML={{ __html: processed }}
                  />

                  {/* Prev / Next */}
                  {(prev || next) && (
                    <div className="mt-12 border-t border-border pt-8">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">More case studies</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {prev ? (
                          <Link href={`/case-studies/${prev.slug}`} className="flex flex-col gap-1.5 rounded-xl border border-border bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                              <ChevronLeft size={12} /> Previous
                            </span>
                            <span className="text-sm font-semibold leading-snug line-clamp-2">{prev.title}</span>
                          </Link>
                        ) : <div />}
                        {next ? (
                          <Link href={`/case-studies/${next.slug}`} className="flex flex-col items-end gap-1.5 rounded-xl border border-border bg-card/60 p-4 text-right transition-all hover:-translate-y-0.5 hover:border-accent/40">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                              Next <ChevronRight size={12} />
                            </span>
                            <span className="text-sm font-semibold leading-snug line-clamp-2">{next.title}</span>
                          </Link>
                        ) : <div />}
                      </div>
                    </div>
                  )}
                </div>

                {toc.length > 0 && (
                  <aside className="mt-10 hidden lg:mt-0 lg:block lg:w-[240px] lg:shrink-0">
                    <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">On this page</p>
                      <ul className="space-y-2">
                        {toc.map((item) => (
                          <li key={item.id}>
                            <a href={`#${item.id}`} className="block text-[13px] text-muted-foreground transition-colors hover:text-foreground line-clamp-2">
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
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="dark bg-background px-6 pb-20 lg:px-16">
            <div className="mx-auto max-w-[1800px]">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Related Work</p>
              <div className="grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/case-studies/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] transition-colors hover:border-foreground/[0.16]">
                    <div className="relative h-32 bg-foreground/[0.04]">
                      {r.coverImageUrl ? (
                        <img src={r.coverImageUrl} alt={r.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/30">{r.industry}</span>
                        </div>
                      )}
                      {r.industry && (
                        <span className="absolute left-3 top-3 rounded-[3px] bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-accent-foreground">
                          {r.industry}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h4 className="text-[14px] font-bold leading-snug text-foreground group-hover:text-accent line-clamp-2">{r.title}</h4>
                      {r.outcome && <p className="mt-2 text-[12px] text-muted-foreground line-clamp-1">{r.outcome}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  );
}
