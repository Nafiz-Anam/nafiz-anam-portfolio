import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/sections/insights/ArticlesSection";
import { fetchBlogList } from "@/lib/blog";

export async function LatestInsights() {
  const { posts } = await fetchBlogList({ limit: 3 });

  if (posts.length === 0) return null;

  return (
    <section id="insights" className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16">
      <div className="mx-auto max-w-[1800px]">
        <Reveal className="mb-20 flex flex-col items-center gap-5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            From the Blog
          </p>
          <h2 className="max-w-[700px] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Latest <span className="font-serif italic text-accent">Insights</span>
          </h2>
          <p className="max-w-[600px] text-[15px] leading-relaxed text-foreground/55">
            Practical lessons on architecture, engineering leadership, and the decisions that
            make or break a technology investment.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/insights"
            className="rounded-[5px] bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            Read All Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
