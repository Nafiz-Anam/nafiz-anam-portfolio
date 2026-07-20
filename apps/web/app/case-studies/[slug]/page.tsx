import { notFound } from "next/navigation";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyPageTemplate } from "@/components/templates/CaseStudyPageTemplate";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/case-study-content";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} — Nafiz Anam`,
    description: caseStudy.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="dark bg-texture-lines bg-background text-foreground">
        <Nav />
      </div>
      <CaseStudyPageTemplate caseStudy={caseStudy} />
      <Footer />
    </main>
  );
}
