import { prisma } from "../src/index";

const PROJECTS = [
  {
    title: "Patient Management SaaS Platform",
    slug: "patient-management-saas-platform",
    excerpt: "Designed and built a multi-tenant healthcare SaaS platform from scratch — handling HIPAA compliance, role-based access across staff tiers, real-time appointment scheduling, and patient communication automation.",
    industry: "Healthcare",
    tags: ["Next.js", "Node.js", "PostgreSQL", "AWS", "HIPAA"],
    client: "Multi-clinic Healthcare Group",
    role: "Full-Stack Lead · System Architecture · Compliance Engineering",
    outcome: "80% reduction in administrative overhead. HIPAA-compliant from day one.",
    year: "2024",
    contentHtml: `<h2>The Challenge</h2><p>Manual paper-based workflows creating compliance risk across 12 clinic locations, with no central visibility into patient data or appointment scheduling.</p><h2>The Solution</h2><p>Built a multi-tenant SaaS platform with role-based access control, real-time scheduling, automated patient communications, and full HIPAA audit trails.</p><h2>Key Results</h2><ul><li>80% reduction in administrative overhead</li><li>HIPAA-compliant from day one</li><li>12 clinics onboarded within 3 months</li><li>Zero compliance incidents post-launch</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2024-06-01"),
    seoTitle: "Healthcare SaaS Platform Case Study — Nafiz Anam",
    seoDescription: "How we built a HIPAA-compliant multi-tenant patient management SaaS, reducing administrative overhead by 80% across 12 clinic locations.",
  },
  {
    title: "Enterprise Operations Intelligence System",
    slug: "enterprise-operations-intelligence-system",
    excerpt: "Architected a unified operations platform integrating dispatch, fleet tracking, warehouse management, invoicing, and analytics into a single source of truth — replacing legacy Excel workflows and 6 legacy tools.",
    industry: "Logistics",
    tags: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "WebSockets"],
    client: "National Freight Operator",
    role: "Technical Architect · Integration Lead · Team Lead",
    outcome: "35% operational cost reduction. Real-time visibility across 200+ vehicles.",
    year: "2023",
    contentHtml: `<h2>The Challenge</h2><p>A national freight operator running 14 disconnected systems — causing $2M+ in annual operational inefficiency, double-entry errors, and zero real-time visibility.</p><h2>The Solution</h2><p>Designed and built a unified operations intelligence platform that consolidated all 14 systems into a single source of truth with real-time fleet tracking, automated dispatch, and predictive analytics.</p><h2>Key Results</h2><ul><li>35% operational cost reduction in year one</li><li>Real-time GPS visibility across 200+ vehicles</li><li>$2M+ annual efficiency gains</li><li>6 legacy systems decommissioned</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2023-11-15"),
    seoTitle: "Logistics Operations Platform Case Study — Nafiz Anam",
    seoDescription: "How we unified 14 disconnected systems for a national freight operator, achieving 35% cost reduction and real-time visibility across 200+ vehicles.",
  },
  {
    title: "Payment Reconciliation & Settlement Platform",
    slug: "payment-reconciliation-platform",
    excerpt: "Built an automated reconciliation engine that matched transactions across 8 payment gateways in real time, flagged exceptions automatically, and generated audit-ready reports for regulatory compliance.",
    industry: "Finance",
    tags: ["Node.js", "PostgreSQL", "RabbitMQ", "AWS Lambda", "PCI DSS"],
    client: "FinTech Startup",
    role: "Lead Backend Engineer · Payments Architecture · PCI DSS",
    outcome: "99.9% uptime. PCI DSS compliant. $500K/year reconciliation losses eliminated.",
    year: "2023",
    contentHtml: `<h2>The Challenge</h2><p>A fintech startup processing $50M monthly in transactions was losing $500K/year to manual reconciliation errors, settlement delays, and no audit trail.</p><h2>The Solution</h2><p>Engineered an event-driven reconciliation engine with multi-gateway support, real-time exception flagging, automated settlement workflows, and complete PCI DSS compliance.</p><h2>Key Results</h2><ul><li>$500K/year in reconciliation losses eliminated</li><li>99.9% uptime SLA achieved</li><li>PCI DSS Level 1 compliance certified</li><li>Settlement time reduced from 3 days to 4 hours</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2023-08-20"),
    seoTitle: "FinTech Payment Reconciliation Platform Case Study — Nafiz Anam",
    seoDescription: "How we eliminated $500K/year in reconciliation losses for a fintech processing $50M/month by building a real-time automated reconciliation engine.",
  },
  {
    title: "High-Scale Learning Management Platform",
    slug: "high-scale-learning-management-platform",
    excerpt: "Led a complete LMS replatform from a single-server Rails app to a distributed Next.js + Node.js microservices architecture on AWS — with horizontal auto-scaling, CDN-optimized content delivery, and an instructor analytics suite.",
    industry: "Education",
    tags: ["Next.js", "Node.js", "AWS", "CDN", "Microservices", "PostgreSQL"],
    client: "EdTech Company",
    role: "CTO / Technical Lead · Cloud Architecture · Team Management",
    outcome: "10x concurrent user capacity. 99.8% platform uptime. 40% course completion increase.",
    year: "2022",
    contentHtml: `<h2>The Challenge</h2><p>A growing EdTech company with 500K registered students outgrew their homegrown LMS — crashing every semester during peak enrollment with no clear path to scale.</p><h2>The Solution</h2><p>Led a full platform rewrite using a distributed microservices architecture, implementing horizontal auto-scaling, CDN-powered content delivery, and a real-time instructor analytics dashboard.</p><h2>Key Results</h2><ul><li>10x concurrent user capacity</li><li>99.8% platform uptime during peak enrollment</li><li>40% increase in course completion rates</li><li>CDN reduced content load times by 65%</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2022-09-10"),
    seoTitle: "EdTech LMS Platform Case Study — Nafiz Anam",
    seoDescription: "How we replatformed an LMS serving 500K students to handle 10x traffic, achieving 99.8% uptime and a 40% increase in course completion rates.",
  },
  {
    title: "AI-Powered Business Intelligence Dashboard",
    slug: "ai-business-intelligence-dashboard",
    excerpt: "Designed and delivered an AI insights layer on top of an existing data warehouse — using GPT-4 + RAG to generate natural-language summaries of KPI trends, anomaly detection, and forward-looking recommendations.",
    industry: "SaaS",
    tags: ["Python", "GPT-4", "RAG", "Next.js", "PostgreSQL", "Pinecone"],
    client: "SaaS Analytics Company",
    role: "AI Product Lead · Prompt Engineering · Backend Architecture",
    outcome: "62% increase in customer retention. AI insights shipped in 11 weeks.",
    year: "2024",
    contentHtml: `<h2>The Challenge</h2><p>A SaaS analytics company with 3,000 B2B customers needed to differentiate with AI-driven insights but had no internal ML capability and a 6-month runway to ship.</p><h2>The Solution</h2><p>Built an AI insights layer using GPT-4 with RAG architecture over the customer's data warehouse — delivering natural-language KPI summaries, automated anomaly detection, and predictive recommendations per customer dataset.</p><h2>Key Results</h2><ul><li>62% increase in customer retention post-launch</li><li>Shipped in 11 weeks from kickoff</li><li>3,000 B2B customers gained AI-native reporting</li><li>NPS score increased by 28 points</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2024-03-05"),
    seoTitle: "AI Business Intelligence Dashboard Case Study — Nafiz Anam",
    seoDescription: "How we built an AI-powered BI dashboard for 3,000 B2B customers using GPT-4 and RAG, increasing retention by 62% in 11 weeks.",
  },
  {
    title: "Multi-Country ERP Integration & Automation",
    slug: "multi-country-erp-integration",
    excerpt: "Built a real-time ERP integration middleware that normalized data from SAP, Microsoft Dynamics, and two custom ERPs — automating consolidation, currency conversion, and report generation across 5 countries.",
    industry: "Enterprise",
    tags: ["Node.js", "SAP", "Microsoft Dynamics", "RabbitMQ", "PostgreSQL", "Docker"],
    client: "Manufacturing Group",
    role: "Integration Architect · Technical Lead · Stakeholder Management",
    outcome: "Month-end close reduced from 3 weeks to 4 hours. Zero consolidation errors.",
    year: "2022",
    contentHtml: `<h2>The Challenge</h2><p>A manufacturing group operating across 5 countries was manually consolidating financial data from 4 different ERP systems each month — a 3-week process prone to human error and compliance risk.</p><h2>The Solution</h2><p>Designed and built an event-driven integration middleware that connected SAP, Microsoft Dynamics, and two custom ERP systems — normalizing data schemas, handling multi-currency conversion, and automating the entire monthly consolidation workflow.</p><h2>Key Results</h2><ul><li>Month-end close reduced from 3 weeks to 4 hours</li><li>Zero manual consolidation errors since go-live</li><li>4 ERP systems integrated without disruption</li><li>Finance team capacity freed by 60%</li></ul>`,
    status: "published" as const,
    publishedAt: new Date("2022-04-18"),
    seoTitle: "Multi-Country ERP Integration Case Study — Nafiz Anam",
    seoDescription: "How we cut month-end close from 3 weeks to 4 hours by building a real-time ERP integration middleware across SAP, Dynamics, and custom systems.",
  },
];

async function main() {
  console.log("Seeding projects…");

  for (const project of PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`  ✓ ${project.title}`);
  }

  console.log(`Done. ${PROJECTS.length} projects seeded.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
