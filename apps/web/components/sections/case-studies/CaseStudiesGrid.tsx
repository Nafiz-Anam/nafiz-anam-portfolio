"use client";

import { motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const CASE_STUDIES = [
  {
    slug: "patient-management-saas-platform",
    industry: "Healthcare",
    title: "Patient Management SaaS Platform",
    challenge:
      "Manual paper-based workflows creating compliance risk across 12 clinic locations, with no central visibility into patient data or appointment scheduling.",
    summary:
      "Designed and built a multi-tenant healthcare SaaS platform from scratch — handling HIPAA compliance, role-based access across staff tiers, real-time appointment scheduling, and patient communication automation.",
    role: "Full-Stack Lead · System Architecture · Compliance Engineering",
    outcome: "80% reduction in administrative overhead. HIPAA-compliant from day one.",
    label: "Healthcare SaaS Platform",
  },
  {
    slug: "enterprise-operations-intelligence-system",
    industry: "Logistics",
    title: "Enterprise Operations Intelligence System",
    challenge:
      "A national freight operator running 14 disconnected systems — causing $2M+ in annual operational inefficiency, double-entry errors, and zero real-time visibility.",
    summary:
      "Architected a unified operations platform integrating dispatch, fleet tracking, warehouse management, invoicing, and analytics into a single source of truth — replacing legacy Excel workflows and 6 legacy tools.",
    role: "Technical Architect · Integration Lead · Team Lead",
    outcome: "35% operational cost reduction. Real-time visibility across 200+ vehicles.",
    label: "Logistics Operations Platform",
  },
  {
    slug: "payment-reconciliation-platform",
    industry: "Finance",
    title: "Payment Reconciliation & Settlement Platform",
    challenge:
      "A fintech startup processing $50M monthly in transactions was losing $500K/year to manual reconciliation errors, settlement delays, and no audit trail.",
    summary:
      "Built an automated reconciliation engine that matched transactions across 8 payment gateways in real time, flagged exceptions automatically, and generated audit-ready reports for regulatory compliance.",
    role: "Lead Backend Engineer · Payments Architecture · PCI DSS",
    outcome: "99.9% uptime. PCI DSS compliant. $500K/year reconciliation losses eliminated.",
    label: "FinTech Payment Platform",
  },
  {
    slug: "high-scale-learning-management-platform",
    industry: "Education",
    title: "High-Scale Learning Management Platform",
    challenge:
      "A growing EdTech company with 500K registered students outgrew their homegrown LMS — crashing every semester during peak enrollment with no clear path to scale.",
    summary:
      "Led a complete LMS replatform from a single-server Rails app to a distributed Next.js + Node.js microservices architecture on AWS — with horizontal auto-scaling, CDN-optimized content delivery, and an instructor analytics suite.",
    role: "CTO / Technical Lead · Cloud Architecture · Team Management",
    outcome: "10x concurrent user capacity. 99.8% platform uptime. 40% course completion rate increase.",
    label: "EdTech LMS Platform",
  },
  {
    slug: "ai-business-intelligence-dashboard",
    industry: "SaaS",
    title: "AI-Powered Business Intelligence Dashboard",
    challenge:
      "A SaaS analytics company with 3,000 B2B customers needed to differentiate their product with AI-driven insights, but had no internal ML/AI capability and a 6-month runway to ship.",
    summary:
      "Designed and delivered an AI insights layer on top of their existing data warehouse — using GPT-4 + RAG to generate natural-language summaries of KPI trends, anomaly detection, and forward-looking recommendations for each customer's dataset.",
    role: "AI Product Lead · Prompt Engineering · Backend Architecture",
    outcome: "62% increase in customer retention. AI insights shipped in 11 weeks.",
    label: "AI Business Intelligence",
  },
  {
    slug: "multi-country-erp-integration",
    industry: "Enterprise",
    title: "Multi-Country ERP Integration & Automation",
    challenge:
      "A manufacturing group operating across 5 countries was manually consolidating financial data from 4 different ERP systems each month — a 3-week process prone to errors.",
    summary:
      "Built a real-time ERP integration middleware layer that normalized data from SAP, Microsoft Dynamics, and two custom ERPs — automating consolidation, currency conversion, and report generation across entities.",
    role: "Integration Architect · Technical Lead · Stakeholder Management",
    outcome: "Month-end close reduced from 3 weeks to 4 hours. Zero consolidation errors.",
    label: "Enterprise ERP Integration",
  },
] as const;

function CaseStudyCard({
  slug,
  industry,
  title,
  challenge,
  summary,
  role,
  outcome,
  label,
  index,
}: (typeof CASE_STUDIES)[number] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-[5px] border border-foreground/[0.08] bg-background transition-colors duration-300 hover:border-foreground/[0.15]"
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-foreground/[0.04]">
        <ImagePlaceholder
          label={label}
          aspectClassName="h-full"
          className="h-full rounded-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute left-6 top-6">
          <span className="rounded-[3px] bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
            {industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-8">
        <h3 className="text-[18px] font-bold leading-snug tracking-tight text-foreground">
          {title}
        </h3>

        <div>
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">
            Business Challenge
          </p>
          <p className="text-[13px] leading-[1.75] text-foreground/60">{challenge}</p>
        </div>

        <p className="text-[13px] leading-[1.75] text-foreground/50">{summary}</p>

        <div className="flex flex-col gap-4 border-t border-foreground/[0.07] pt-5">
          <div>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">
              My Role
            </p>
            <p className="text-[12px] font-medium text-foreground/60">{role}</p>
          </div>

          <div>
            <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-foreground/35">
              Business Outcome
            </p>
            <p className="text-[13px] font-bold text-foreground/80">{outcome}</p>
          </div>
        </div>

        <div className="mt-auto pt-3">
          <a
            href={`/case-studies/${slug}`}
            className="group/link inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-accent transition-opacity hover:opacity-75"
          >
            Read Case Study
            <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function CaseStudiesGrid() {
  return (
    <section
      id="all-case-studies"
      className="dark bg-texture-lines bg-background px-6 py-28 text-foreground lg:px-16"
    >
      <div className="mx-auto max-w-[1800px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mb-16 flex flex-col gap-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
            All Case Studies
          </p>
          <h2 className="text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl">
            <span className="font-sans text-foreground">Real Projects.</span>{" "}
            <span className="font-serif italic text-accent">Measurable Results.</span>
          </h2>
          <p className="mt-2 max-w-[600px] text-[15px] leading-[1.85] text-foreground/50">
            Each engagement below began with a specific business problem and ended with a
            production system delivering quantifiable impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.title} {...cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
