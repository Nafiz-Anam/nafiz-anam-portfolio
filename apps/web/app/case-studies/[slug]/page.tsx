import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { BookingButton } from "@/components/sections/BookingButton";
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
  const { processed } = processHtml(project.contentHtml);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nafizanam.com";
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/case-studies/${project.slug}#article`,
        headline: project.seoTitle || project.title,
        description: project.seoDescription || project.excerpt,
        ...(project.ogImage || project.coverImageUrl ? { image: project.ogImage || project.coverImageUrl } : {}),
        datePublished: project.publishedAt ?? project.createdAt,
        dateModified: project.updatedAt,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/case-studies/${project.slug}`,
        isPartOf: { "@id": `${SITE_URL}/case-studies#collectionpage` },
        ...(project.tags.length > 0 ? { keywords: project.tags.join(", ") } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE_URL}/case-studies` },
          { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/case-studies/${project.slug}` },
        ],
      },
    ],
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

      <article className="dark bg-texture-lines bg-background text-foreground">
        {/* Hero */}
        <div className="px-6 pb-12 pt-14 lg:px-16">
          <div className="mx-auto max-w-[1100px]">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft size={12} /> All case studies
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {project.industry && (
                <span className="rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
                  {project.industry}
                </span>
              )}
              {project.tags.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full border border-border bg-panel px-2.5 py-0.5 text-[11px] text-foreground/50">
                  {t}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.2] tracking-tight sm:text-[3rem]">
              {project.title}
            </h1>
            <p className="mt-4 w-full text-lg leading-relaxed text-white">{project.excerpt}</p>

            {project.tags.length > 0 && (
              <p className="mt-6 text-sm text-foreground/50">
                <span className="font-semibold text-foreground">Services We Provided — </span>
                <span className="text-accent">{project.tags.join(", ")}</span>
              </p>
            )}

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#case-study-content"
                className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90"
              >
                See How We Helped
              </a>
              <BookingButton className="rounded-[5px] border border-foreground/20 px-6 py-3 text-xs font-bold uppercase tracking-wide transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]">
                Book an Appointment
              </BookingButton>
            </div>

            {/* Meta strip */}
            <div className="mt-10 flex flex-wrap gap-6 rounded-xl border border-border bg-panel px-6 py-4">
              {project.client && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/50">Client</p>
                  <p className="mt-1 text-sm font-semibold">{project.client}</p>
                </div>
              )}
              {project.role && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/50">My Role</p>
                  <p className="mt-1 text-sm font-medium text-foreground/50">{project.role}</p>
                </div>
              )}
              {project.outcome && (
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/50">Key Outcome</p>
                  <p className="mt-1 text-sm font-bold text-accent">{project.outcome}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {project.coverImageUrl && (
          <div className="px-6 pb-12 lg:px-16">
            <div className="mx-auto max-w-[1800px]">
              <div className="overflow-hidden rounded-2xl border border-border">
                <Image src={project.coverImageUrl} alt={project.title} width={1800} height={900} className="h-auto w-full object-cover" priority />
              </div>
            </div>
          </div>
        )}

        {/* Content — single reading column */}
        {project.contentHtml && (
          <div id="case-study-content" className="px-6 pb-20 lg:px-16" style={{ scrollMarginTop: "80px" }}>
            <div className="mx-auto max-w-[820px]">
              <div
                className="prose max-w-none text-base"
                dangerouslySetInnerHTML={{ __html: processed }}
              />

              {/* Prev / Next */}
              {(prev || next) && (
                <div className="mt-12 border-t border-border pt-8">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50">More case studies</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {prev ? (
                      <Link href={`/case-studies/${prev.slug}`} className="flex flex-col gap-1.5 rounded-xl border border-border bg-panel p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/50">
                          <ChevronLeft size={12} /> Previous
                        </span>
                        <span className="text-sm font-semibold leading-snug line-clamp-2">{prev.title}</span>
                      </Link>
                    ) : <div />}
                    {next ? (
                      <Link href={`/case-studies/${next.slug}`} className="flex flex-col items-end gap-1.5 rounded-xl border border-border bg-panel p-4 text-right transition-all hover:-translate-y-0.5 hover:border-accent/40">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/50">
                          Next <ChevronRight size={12} />
                        </span>
                        <span className="text-sm font-semibold leading-snug line-clamp-2">{next.title}</span>
                      </Link>
                    ) : <div />}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="border-t border-border/60 px-6 py-20 lg:px-16">
          <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-6 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Start a Project</p>
            <h2 className="max-w-[640px] text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
              Planning something similar?
            </h2>
            <p className="max-w-[520px] text-[15px] leading-[1.8] text-foreground/50">
              Let's talk about your goals and how we can turn them into a scalable, production-ready system.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <BookingButton className="rounded-[5px] bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-opacity hover:opacity-90">
                Book a Discovery Call
              </BookingButton>
              <Link
                href="/contact"
                className="rounded-[5px] border border-foreground/20 px-8 py-3.5 text-xs font-bold uppercase tracking-wide transition-colors hover:border-foreground/40 hover:bg-foreground/[0.03]"
              >
                Send a Message
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="px-6 pb-20 lg:px-16">
            <div className="mx-auto max-w-[1800px]">
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Related Work</p>
              <div className="grid gap-5 sm:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/case-studies/${r.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-panel transition-colors hover:border-foreground/[0.16]">
                    <div className="relative h-32 bg-foreground/[0.04]">
                      {r.coverImageUrl ? (
                        <Image src={r.coverImageUrl} alt={r.title} fill className="object-cover" sizes="300px" />
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
                      {r.outcome && <p className="mt-2 text-[12px] text-foreground/50 line-clamp-1">{r.outcome}</p>}
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
