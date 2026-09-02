export interface ServicePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaImage?: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  description: string;
  problems: { title: string; description: string }[];
  deliverables: { title: string; description: string }[];
  process: { number: string; title: string; description: string }[];
  idealFor: { type: string; description: string }[];
  technologies: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "custom-software-development",
    metaTitle: "Custom Software Development | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Custom software built around how your business actually operates, not a generic template you have to work around.",
    metaImage: "/Nafiz_Anam_Custom_Software_development_Service.png",
    tagline: "Custom Software Development",
    headline: "Stop Working Around Software",
    headlineAccent: "That Wasn't Built for You.",
    description:
      "Generic tools solve generic problems. When your business has specific requirements, a workaround becomes standard practice, and standard practice quietly becomes the ceiling on how far you can grow. Custom software removes that ceiling, built around how you actually operate, not how a template assumes you do.",
    problems: [
      {
        title: "Legacy Software Holding You Back",
        description:
          "The system still technically works, but every change takes longer than it should, and nobody's fully sure what breaks if you touch it.",
      },
      {
        title: "Manual Workarounds at Scale",
        description:
          "What worked with ten employees breaks at fifty. Spreadsheets, side processes, and disconnected tools start costing more time than they save.",
      },
      {
        title: "Off-the-Shelf Software That Doesn't Fit",
        description:
          "Generic SaaS tools are built for the average case. When your business has specific requirements, you spend more time working around the tool than working with it.",
      },
      {
        title: "Systems That Can't Scale",
        description:
          "Software built without architectural thought becomes a ceiling. Adding users, features, or data volume creates performance problems and expensive rewrites.",
      },
      {
        title: "Disconnected Systems",
        description:
          "Data gets entered twice, reports take hours to compile, and different tools end up telling different versions of the truth.",
      },
    ],
    deliverables: [
      {
        title: "A System Architected to Scale",
        description:
          "Designed for where the business is going, not just where it is today.",
      },
      {
        title: "A Secure, Well-Built Backend",
        description:
          "Proper authentication, data protection, and APIs built to last.",
      },
      {
        title: "An Interface People Actually Want to Use",
        description:
          "Clean, fast, and built around how your team actually works, not a generic dashboard template.",
      },
      {
        title: "Reliable Cloud Infrastructure",
        description:
          "Deployment, environment management, and monitoring handled properly from day one.",
      },
      {
        title: "Automated Testing",
        description:
          "So changes don't quietly break something that used to work.",
      },
      {
        title: "Documentation That's Actually Useful",
        description:
          "Clear enough that your team, or a future engineer, can pick up the codebase with confidence.",
      },
      {
        title: "Support After Launch",
        description:
          "Bug fixes, small improvements, and technical advice as the business keeps evolving.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understanding the actual business problem before any technical discussion starts.",
      },
      {
        number: "02",
        title: "Planning",
        description:
          "Turning that understanding into a clear scope, timeline, and technical direction everyone agrees on.",
      },
      {
        number: "03",
        title: "Architecture",
        description:
          "Designing the system's foundation, the decision that's expensive to get wrong and cheap to get right early.",
      },
      {
        number: "04",
        title: "Development",
        description:
          "Building in visible, reviewable iterations, not disappearing for months and reappearing with a surprise.",
      },
      {
        number: "05",
        title: "QA & Testing",
        description:
          "Functional, performance, and security testing before anything reaches a real user.",
      },
      {
        number: "06",
        title: "Launch",
        description:
          "Production deployment with monitoring, rollback plans, and a clear go-live checklist.",
      },
      {
        number: "07",
        title: "Ongoing Support",
        description:
          "Staying involved after launch, not disappearing the day it ships.",
      },
    ],
    idealFor: [
      {
        type: "Funded Founders & Startups",
        description:
          "Building the first real version of a product, and it needs to be built to last past the MVP stage.",
      },
      {
        type: "Growing Businesses With Legacy Systems",
        description:
          "Outgrowing what got them here, and needing software that matches where they're headed, not where they started.",
      },
      {
        type: "Operations-Heavy Businesses",
        description:
          "Running on manual processes that a properly built system would remove entirely.",
      },
      {
        type: "Product & Engineering Teams",
        description:
          "Needing extra senior capacity, or a second opinion on a specific build, without adding permanent headcount.",
      },
    ],
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js", "Laravel", "PHP",
      "PostgreSQL", "MongoDB", "AWS", "Docker", "Tailwind CSS", "Prisma",
      "REST APIs", "GraphQL",
    ],
    faqs: [
      {
        q: "How long does a custom software project typically take?",
        a: "Depends entirely on scope. A focused internal tool might take four to six weeks. A full product build is usually measured in months. You'll get a real timeline as part of the proposal, not a guess upfront.",
      },
      {
        q: "How much does custom software development cost?",
        a: "It scales with complexity and scope, not a flat rate. A focused tool costs less than a full product build, and the right project matters more to me than fitting a specific budget bracket. You'll get a clear number before any work starts, not an open-ended estimate.",
      },
      {
        q: "Can you work with our existing team?",
        a: "Yes. I regularly work alongside in-house developers, either leading the technical direction or filling a specific gap in the team's capability.",
      },
      {
        q: "Can you modernize or extend existing software instead of rebuilding it?",
        a: "Often, yes, and it's usually the better call. A full rebuild sounds appealing but isn't always necessary. I'll tell you honestly which one your situation actually needs.",
      },
      {
        q: "Who owns the code after the project is done?",
        a: "You do, entirely. Full source code and documentation are handed over, no licensing strings attached.",
      },
    ],
  },

  {
    slug: "saas-product-engineering",
    metaTitle: "SaaS Product Engineering — Nafiz Anam",
    metaDescription:
      "Transform your SaaS idea into a scalable, production-ready product with modern architecture and engineering built for growth.",
    tagline: "SaaS Product Engineering",
    headline: "From Idea to Product,",
    headlineAccent: "Built to Scale.",
    description:
      "Most SaaS products fail not because of the idea, but because the engineering underneath can't support growth. I build SaaS products with the architecture decisions that allow you to scale from beta to thousands of paying users without an expensive rebuild.",
    problems: [
      {
        title: "No Technical Co-Founder",
        description:
          "You have a validated business idea but no engineering leadership to bring it to life. Hiring a full-time CTO is premature—but building without senior technical oversight is expensive.",
      },
      {
        title: "MVP That Can't Be Productionized",
        description:
          "An early-stage product built for speed now has architectural problems that make every new feature harder and every bug more damaging to customer trust.",
      },
      {
        title: "Scaling Pains",
        description:
          "The product works at small scale but slows down, breaks, or becomes unreliable as user volumes grow—creating churn at exactly the wrong moment.",
      },
      {
        title: "Multi-Tenancy Done Wrong",
        description:
          "Customer data isolation, per-account billing, and permission management are complex to retrofit. Getting them wrong creates security and compliance exposure.",
      },
      {
        title: "No Engineering Processes",
        description:
          "Code is shipping but quality is declining. There are no code reviews, no automated tests, and no deployment safety nets—just growing technical debt.",
      },
    ],
    deliverables: [
      {
        title: "Multi-Tenant Architecture",
        description:
          "Secure, scalable data isolation between customer accounts with per-tenant customization capability built in from day one.",
      },
      {
        title: "Subscription Billing Integration",
        description:
          "Stripe or equivalent billing with plan management, usage limits, trial periods, and upgrade/downgrade flows.",
      },
      {
        title: "Authentication & Authorization",
        description:
          "Secure user auth with role-based access control, SSO support, and multi-user organization management.",
      },
      {
        title: "Admin Dashboard",
        description:
          "Internal admin panel for customer management, feature flags, usage monitoring, and operational control.",
      },
      {
        title: "CI/CD Pipeline",
        description:
          "Automated testing, preview environments, and zero-downtime deployment pipelines so your team ships with confidence.",
      },
      {
        title: "Analytics & Monitoring",
        description:
          "Application performance monitoring, error tracking, and usage analytics so you understand how customers use the product.",
      },
      {
        title: "API & Webhook System",
        description:
          "Public API and webhook infrastructure so enterprise customers can integrate your product into their existing workflows.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Define the product vision, target customer, core workflows, and commercial model before any technical decisions are made.",
      },
      {
        number: "02",
        title: "Product Architecture",
        description:
          "Data model design, multi-tenancy strategy, API structure, and infrastructure planning aligned with growth expectations.",
      },
      {
        number: "03",
        title: "Core Build",
        description:
          "Authentication, billing, core feature set, and admin infrastructure built and validated with real user feedback.",
      },
      {
        number: "04",
        title: "Iteration",
        description:
          "Feature expansion driven by user data, prioritized by business impact, delivered in structured two-week cycles.",
      },
      {
        number: "05",
        title: "Performance Hardening",
        description:
          "Load testing, database optimization, caching strategy, and infrastructure scaling before growth campaigns.",
      },
      {
        number: "06",
        title: "Launch",
        description:
          "Production deployment with monitoring, alerting, rollback procedures, and go-to-market technical readiness.",
      },
      {
        number: "07",
        title: "Growth Partnership",
        description:
          "Ongoing engineering partnership as the product scales—new features, performance improvements, and technical strategy.",
      },
    ],
    idealFor: [
      {
        type: "Non-Technical Founders",
        description:
          "Founders with a validated product idea who need a trusted technical partner to lead the engineering from architecture through launch.",
      },
      {
        type: "Early-Stage Startups",
        description:
          "Startups that have raised initial funding and need to build a production-grade product without the overhead of assembling a full engineering team.",
      },
      {
        type: "Startups Outgrowing Their MVP",
        description:
          "Products with early traction that need architectural investment to handle growth without becoming unreliable or unmaintainable.",
      },
      {
        type: "Product Teams with Capacity Gaps",
        description:
          "Engineering teams that need a senior technical contributor for a specific platform initiative or major feature push.",
      },
    ],
    technologies: [
      "Next.js", "React", "TypeScript", "Node.js", "NestJS", "PostgreSQL",
      "Redis", "Stripe", "AWS", "Docker", "Kubernetes", "Prisma",
      "GitHub Actions", "Vercel", "Tailwind CSS",
    ],
    faqs: [
      {
        q: "Can you build a SaaS from scratch?",
        a: "Yes. I've taken multiple SaaS products from initial concept through production launch. This includes architecture, backend, frontend, billing integration, admin tooling, and deployment infrastructure.",
      },
      {
        q: "Do you work with early-stage startups?",
        a: "Yes. Early-stage is often where senior technical involvement has the highest return—avoiding architectural mistakes upfront saves months of expensive remediation later.",
      },
      {
        q: "Can you build on our existing codebase?",
        a: "Yes. I assess the current codebase first and provide an honest view of what works, what needs improvement, and what should be rebuilt. I work incrementally to avoid disrupting active users.",
      },
      {
        q: "How do you handle product decisions?",
        a: "I contribute technical input to product decisions but defer to the product owner on priorities. My role is to make the technical constraints and trade-offs visible so you can make informed decisions.",
      },
      {
        q: "Can you help us raise funding?",
        a: "Indirectly. A well-architected, reliable product demonstrates engineering maturity to investors. I can also provide technical documentation and architecture diagrams that support due diligence processes.",
      },
    ],
  },

  {
    slug: "ai-automation-business-systems",
    metaTitle: "AI Automation & Business Systems — Nafiz Anam",
    metaDescription:
      "Intelligent workflow automation, AI integrations, and business systems that eliminate manual work and improve operational efficiency.",
    tagline: "AI Automation & Business Systems",
    headline: "Automate What Slows",
    headlineAccent: "Your Business Down.",
    description:
      "AI is not about replacing people—it's about eliminating the repetitive, low-value work that prevents your team from focusing on what matters. I design and build AI-powered systems that integrate into your existing workflows and deliver measurable operational improvements.",
    problems: [
      {
        title: "Repetitive Manual Work at Scale",
        description:
          "Your team spends hours on tasks that follow predictable patterns—data entry, document processing, email triage, report generation—that modern AI can handle reliably.",
      },
      {
        title: "Data Siloed Across Disconnected Tools",
        description:
          "Information lives in different systems that don't talk to each other. Decisions require manual data gathering from multiple sources, introducing delays and errors.",
      },
      {
        title: "Slow Response to Business Signals",
        description:
          "Important events—a high-value lead, a support escalation, an inventory threshold—are noticed hours or days late because no system is monitoring for them proactively.",
      },
      {
        title: "Knowledge Not Captured or Accessible",
        description:
          "Institutional knowledge lives in documents, emails, and people's heads. Teams ask the same questions repeatedly because information is hard to find.",
      },
      {
        title: "High Labor Cost for Low-Value Tasks",
        description:
          "Talented people are being paid to do work that could be automated, making the business less competitive and the team less engaged.",
      },
    ],
    deliverables: [
      {
        title: "Workflow Automation Systems",
        description:
          "End-to-end automation of multi-step business processes with conditional logic, error handling, and human-in-the-loop review steps where needed.",
      },
      {
        title: "AI Document Processing",
        description:
          "Automated extraction, classification, and processing of contracts, invoices, reports, and other business documents at scale.",
      },
      {
        title: "RAG Knowledge Systems",
        description:
          "Retrieval-Augmented Generation systems that let your team query internal knowledge, documentation, and data in natural language.",
      },
      {
        title: "AI Agent Pipelines",
        description:
          "Multi-step AI agents that make decisions, use tools, and complete complex tasks autonomously within defined boundaries.",
      },
      {
        title: "System Integrations",
        description:
          "Connections between your existing tools—CRM, ERP, communication platforms—so data flows automatically without manual transfer.",
      },
      {
        title: "Monitoring & Observability",
        description:
          "Dashboards and alerting for automated system performance, error rates, processing volumes, and business impact metrics.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Workflow Audit",
        description:
          "Map current workflows, identify automation opportunities, and quantify the time and cost impact of each candidate process.",
      },
      {
        number: "02",
        title: "ROI Prioritization",
        description:
          "Rank automation opportunities by business impact and implementation complexity. Start with quick wins that build momentum.",
      },
      {
        number: "03",
        title: "System Design",
        description:
          "Architecture design for the automation system including data flows, error handling, human review checkpoints, and integration points.",
      },
      {
        number: "04",
        title: "Build & Integrate",
        description:
          "Development of automation systems with integration into existing tools, testing against real business scenarios, and edge case handling.",
      },
      {
        number: "05",
        title: "Validation",
        description:
          "Accuracy testing, performance benchmarking, and stakeholder review before any automated system touches production data.",
      },
      {
        number: "06",
        title: "Deployment",
        description:
          "Staged rollout with monitoring, fallback procedures, and team training on the new automated workflows.",
      },
      {
        number: "07",
        title: "Optimization",
        description:
          "Ongoing improvement of automation accuracy, expansion to new workflows, and adaptation as business processes evolve.",
      },
    ],
    idealFor: [
      {
        type: "Operations-Heavy Businesses",
        description:
          "Companies with high-volume, repetitive operational work where automation provides immediate cost reduction and quality improvement.",
      },
      {
        type: "Knowledge-Intensive Organizations",
        description:
          "Businesses where institutional knowledge is trapped in documents, emails, or people's memory—and needs to be made accessible at scale.",
      },
      {
        type: "Startups Scaling Operations",
        description:
          "Early-stage companies that need to scale output without scaling headcount proportionally—using AI to multiply team leverage.",
      },
      {
        type: "Businesses with Disconnected Tools",
        description:
          "Organizations running multiple software systems that don't integrate, causing manual data transfer, duplication, and delays.",
      },
    ],
    technologies: [
      "OpenAI", "Claude", "LangChain", "LlamaIndex", "Model Context Protocol",
      "RAG Pipelines", "Vector Databases", "Pinecone", "pgvector",
      "n8n", "Zapier", "Node.js", "Python", "PostgreSQL", "AWS Lambda",
    ],
    faqs: [
      {
        q: "Do I need to replace my existing tools?",
        a: "No. AI automation works best when it enhances existing workflows and integrates with tools your team already uses. Replacement is rarely necessary and often counterproductive.",
      },
      {
        q: "How accurate are AI automation systems?",
        a: "Accuracy depends on the task and the data available. For structured tasks like document extraction and classification, accuracy above 95% is typical. For complex judgment tasks, I design human-in-the-loop checkpoints so the system flags low-confidence cases for review.",
      },
      {
        q: "What if the AI makes a mistake?",
        a: "All systems I build include error handling, audit logging, and human review mechanisms for edge cases. The goal is to automate the predictable cases and escalate the unpredictable ones—not to remove humans entirely.",
      },
      {
        q: "How long does automation take to show ROI?",
        a: "For high-volume workflows, measurable ROI typically appears within the first month of deployment. The discovery session includes a time-savings estimate so you know what to expect before any work begins.",
      },
      {
        q: "Is my business data safe?",
        a: "Yes. Data handling, storage, and transmission are designed with security and compliance in mind from day one. AI processing can be configured to run on-premise or in a private cloud if data sovereignty requirements demand it.",
      },
    ],
  },

  {
    slug: "technical-consulting-architecture",
    metaTitle: "Technical Consulting & Architecture — Nafiz Anam",
    metaDescription:
      "Expert software architecture reviews, technology strategy, and technical advisory for founders and engineering teams.",
    tagline: "Technical Consulting & Architecture",
    headline: "Expert Guidance Before",
    headlineAccent: "You Commit.",
    description:
      "The most expensive technical decisions are the ones made before the architecture is clear. I provide independent, experienced technical advisory that helps businesses make confident decisions about technology, architecture, and engineering strategy—before committing significant time or capital.",
    problems: [
      {
        title: "Architecture Debt Slowing Delivery",
        description:
          "Every new feature takes longer than expected because the underlying architecture wasn't designed for the current scale of the product. Teams spend more time working around the system than building on top of it.",
      },
      {
        title: "Technology Decisions Made Without Expertise",
        description:
          "Technology choices made under time pressure or without sufficient experience create long-term problems. Switching later is expensive.",
      },
      {
        title: "Engineering Team Moving Too Slowly",
        description:
          "The team is busy but delivery is slower than the business expects. The bottleneck is usually architectural—not individual effort.",
      },
      {
        title: "Preparing for Scale",
        description:
          "Growth is coming but the current system wasn't built for it. Without a clear plan, scaling becomes a crisis instead of a milestone.",
      },
      {
        title: "Due Diligence or Investment Preparation",
        description:
          "Investors or acquirers need confidence in the technical foundation. An independent architecture assessment provides the evidence they need.",
      },
    ],
    deliverables: [
      {
        title: "Architecture Review Report",
        description:
          "A detailed assessment of the current system identifying strengths, risks, bottlenecks, and prioritized improvement recommendations.",
      },
      {
        title: "Technology Stack Recommendations",
        description:
          "Justified technology recommendations based on business requirements, team capabilities, and long-term product direction.",
      },
      {
        title: "Scalability Roadmap",
        description:
          "A phased plan for evolving the system to handle projected growth with cost, effort, and risk estimates for each phase.",
      },
      {
        title: "Technical Due Diligence",
        description:
          "Comprehensive codebase and architecture assessment for investor, acquirer, or board-level technical review.",
      },
      {
        title: "System Design Documents",
        description:
          "Architecture diagrams, data flow documentation, and decision records that give the engineering team a shared technical foundation.",
      },
      {
        title: "Ongoing Advisory",
        description:
          "Regular availability for technical questions, architecture reviews of proposed changes, and strategic guidance as the product evolves.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understand the business context, current technical state, team structure, and the decisions that need to be made.",
      },
      {
        number: "02",
        title: "Technical Assessment",
        description:
          "Code review, architecture analysis, infrastructure audit, and interviews with the engineering team to build a complete picture.",
      },
      {
        number: "03",
        title: "Risk Identification",
        description:
          "Catalogue of current technical risks organized by severity, likelihood, and business impact.",
      },
      {
        number: "04",
        title: "Recommendations",
        description:
          "Prioritized improvement recommendations with clear rationale, implementation effort estimates, and expected business outcomes.",
      },
      {
        number: "05",
        title: "Roadmap Planning",
        description:
          "Translation of recommendations into a phased implementation roadmap aligned with business priorities and engineering capacity.",
      },
      {
        number: "06",
        title: "Presentation",
        description:
          "Findings presented to technical and non-technical stakeholders with a clear narrative from current state to target state.",
      },
      {
        number: "07",
        title: "Implementation Support",
        description:
          "Optional ongoing advisory during implementation to ensure recommendations are executed correctly and adjusted as new information emerges.",
      },
    ],
    idealFor: [
      {
        type: "Founders Evaluating Technology Decisions",
        description:
          "Non-technical or semi-technical founders who need expert input before committing to a technology stack, vendor, or architecture approach.",
      },
      {
        type: "Engineering Teams at Architectural Crossroads",
        description:
          "Teams facing a significant architectural decision—re-platforming, microservices migration, scaling strategy—who need experienced outside perspective.",
      },
      {
        type: "Businesses Preparing for Investment",
        description:
          "Companies undergoing technical due diligence who need an independent, credible assessment of their engineering foundation.",
      },
      {
        type: "CTOs & Technical Leaders",
        description:
          "Technical leaders who want a senior peer review of architectural decisions, technology choices, or engineering strategy before committing.",
      },
    ],
    technologies: [
      "System Design", "Software Architecture", "Microservices", "Monolith",
      "Event-Driven Architecture", "API Design", "Database Design",
      "Cloud Architecture", "AWS", "Docker", "Kubernetes",
      "Performance Engineering", "Security Review", "Scalability Planning",
    ],
    faqs: [
      {
        q: "What does a technical consulting engagement look like?",
        a: "Most consulting engagements start with a fixed-scope architecture review (2–4 weeks), followed by an optional ongoing advisory arrangement. The review produces a written report with findings and recommendations that the team can act on independently.",
      },
      {
        q: "Do you need access to our codebase?",
        a: "For a full architecture review, yes—read access to the codebase provides significantly more actionable findings than infrastructure documentation alone. All access is covered by NDA and I follow your security protocols.",
      },
      {
        q: "Can you work with our existing engineering team?",
        a: "Yes. Most consulting engagements involve close collaboration with the internal team. I'm there to provide expertise and perspective, not to replace the team's judgment.",
      },
      {
        q: "What if we disagree with your recommendations?",
        a: "Recommendations come with rationale, not mandates. If the team has strong reasons to take a different approach, I want to understand them. Good consulting is a conversation, not a prescription.",
      },
      {
        q: "How quickly can you turn around an architecture review?",
        a: "A focused architecture review typically takes 2–3 weeks from initial access to final report delivery, depending on codebase size and scope of the assessment.",
      },
    ],
  },

  {
    slug: "cloud-infrastructure-devops",
    metaTitle: "Cloud Infrastructure & DevOps — Nafiz Anam",
    metaDescription:
      "Secure, scalable cloud infrastructure, CI/CD pipelines, and DevOps engineering for production-ready software systems.",
    tagline: "Cloud Infrastructure & DevOps",
    headline: "Infrastructure That Stays",
    headlineAccent: "Up and Scales.",
    description:
      "Unreliable infrastructure is invisible until something breaks—and then it's all you can think about. I design and build cloud environments that are secure, observable, and built to handle growth, with deployment pipelines that let your team ship with confidence rather than anxiety.",
    problems: [
      {
        title: "Slow, Unreliable Deployments",
        description:
          "Deploying takes hours, requires careful manual steps, and occasionally breaks production. The team dreads releases instead of celebrating them.",
      },
      {
        title: "No Observability into Production",
        description:
          "You find out about problems when customers report them. There's no monitoring, no alerting, and no visibility into what the system is doing until something fails.",
      },
      {
        title: "Security Gaps in Cloud Configuration",
        description:
          "Infrastructure set up for speed rather than security—exposed services, over-permissioned roles, unencrypted storage, and no audit trail.",
      },
      {
        title: "High and Unpredictable Cloud Costs",
        description:
          "Cloud bills that grow faster than revenue, with no clear understanding of where the cost is coming from or how to control it.",
      },
      {
        title: "No Disaster Recovery Plan",
        description:
          "No documented backup strategy, no tested restore procedure, and no confidence that data would survive a catastrophic failure.",
      },
    ],
    deliverables: [
      {
        title: "CI/CD Pipeline",
        description:
          "Automated build, test, and deployment pipelines with preview environments, staged rollouts, and zero-downtime deployment capability.",
      },
      {
        title: "Container Orchestration",
        description:
          "Docker and Kubernetes (or managed equivalents) configuration for consistent, portable, and scalable application deployment.",
      },
      {
        title: "Infrastructure as Code",
        description:
          "All infrastructure defined in code (Terraform, Pulumi, or CDK) so environments are reproducible, auditable, and version controlled.",
      },
      {
        title: "Monitoring & Alerting",
        description:
          "Application performance monitoring, log aggregation, error tracking, and alerting so issues are detected before customers notice.",
      },
      {
        title: "Security Hardening",
        description:
          "Network security, IAM role minimization, secrets management, encryption at rest and in transit, and compliance baseline configuration.",
      },
      {
        title: "Backup & Recovery",
        description:
          "Automated database backups, tested restore procedures, and documented disaster recovery runbooks.",
      },
      {
        title: "Cost Optimization",
        description:
          "Right-sizing of compute resources, reserved capacity planning, and architectural recommendations that reduce cloud spend without sacrificing reliability.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Infrastructure Audit",
        description:
          "Assessment of current cloud configuration, security posture, deployment process, and observability gaps.",
      },
      {
        number: "02",
        title: "Architecture Design",
        description:
          "Target infrastructure architecture designed for the application's scale requirements, security needs, and cost constraints.",
      },
      {
        number: "03",
        title: "IaC Implementation",
        description:
          "Infrastructure as Code implementation to make the target architecture reproducible, auditable, and manageable.",
      },
      {
        number: "04",
        title: "CI/CD Pipeline Build",
        description:
          "Automated deployment pipeline with test gates, preview environments, and production safeguards.",
      },
      {
        number: "05",
        title: "Security Hardening",
        description:
          "Security configuration review and remediation: network policies, IAM, secrets management, and encryption.",
      },
      {
        number: "06",
        title: "Observability Setup",
        description:
          "Monitoring, logging, error tracking, and alerting configured for production-level visibility.",
      },
      {
        number: "07",
        title: "Handover & Documentation",
        description:
          "Runbooks, architecture documentation, and team training so your engineers can operate and extend the infrastructure confidently.",
      },
    ],
    idealFor: [
      {
        type: "Teams with Manual Deployments",
        description:
          "Engineering teams where deployment is a manual, stressful process that creates bottlenecks and production risk.",
      },
      {
        type: "Startups Moving to Production",
        description:
          "Early-stage products transitioning from a development environment to a production-grade system that needs to be reliable and secure.",
      },
      {
        type: "Businesses with Infrastructure Security Concerns",
        description:
          "Organizations that have grown their cloud footprint without a consistent security model and need to establish a strong baseline.",
      },
      {
        type: "Scaling Applications",
        description:
          "Products experiencing growth that the current infrastructure wasn't designed to handle—performance degrading, costs rising, reliability declining.",
      },
    ],
    technologies: [
      "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions",
      "Nginx", "Traefik", "Cloudflare", "Linux", "Prometheus",
      "Grafana", "Datadog", "Sentry", "Redis", "PostgreSQL",
    ],
    faqs: [
      {
        q: "Do you work with AWS, GCP, or Azure?",
        a: "Primarily AWS, which I know deeply. I can work with GCP and Azure for specific services or existing environments, but AWS is where I provide the highest-quality recommendations.",
      },
      {
        q: "Can you improve our existing infrastructure without rebuilding it?",
        a: "Yes. Most engagements are incremental improvements—adding CI/CD, improving security configuration, adding monitoring—rather than full rebuilds. I assess current state first and recommend changes in priority order.",
      },
      {
        q: "Do you handle on-call and ongoing operations?",
        a: "I handle the setup and documentation of on-call runbooks, but ongoing operations are typically handed back to your team. I remain available for advisory and incident support under a retainer arrangement if needed.",
      },
      {
        q: "How do you approach cloud cost optimization?",
        a: "Cost optimization starts with understanding where money is being spent and why. Common wins include right-sizing compute, moving to reserved instances, eliminating unused resources, and architectural changes that reduce data transfer costs.",
      },
      {
        q: "What compliance standards do you work with?",
        a: "I've worked with SOC 2, GDPR, and HIPAA compliance requirements. Infrastructure hardening is always done with relevant compliance requirements in mind from the start.",
      },
    ],
  },

  {
    slug: "engineering-leadership",
    metaTitle: "Engineering Leadership — Nafiz Anam",
    metaDescription:
      "Fractional CTO, technical leadership, and engineering culture improvement for growing software teams.",
    tagline: "Engineering Leadership",
    headline: "Engineering Leadership",
    headlineAccent: "When You Need It.",
    description:
      "Great engineering teams don't happen by default—they're built through deliberate leadership, clear standards, and a culture of continuous improvement. I provide senior engineering leadership as a fractional CTO, technical lead, or embedded advisor to help teams deliver better software faster.",
    problems: [
      {
        title: "Team Delivering Slower Than Business Expects",
        description:
          "Sprints miss commitments, estimates are unreliable, and the backlog grows faster than the team can ship. The problem is usually process and architecture, not individual effort.",
      },
      {
        title: "Declining Code Quality Under Delivery Pressure",
        description:
          "Short-term delivery pressure has accumulated technical debt that now slows every subsequent delivery. The team knows the codebase is fragile but doesn't have time to fix it.",
      },
      {
        title: "No Senior Technical Voice",
        description:
          "The team is executing but no one is making architecture decisions, setting quality standards, or thinking about the system two years from now.",
      },
      {
        title: "Scaling the Engineering Team",
        description:
          "Hiring more engineers without the right processes and culture in place makes delivery slower, not faster. Onboarding is inefficient and standards are inconsistent.",
      },
      {
        title: "Founder-Engineer Breakdown",
        description:
          "The relationship between business leadership and the engineering team is strained by missed commitments, unclear priorities, or communication failures.",
      },
    ],
    deliverables: [
      {
        title: "Technical Roadmap",
        description:
          "A prioritized technical roadmap aligned with business goals, with clear milestones, capacity estimates, and risk identification.",
      },
      {
        title: "Engineering Standards",
        description:
          "Code review standards, branching strategy, testing requirements, and deployment processes that create consistency across the team.",
      },
      {
        title: "Architecture Governance",
        description:
          "Oversight of architectural decisions, design reviews for significant changes, and documentation of architectural principles and patterns.",
      },
      {
        title: "Team Mentoring",
        description:
          "Regular 1:1s, code review feedback, and coaching that develops engineer capabilities and builds a culture of continuous improvement.",
      },
      {
        title: "Hiring Support",
        description:
          "Technical interview design, candidate assessment, and hiring criteria definition to build an engineering team with complementary skills.",
      },
      {
        title: "Stakeholder Communication",
        description:
          "Clear, honest communication of technical progress, blockers, and risks to non-technical stakeholders—eliminating the translation gap.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Team Assessment",
        description:
          "Understand current team structure, delivery processes, codebase quality, architectural state, and organizational dynamics.",
      },
      {
        number: "02",
        title: "Priority Identification",
        description:
          "Identify the highest-leverage interventions: process changes, architectural improvements, or cultural shifts that will have the greatest impact.",
      },
      {
        number: "03",
        title: "Standards Definition",
        description:
          "Establish engineering standards for code quality, testing, deployment, and communication that the team can consistently work toward.",
      },
      {
        number: "04",
        title: "Process Improvement",
        description:
          "Implement delivery processes—sprint planning, estimation, code review, retrospectives—that improve predictability and reduce waste.",
      },
      {
        number: "05",
        title: "Active Leadership",
        description:
          "Regular involvement in architecture decisions, code reviews, team ceremonies, and stakeholder communication throughout the engagement.",
      },
      {
        number: "06",
        title: "Mentoring",
        description:
          "Systematic development of individual engineers through feedback, pairing, and coaching on both technical and professional skills.",
      },
      {
        number: "07",
        title: "Transition Planning",
        description:
          "Documentation, knowledge transfer, and internal leadership development so the team sustains the improvement after the engagement ends.",
      },
    ],
    idealFor: [
      {
        type: "Startups Without a CTO",
        description:
          "Early-stage companies that need senior engineering leadership but aren't ready to make a full-time CTO hire—or haven't found the right person yet.",
      },
      {
        type: "Companies Between CTOs",
        description:
          "Organizations in a CTO transition who need experienced interim leadership to maintain direction and momentum during the gap.",
      },
      {
        type: "Founders Managing Engineering Directly",
        description:
          "Technical or non-technical founders who are currently managing the engineering team themselves and need to offload technical leadership to focus on the business.",
      },
      {
        type: "Engineering Teams Needing Structure",
        description:
          "Teams that are capable individually but lack the processes, standards, and leadership to perform consistently as a unit.",
      },
    ],
    technologies: [
      "Technical Leadership", "Engineering Management", "System Design",
      "Architecture Review", "Code Review", "Agile", "Scrum", "Kanban",
      "OKRs", "Technical Hiring", "Mentoring", "Engineering Culture",
      "DevOps", "CI/CD", "Delivery Planning",
    ],
    faqs: [
      {
        q: "What does a fractional CTO engagement look like?",
        a: "Typically 1–3 days per week, with a mix of async and synchronous involvement. I join key team ceremonies, am available for async questions, lead architecture reviews, and have regular syncs with founders or leadership. The arrangement is flexible and adjusts to what the business needs.",
      },
      {
        q: "How quickly can you have an impact?",
        a: "Most teams see measurable improvement in delivery predictability and code quality within the first 4–6 weeks. Cultural improvements take longer but compound over time.",
      },
      {
        q: "Can you help us hire engineers?",
        a: "Yes. I design technical interview processes, assess candidates, and help define the hiring criteria that build a complementary team. I can also advise on compensation benchmarking and offer structure.",
      },
      {
        q: "Do you replace the engineering manager?",
        a: "No. I work alongside existing engineering managers and develop their capabilities rather than replacing them. My role is to provide senior technical perspective and leadership at a level above day-to-day management.",
      },
      {
        q: "What if we want to hire a full-time CTO later?",
        a: "I actively support this transition. I document the architectural vision, technical standards, and leadership processes I've established so the incoming CTO can hit the ground running rather than starting from scratch.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
