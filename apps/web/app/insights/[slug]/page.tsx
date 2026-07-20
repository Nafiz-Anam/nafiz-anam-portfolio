import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ArticlePageTemplate } from "@/components/templates/ArticlePageTemplate";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/article-content";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — Nafiz Anam`,
    description: article.subtitle,
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <ArticlePageTemplate article={article} />
      <Footer />
    </main>
  );
}
