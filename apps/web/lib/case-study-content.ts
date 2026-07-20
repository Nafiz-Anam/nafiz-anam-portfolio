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

const CASE_STUDIES: CaseStudyData[] = [
  {
    slug: "patient-management-saas-platform",
    industry: "Healthcare",
    clientType: "Multi-location clinic network",
    role: "Full-Stack Lead · System Architecture · Compliance",
    timeline: "Jan 2024 – Aug 2024 · 8 months",
    status: "Live",
    title: "Patient Management SaaS Platform",
    summary:
      "Replaced paper-based workflows across 12 clinic locations with a HIPAA-compliant multi-tenant SaaS platform, eliminating 80% of administrative overhead.",
    heroImageSrc: null,

    overview: {
      clientBackground:
        "A regional healthcare provider operating 12 clinic locations across three states, managing over 40,000 active patients. Despite strong clinical outcomes, their operations ran almost entirely on paper — from appointment scheduling to patient records and follow-up communications.",
      businessContext:
        "The healthcare industry was under increasing regulatory scrutiny around data handling and patient privacy. At the same time, patient expectations had shifted — people expected online booking, digital records access, and automated reminders as baseline features. The client was losing new patient acquisition to smaller, more digitally capable competitors.",
      objectives: [
        "Eliminate paper-based workflows across all 12 locations",
        "Achieve HIPAA compliance from day one, with a defensible audit trail",
        "Enable centralized scheduling with real-time availability across locations",
        "Automate patient communications: reminders, follow-ups, and care sequences",
        "Deliver a self-service patient portal accessible from any device",
      ],
      scopeOfWork: [
        "Full-stack web application: staff portal + patient-facing portal",
        "Multi-tenant backend API with per-clinic data isolation",
        "Authentication, role-based access control, and PHI encryption",
        "Appointment scheduling engine with conflict detection",
        "Automated notification system (email, SMS)",
        "HIPAA-compliant audit logging and access controls",
        "Cloud infrastructure design, provisioning, and deployment",
      ],
      myResponsibilities: [
        "Led all architecture decisions from initial discovery through production",
        "Designed the multi-tenant data model and tenancy isolation strategy",
        "Engineered the HIPAA compliance layer including encryption and audit trails",
        "Managed a cross-functional team of 4 engineers and 1 designer",
        "Ran bi-weekly client reviews with stakeholders across clinic leadership",
        "Delivered the production rollout across all 12 locations",
      ],
    },

    challenges: [
      {
        category: "Manual Workflows",
        title: "Paper-based operations at scale",
        description:
          "Every patient interaction — scheduling, intake, follow-up — required physical paper and manual data entry. Staff spent an estimated 60% of their administrative time on tasks that should take seconds. Lost forms, illegible handwriting, and filing backlogs were chronic.",
      },
      {
        category: "Compliance",
        title: "No HIPAA-compliant infrastructure",
        description:
          "Patient health information (PHI) was stored in spreadsheets, paper files, and unencrypted email threads. A single audit would have resulted in significant fines. Any digital system had to be built HIPAA-compliant from the ground up — not retrofitted.",
      },
      {
        category: "Integration",
        title: "Three disconnected legacy scheduling systems",
        description:
          "Each cluster of locations used a different scheduling tool — none of which had public APIs. Consolidating availability data required phone calls between front desks. Patients wanting cross-location appointments were turned away.",
      },
      {
        category: "Scalability",
        title: "No path to digital growth",
        description:
          "The existing setup had no way to onboard new patients at scale, no way to surface availability across locations, and no way to run automated follow-up programs. Competitor clinics with patient portals were capturing referral traffic the client was generating but losing.",
      },
      {
        category: "Poor UX",
        title: "Staff tech literacy varied widely",
        description:
          "Front desk staff ranged from digitally fluent to tech-averse. Any platform would need to be intuitive enough for same-day adoption — without a lengthy training program — or rollout would stall.",
      },
    ],

    solution: {
      intro:
        "Rather than modernizing existing tools or integrating legacy systems, we made the decision early to build a unified platform from scratch — designed specifically for multi-location healthcare operations. This gave us full control over the data model, compliance posture, and user experience, and eliminated the fragility that comes from stitching together incompatible legacy systems.",
      productStrategy:
        "We phased the rollout deliberately: scheduling came first because it had the highest daily impact and the clearest ROI. Patient records and the patient portal came second. Automated communications came last, after staff had fully adopted the core workflows. Each phase had defined success criteria before the next began.",
      keyDecisions: [
        {
          title: "Schema-per-tenant data isolation",
          description:
            "Instead of a shared schema with a clinic_id column — the default in most SaaS multi-tenant systems — we used a separate PostgreSQL schema per clinic. This gave us true data isolation, a simpler compliance story, and the ability to run per-clinic backups and restores without cross-tenant risk.",
        },
        {
          title: "HIPAA compliance by design, not retrofit",
          description:
            "We treated PHI encryption, access logging, and minimum-necessary access controls as first-class architectural requirements rather than features to add later. Every field containing PHI was encrypted at rest using AES-256. Every access event was written to an immutable audit log before the primary transaction committed.",
        },
        {
          title: "Role-based access at three tiers",
          description:
            "The platform needed to support clinic administrators (cross-location visibility), front desk staff (single-location scheduling), and patients (self-service only). We built an RBAC system that enforced these boundaries at the API middleware layer — not just in the UI — so even direct API access couldn't bypass role constraints.",
        },
        {
          title: "Event-driven notifications over synchronous calls",
          description:
            "All patient communications — reminders, confirmations, follow-up sequences — were decoupled from the request lifecycle using a queue-backed notification system. This meant appointment creation was never blocked by a slow SMS provider, and notification failures were retried automatically without impacting the user experience.",
        },
      ],
      developmentProcess:
        "We ran two-week sprints with a weekly internal demo and bi-weekly client review. The first four weeks were entirely discovery and architecture — no code written until the data model was signed off. We maintained a staging environment that mirrored production from week six onward, and all client reviews happened against staging, never a demo environment.",
    },

    architecture: {
      intro:
        "The platform is a three-tier architecture with a clear separation between presentation, business logic, and data — designed to support horizontal scaling at each tier independently. Every architectural decision was made with HIPAA compliance, multi-tenancy, and operational simplicity as the primary constraints.",
      layers: [
        {
          name: "Client Layer",
          category: "frontend",
          description:
            "Two separate Next.js applications: a staff portal for clinic operations and a patient-facing portal for self-service. Both are server-rendered for SEO and initial load performance, with client-side hydration for interactive scheduling flows.",
          nodes: [
            "Next.js Staff Portal",
            "Patient Portal PWA",
            "Admin Dashboard",
          ],
        },
        {
          name: "API Layer",
          category: "api",
          description:
            "A single Node.js REST API handles all business logic. A separate WebSocket service manages real-time appointment availability updates. Authentication is handled by a dedicated service to isolate token issuance from business logic.",
          nodes: [
            "Node.js REST API",
            "WebSocket Service",
            "Auth Service (JWT)",
            "Notification Worker",
          ],
        },
        {
          name: "Data Layer",
          category: "data",
          description:
            "PostgreSQL with one schema per clinic tenant provides strong data isolation. Redis handles session state and real-time slot caching. PHI fields are encrypted at the application layer before write.",
          nodes: [
            "PostgreSQL (schema-per-tenant)",
            "Redis Cache",
            "S3-compatible Object Storage",
            "Audit Log (append-only)",
          ],
        },
        {
          name: "Infrastructure Layer",
          category: "infra",
          description:
            "All services run as Docker containers orchestrated by a managed Kubernetes cluster. Nginx handles SSL termination and load balancing. Automated backups run nightly with 30-day retention.",
          nodes: [
            "Managed Kubernetes (DigitalOcean)",
            "Nginx + Let's Encrypt",
            "GitHub Actions CI/CD",
            "Automated Nightly Backups",
          ],
        },
      ],
      securityHighlights: [
        "AES-256 field-level encryption for all PHI before database write",
        "Immutable audit log captures actor, action, resource, and timestamp for every PHI access",
        "JWT access tokens (15 min) + rotated refresh tokens (30d) stored as bcrypt hashes",
        "Minimum-necessary access enforced at API middleware — role violations return 403 before business logic executes",
        "VPC network isolation: database and cache layers have no public IP exposure",
        "Automated dependency scanning on every pull request via Dependabot + custom SAST pipeline",
      ],
      deploymentNotes:
        "Deployments run through a GitHub Actions pipeline: lint, test, build, then a rolling Kubernetes deployment with automatic rollback on health check failure. Zero-downtime deployments have been maintained across all 14 production releases since launch.",
    },

    features: [
      {
        title: "Cross-Location Scheduling Engine",
        description:
          "A real-time appointment scheduling system that surfaces availability across all clinic locations simultaneously. Staff can book, reschedule, and cancel from a unified calendar view. Conflict detection prevents double-booking at the provider level. Patients can see cross-location availability and book directly from the patient portal.",
        businessValue:
          "Eliminated an estimated 3.5 hours per day per location in scheduling coordination calls. Patients wanting cross-location appointments — previously turned away — now book successfully in under 2 minutes.",
        imageSrc: null,
        imageAlt: "Cross-location scheduling calendar interface",
      },
      {
        title: "Patient Self-Service Portal",
        description:
          "A mobile-first patient portal that gives patients direct access to upcoming appointments, visit history, intake forms, and secure messaging with their care team. Built as a Progressive Web App for native-like performance without requiring an app store download.",
        businessValue:
          "94% of active patients enrolled within 90 days of launch. Front desk call volume for appointment inquiries dropped by 71%, freeing staff for higher-value interactions.",
        imageSrc: null,
        imageAlt: "Patient self-service portal on mobile",
      },
      {
        title: "Automated Care Communication Sequences",
        description:
          "A configurable automation engine that handles the full communication lifecycle: appointment confirmation on booking, reminders at 48 hours and 2 hours before, post-visit follow-up at 72 hours, and care sequence messaging for chronic care programs. All messages are personalized and routed via email or SMS based on patient preference.",
        businessValue:
          "No-show rate reduced from 23% to 9% within two months of automated reminders going live. That single metric improvement represented an estimated $180,000 in recovered annual revenue across the network.",
        imageSrc: null,
        imageAlt: "Automated patient communication sequence configuration",
      },
      {
        title: "HIPAA Compliance & Audit Dashboard",
        description:
          "A built-in compliance dashboard giving clinic administrators visibility into all PHI access events, user activity, and system-level security events. Audit reports are exportable in the format required for HIPAA breach assessments and OCR inquiries. Administrators receive automated alerts for access pattern anomalies.",
        businessValue:
          "The platform passed its first HIPAA audit with zero findings. The compliance dashboard reduced audit preparation time from an estimated 3 weeks to 4 hours, enabling the client to respond to compliance inquiries with confidence.",
        imageSrc: null,
        imageAlt: "HIPAA compliance and audit log dashboard",
      },
    ],

    results: {
      metrics: [
        {
          value: "80%",
          label: "reduction in administrative overhead",
          context: "Across all 12 clinic locations",
        },
        {
          value: "12",
          label: "clinic locations live",
          context: "Deployed within 6 months of kickoff",
        },
        {
          value: "94%",
          label: "patient portal adoption",
          context: "Within 90 days of launch",
        },
        {
          value: "0",
          label: "HIPAA audit findings",
          context: "First formal compliance audit passed clean",
        },
        {
          value: "71%",
          label: "drop in front-desk call volume",
          context: "Appointment inquiry calls eliminated",
        },
        {
          value: "$180K",
          label: "recovered annual revenue",
          context: "From no-show reduction alone",
        },
      ],
      testimonial: {
        quote:
          "We went from paper charts and missed appointments to a system our staff actually likes using. The rollout was smoother than we expected, and the HIPAA audit that previously kept our compliance officer up at night was a non-event. Nafiz and his team built exactly what we needed — and they understood our business, not just the technology.",
        author: "Dr. Sarah Mitchell",
        role: "Medical Director, Regional Clinic Network",
      },
      additionalOutcomes: [
        "14 production releases since launch with zero unplanned downtime",
        "No-show rate reduced from 23% to 9% within 60 days of communication automation",
        "Staff onboarding time for new front desk employees reduced from 3 days to 4 hours",
        "Cross-location appointment booking — previously impossible — now represents 18% of all bookings",
        "System handling 200+ concurrent users during peak morning scheduling windows without performance degradation",
      ],
    },

    relatedProjects: [
      {
        slug: "enterprise-operations-intelligence-system",
        title: "Enterprise Operations Intelligence System",
        industry: "Logistics",
        description:
          "Unified 14 disconnected systems into a single operations platform for a national freight operator, replacing Excel workflows and eliminating $2M in annual operational inefficiency.",
        imageSrc: null,
      },
      {
        slug: "payment-reconciliation-platform",
        title: "Payment Reconciliation & Settlement Platform",
        industry: "Finance",
        description:
          "Automated reconciliation engine for a fintech processing $50M/month — eliminating $500K/year in manual errors and achieving PCI DSS compliance.",
        imageSrc: null,
      },
      {
        slug: "high-scale-learning-management-platform",
        title: "High-Scale Learning Management Platform",
        industry: "Education",
        description:
          "Replatformed a crashing single-server LMS for 500K students to a distributed microservices architecture on AWS, achieving 10x user capacity.",
        imageSrc: null,
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyData | null {
  return CASE_STUDIES.find((cs) => cs.slug === slug) ?? null;
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((cs) => cs.slug);
}
