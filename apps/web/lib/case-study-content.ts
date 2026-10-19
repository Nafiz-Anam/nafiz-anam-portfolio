export type CaseStudyStatus = "Live" | "In Progress" | "Completed";

export interface ArchitectureLayer {
  name: string;
  category: "frontend" | "api" | "data" | "infra";
  description: string;
  nodes: string[];
}

export interface CaseStudyFeature {
  title: string;
  description: string;
  businessValue: string;
  imageSrc: string | null;
  imageAlt: string;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  context?: string;
}

export interface RelatedCaseStudy {
  slug: string;
  title: string;
  industry: string;
  description: string;
  imageSrc: string | null;
}

export interface CaseStudyData {
  slug: string;
  industry: string;
  clientType: string;
  role: string;
  timeline: string;
  status: CaseStudyStatus;
  title: string;
  summary: string;
  heroImageSrc: string | null;

  overview: {
    clientBackground: string;
    businessContext: string;
    objectives: string[];
    scopeOfWork: string[];
    myResponsibilities: string[];
  };

  challenges: {
    category: string;
    title: string;
    description: string;
  }[];

  solution: {
    intro: string;
    productStrategy: string;
    keyDecisions: { title: string; description: string }[];
    developmentProcess: string;
  };

  architecture: {
    intro: string;
    layers: ArchitectureLayer[];
    securityHighlights: string[];
    deploymentNotes: string;
  };

  features: CaseStudyFeature[];

  results: {
    metrics: CaseStudyMetric[];
    testimonial?: { quote: string; author: string; role: string };
    additionalOutcomes: string[];
  };

  relatedProjects: RelatedCaseStudy[];
}
