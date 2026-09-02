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
  ctaEyebrow: string;
  ctaHeadline: string;
  ctaHeadlineAccent: string;
  ctaDescription: string;
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
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Let's Build Software",
    ctaHeadlineAccent: "That Actually Fits.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me about the problem, and I'll tell you honestly what it'll take to solve it.",
  },

  {
    slug: "saas-product-engineering",
    metaTitle: "SaaS Product Engineering | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Building SaaS products with the architecture decisions that let you scale from beta to thousands of paying users, without an expensive rebuild.",
    metaImage: "/Nafiz_Anam_SaaS_Product_Engineering_Service.png",
    tagline: "SaaS Product Engineering",
    headline: "Most SaaS Products Fail",
    headlineAccent: "on Architecture, Not the Idea.",
    description:
      "A SaaS product that works for ten users and one that works for ten thousand are built differently from day one. I engineer for the second one from the start, so growth doesn't force a rebuild you didn't budget for.",
    problems: [
      {
        title: "No Technical Co-Founder",
        description:
          "You have a real business idea and validated demand, but no one senior enough to lead the engineering. Hiring a full-time CTO before you need one is expensive, and often premature.",
      },
      {
        title: "An MVP That Can't Be Productionized",
        description:
          "What got you your first users was never meant to survive real traffic. Rebuilding it properly, without stopping the business, is its own kind of hard.",
      },
      {
        title: "Scaling Pain",
        description:
          "The product worked fine at a small scale and starts breaking, slowing down, or becoming unreliable as usage grows, right when churn is most expensive.",
      },
      {
        title: "Multi-Tenancy Done Wrong",
        description:
          "Customer data isolation, per-account billing, and permission management are complicated to retrofit. Getting them wrong creates security and compliance exposure.",
      },
      {
        title: "No Engineering Process",
        description:
          "Code ships fast, but quality is declining. No code reviews, no automated tests, no deployment safety nets, just growing technical debt.",
      },
    ],
    deliverables: [
      {
        title: "Multi-Tenant Architecture",
        description:
          "Secure, scalable data isolation between customer accounts, built in from the start, not bolted on later.",
      },
      {
        title: "Subscription Billing Integration",
        description:
          "Stripe or your payment provider of choice, integrated properly: upgrades, downgrades, trials, and dunning handled correctly.",
      },
      {
        title: "Authentication & Authorization",
        description:
          "Secure sign-up and login, with role-based access control that scales as your customer base and their teams grow.",
      },
      {
        title: "An Admin Dashboard",
        description:
          "Internal tooling for customer support, usage monitoring, and operational visibility, not just the customer-facing product.",
      },
      {
        title: "A CI/CD Pipeline",
        description:
          "Automated testing and deployment infrastructure, so shipping new features doesn't mean holding your breath.",
      },
      {
        title: "Analytics & Monitoring",
        description:
          "Real visibility into how the product performs and how customers actually use it.",
      },
      {
        title: "API & Webhook System",
        description:
          "Public API and webhook infrastructure, so enterprise customers can integrate your product into their existing workflows.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understanding the business model, the users, and what \"success\" actually looks like before any architecture decisions get made.",
      },
      {
        number: "02",
        title: "Product Architecture",
        description:
          "Designing the technical foundation for where the product is going, multi-tenancy, billing, and scale included from the start.",
      },
      {
        number: "03",
        title: "Core Build",
        description:
          "Building the primary product experience in visible, reviewable iterations.",
      },
      {
        number: "04",
        title: "Iteration",
        description:
          "Refining based on real usage and early customer feedback, not assumptions made before launch.",
      },
      {
        number: "05",
        title: "Performance Hardening",
        description:
          "Load testing, query optimization, and infrastructure tuning before growth exposes weaknesses.",
      },
      {
        number: "06",
        title: "Launch",
        description:
          "Production deployment with monitoring, alerting, rollback procedures, and a go-to-market technical readiness check.",
      },
      {
        number: "07",
        title: "Growth Partnership",
        description:
          "Ongoing engineering partnership as the product scales: new features, performance improvements, and technical strategy.",
      },
    ],
    idealFor: [
      {
        type: "Non-Technical Founders",
        description:
          "Have a validated product idea and need a trusted technical partner to lead the engineering from architecture through launch.",
      },
      {
        type: "Early-Stage Startups",
        description:
          "Have raised initial funding and need to build a production-grade product without the overhead of assembling a full engineering team.",
      },
      {
        type: "Startups Outgrowing Their MVP",
        description:
          "Have early traction, and need architectural investment before growth turns into instability.",
      },
      {
        type: "Product Teams With Capacity Gaps",
        description:
          "Need a senior technical contributor for a specific platform initiative or major feature push, without a permanent hire.",
      },
    ],
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL",
      "Redis", "Prisma", "GraphQL", "AWS", "Docker", "Kubernetes",
      "Tailwind CSS",
    ],
    faqs: [
      {
        q: "Can you build a SaaS product from scratch?",
        a: "Yes, this is a large part of what I do: taking a validated idea from zero to a production-ready product, architecture, billing, and infrastructure included.",
      },
      {
        q: "Do you work with early-stage startups?",
        a: "Yes, regularly, including pre-revenue teams with a validated idea and enough funding or runway to invest in getting the architecture right the first time.",
      },
      {
        q: "Can you build on top of an existing codebase?",
        a: "Yes. I don't default to a rebuild. If your existing product has a solid foundation, I'll extend it. If the architecture is genuinely the problem, I'll tell you that directly, and we'll talk through what a rebuild would actually take.",
      },
      {
        q: "How do you handle product decisions?",
        a: "I bring a technical perspective to product tradeoffs, what's expensive to build, what's risky to scale, what's worth deferring, but the product vision and priorities stay yours. I'm a partner in the decision, not the decision-maker.",
      },
      {
        q: "Can you help us raise funding?",
        a: "Not directly, that's outside what I do. What I can do is make sure the product itself, and the technical story behind it, holds up to investor scrutiny.",
      },
    ],
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Let's Build Something",
    ctaHeadlineAccent: "That Can Actually Scale.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me about the product, and I'll tell you honestly what it'll take to build it right.",
  },

  {
    slug: "ai-automation-business-systems",
    metaTitle: "AI Automation & Business Systems | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Removing the repetitive, manual work quietly capping your team's capacity, with AI systems built into how your business actually operates.",
    metaImage: "/Nafiz_Anam_AI_Automation_Services.png",
    tagline: "AI Automation & Business Systems",
    headline: "Your Team Isn't the Bottleneck.",
    headlineAccent: "The Manual Work Is.",
    description:
      "AI isn't about replacing people, it's about removing the repetitive, low-value work that keeps your best people from doing the work that actually matters. I design and build automation systems that integrate into how your business already operates, and deliver measurable operational improvement, not a chatbot demo.",
    problems: [
      {
        title: "Repetitive Manual Work at Scale",
        description:
          "Your team spends hours on tasks that follow predictable patterns: data entry, document processing, email triage, report generation. Modern AI can handle most of it.",
      },
      {
        title: "Data Siloed Across Disconnected Tools",
        description:
          "Information lives in different systems that don't talk to each other. Decisions require manually pulling data from multiple sources before anyone can act.",
      },
      {
        title: "Slow Response to Business Signals",
        description:
          "A high-value lead, a support escalation, an inventory threshold, gets noticed hours or days late because no system is monitoring for it proactively.",
      },
      {
        title: "Knowledge Locked in People's Heads",
        description:
          "Institutional knowledge lives in documents, emails, and individual memory. Teams answer the same questions repeatedly because the information is hard to find.",
      },
      {
        title: "High Labor Cost for Low-Value Tasks",
        description:
          "Skilled people are being paid to do work that could be automated, making the business less competitive and the team less engaged.",
      },
    ],
    deliverables: [
      {
        title: "Workflow Automation Systems",
        description:
          "End-to-end automation for the multi-step processes eating up your team's time, built around how the work actually happens, not a generic template.",
      },
      {
        title: "AI Document Processing",
        description:
          "Automated extraction, classification, and processing of contracts, invoices, forms, and other unstructured documents.",
      },
      {
        title: "Knowledge Systems (RAG)",
        description:
          "Systems that make institutional knowledge searchable and answerable, instead of buried in documents, spreadsheets, and individual inboxes.",
      },
      {
        title: "AI Agent Pipelines",
        description:
          "Multi-step agents that handle tasks end to end, not just answer isolated questions.",
      },
      {
        title: "System Integrations",
        description:
          "Connecting your existing tools, CRM, ERP, or internal databases, so automated workflows work across your actual stack, not in isolation.",
      },
      {
        title: "Monitoring & Observability",
        description:
          "Dashboards and alerting for automated systems, so you always know what's processing, what's catching errors, and what business impact it's actually having.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Workflow Audit",
        description:
          "Mapping the manual processes actually costing your team time, before recommending a single tool.",
      },
      {
        number: "02",
        title: "ROI Prioritization",
        description:
          "Ranking automation opportunities by business impact and implementation complexity, starting with quick wins that build momentum.",
      },
      {
        number: "03",
        title: "System Design",
        description:
          "Architecture designed for the automation system itself: data flows, error handling, human checkpoints, and integration points.",
      },
      {
        number: "04",
        title: "Build & Integrate",
        description:
          "Development of the automation system with integration into your existing tools, tested against real business scenarios and edge cases.",
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
          "Running processes that consume significant staff time on repetitive, rules-based work.",
      },
      {
        type: "Knowledge-Intensive Organizations",
        description:
          "Information is scattered across documents, tools, and individual expertise, and finding the right answer takes too long.",
      },
      {
        type: "Startups Scaling Operations",
        description:
          "Need to scale output without scaling headcount proportionally, using automation to multiply team leverage.",
      },
      {
        type: "Businesses With Disconnected Tools",
        description:
          "Running multiple software systems that don't integrate, causing manual data transfer, duplication, and delays.",
      },
    ],
    technologies: [
      "OpenAI", "Claude", "LangChain", "Model Context Protocol",
      "RAG Pipelines", "Vector Databases", "AI Agents", "n8n",
      "Workflow Automation",
    ],
    faqs: [
      {
        q: "Do I need to replace my existing tools?",
        a: "No. Most automation systems integrate with what you already use. The goal is connecting and automating your existing stack, not forcing a migration to new software.",
      },
      {
        q: "How accurate are AI automation systems?",
        a: "Depends on the task. Document processing and data extraction typically run very high in accuracy with proper validation built in. Anything that touches money, compliance, or customer-facing decisions gets a human checkpoint by design, not blind automation.",
      },
      {
        q: "What happens when the AI makes a mistake?",
        a: "Every system I build includes error handling, confidence thresholds, and human review points for anything high-stakes. The goal is removing repetitive work, not removing accountability.",
      },
      {
        q: "Is my business data safe?",
        a: "Yes. Data handling is designed around your existing security and compliance requirements, and I'll tell you plainly if a particular AI tool or integration isn't appropriate for sensitive data.",
      },
      {
        q: "Can automation actually save us money, or is this just hype?",
        a: "Depends entirely on the workflow. Some processes are genuinely well-suited to automation and pay for themselves quickly. Others aren't, and I'll tell you honestly when a manual process is still the right call.",
      },
    ],
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Let's Automate",
    ctaHeadlineAccent: "What's Actually Slowing You Down.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me what's eating your team's time, and I'll tell you honestly whether automation is the right fix.",
  },

  {
    slug: "technical-consulting-architecture",
    metaTitle: "Technical Consulting & Architecture | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Independent technical advisory that helps you make confident decisions about technology, architecture, and engineering strategy before you commit budget.",
    metaImage: "/Nafiz_Anam_technical_Consulting_Architecture_Service.png",
    tagline: "Technical Consulting & Architecture",
    headline: "The Most Expensive Decisions",
    headlineAccent: "Are the Ones Made First.",
    description:
      "Architecture decisions made without enough expertise in the room are cheap to make and expensive to reverse. I provide independent, experienced technical advisory so you can make confident calls about technology, architecture, and engineering strategy, before committing real time or capital to the wrong direction.",
    problems: [
      {
        title: "Architecture Debt Slowing Delivery",
        description:
          "Every new feature takes longer than it should, because the underlying architecture wasn't designed for the product's current scale. The team spends more time working around the system than building on top of it.",
      },
      {
        title: "Technology Decisions Made Without Expertise",
        description:
          "Choices get made under time pressure or without enough senior experience in the room, and the consequences show up months later as expensive problems.",
      },
      {
        title: "An Engineering Team Moving Too Slowly",
        description:
          "Delivery is slower than the business expects, and the bottleneck is usually architectural, not effort.",
      },
      {
        title: "Preparing to Scale",
        description:
          "Growth is coming and the current system wasn't built for it. Without a clear plan, scaling becomes a crisis instead of a milestone.",
      },
      {
        title: "Due Diligence or Investment Preparation",
        description:
          "Investors or acquirers need confidence in the technical foundation. An independent assessment provides the evidence they're asking for.",
      },
    ],
    deliverables: [
      {
        title: "Architecture Review Report",
        description:
          "A detailed assessment of the current system, identifying strengths, risks, bottlenecks, and prioritized improvement recommendations.",
      },
      {
        title: "Technology Stack Recommendations",
        description:
          "Justified technology choices based on your actual requirements, team capabilities, and long-term direction, not what's trending.",
      },
      {
        title: "A Scalability Roadmap",
        description:
          "A phased plan for evolving the system to handle projected growth, with cost, effort, and risk estimates for each phase.",
      },
      {
        title: "Technical Due Diligence",
        description:
          "A comprehensive codebase and architecture assessment for investor, acquirer, or board-level review.",
      },
      {
        title: "System Design Documents",
        description:
          "Architecture diagrams, data flow documentation, and decision records that give your engineering team a shared technical foundation.",
      },
      {
        title: "Ongoing Advisory",
        description:
          "Regular availability for technical questions, architecture reviews, and strategic guidance as the product evolves.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Discovery",
        description:
          "Understanding the business context behind the technical question: what's driving the need for a review, and what decisions it needs to inform.",
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
          "Cataloguing current technical risks, organized by severity, likelihood, and business impact.",
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
          "Translating the recommendations into a phased implementation roadmap aligned with business priorities and engineering capacity.",
      },
      {
        number: "06",
        title: "Presentation",
        description:
          "Findings presented to technical and non-technical stakeholders, with a clear narrative from current state to target state.",
      },
      {
        number: "07",
        title: "Implementation Support",
        description:
          "Optional ongoing advisory during implementation, to make sure recommendations are executed correctly and adjusted as new information emerges.",
      },
    ],
    idealFor: [
      {
        type: "Founders Evaluating Technology Decisions",
        description:
          "Weighing a major technical choice and need an experienced, independent perspective before committing.",
      },
      {
        type: "Engineering Teams at Architectural Crossroads",
        description:
          "Facing a decision about whether to extend the current system or invest in a significant redesign.",
      },
      {
        type: "Businesses Preparing for Investment",
        description:
          "Need a credible, independent assessment of their technical foundation ahead of due diligence.",
      },
      {
        type: "CTOs & Technical Leaders",
        description:
          "Want a senior peer review of architectural decisions, technology choices, or engineering strategy before committing.",
      },
    ],
    technologies: [
      "System Design", "Software Architecture", "Microservices",
      "Security Review", "Cloud Infrastructure", "API Design",
      "Database Design", "Cost Optimization", "Scalability Planning",
      "Performance Engineering",
    ],
    faqs: [
      {
        q: "What does a technical consulting engagement actually look like?",
        a: "It usually starts with a structured assessment: reviewing your codebase, architecture, and infrastructure, and talking to your team. That's followed by a written report with prioritized recommendations, presented in a way both technical and non-technical stakeholders can act on.",
      },
      {
        q: "Do you need access to our codebase?",
        a: "Yes, for a proper architecture review. Access is scoped to what's needed for the engagement, and covered by an NDA before anything is shared.",
      },
      {
        q: "Can you work with our existing engineering team?",
        a: "Yes, this is usually how it works best. I review, interview, and collaborate with your team directly rather than working in isolation, so recommendations reflect how the system actually works, not just what the code says.",
      },
      {
        q: "What if we disagree with your recommendation?",
        a: "That's a normal part of the process. I'll explain my reasoning clearly and walk through the tradeoffs, but the decision is always yours. My job is to make sure it's an informed one.",
      },
      {
        q: "How quickly can you turn around an architecture review?",
        a: "Depends on the size of the codebase and system, but most reviews are completed within two to three weeks. Urgent due diligence timelines can usually be accommodated, just flag it upfront.",
      },
    ],
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Get a Second Opinion",
    ctaHeadlineAccent: "Before You Commit.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me about the decision you're facing, and I'll tell you honestly whether an independent review would actually help.",
  },

  {
    slug: "cloud-infrastructure-devops",
    metaTitle: "Cloud Infrastructure & DevOps | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Cloud infrastructure that's boring in the best way: reliable, observable, and built to handle growth without the 2am page.",
    metaImage: "/Nafiz_Anam_Cloud_Infrastructure_Devops_Services.png",
    tagline: "Cloud Infrastructure & DevOps",
    headline: "If You Can Feel Your Infrastructure,",
    headlineAccent: "Something's Already Wrong.",
    description:
      "Unreliable infrastructure is invisible until something breaks, and then it's all anyone can think about. I design and build cloud environments that are secure, observable, and built to handle growth, with deployment pipelines that let your team ship with confidence, not anxiety.",
    problems: [
      {
        title: "Slow, Unreliable Deployments",
        description:
          "Shipping takes hours, requires careful manual steps, and occasionally breaks production. The team dreads releases instead of shipping often.",
      },
      {
        title: "No Observability Into Production",
        description:
          "You find out about problems when customers report them. There's no monitoring, no alerting, and no real visibility into what the system is actually doing.",
      },
      {
        title: "Security Gaps in Cloud Configuration",
        description:
          "Infrastructure set up for speed rather than security: exposed services, over-permissioned access, unencrypted storage, and no audit trail.",
      },
      {
        title: "High and Unpredictable Cloud Costs",
        description:
          "Bills that grow faster than revenue, with no clear understanding of where the spend is actually coming from.",
      },
      {
        title: "No Disaster Recovery Plan",
        description:
          "No documented backup strategy, no tested restore procedure, and no confidence the business could survive a catastrophic failure.",
      },
    ],
    deliverables: [
      {
        title: "CI/CD Pipeline",
        description:
          "Automated build, test, and deployment pipelines with preview environments, staged rollouts, and zero-downtime deploys.",
      },
      {
        title: "Container Orchestration",
        description:
          "Docker and Kubernetes, or a managed equivalent, configured for consistent, portable, and scalable application deployment.",
      },
      {
        title: "Infrastructure as Code",
        description:
          "All infrastructure defined in code, so environments are reproducible, auditable, and version controlled.",
      },
      {
        title: "Monitoring & Alerting",
        description:
          "Application performance monitoring, log aggregation, and alerting, so issues get caught before customers notice them.",
      },
      {
        title: "Security Hardening",
        description:
          "Network security, least-privilege access, secrets management, encryption at rest and in transit, and baseline compliance configuration.",
      },
      {
        title: "Backup & Recovery",
        description:
          "Automated backups, tested restore procedures, and documented disaster recovery runbooks.",
      },
      {
        title: "Cost Optimization",
        description:
          "Right-sizing compute resources, reserved capacity planning, and architectural recommendations that reduce cloud spend without sacrificing reliability.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Infrastructure Audit",
        description:
          "Assessing the current setup for reliability, security, and cost, before recommending anything.",
      },
      {
        number: "02",
        title: "Architecture Design",
        description:
          "Designing the target infrastructure, including provider choice, environment structure, and deployment strategy.",
      },
      {
        number: "03",
        title: "IaC Implementation",
        description:
          "Rebuilding infrastructure as code, so it's reproducible and no longer dependent on manual configuration.",
      },
      {
        number: "04",
        title: "CI/CD Pipeline Build",
        description:
          "Building automated pipelines for testing, building, and deploying code with minimal manual steps.",
      },
      {
        number: "05",
        title: "Security Hardening",
        description:
          "Implementing access controls, encryption, and baseline security configuration across the environment.",
      },
      {
        number: "06",
        title: "Observability Setup",
        description:
          "Monitoring, error tracking, and alerting configured for production-level visibility.",
      },
      {
        number: "07",
        title: "Handover & Documentation",
        description:
          "Runbooks, architecture documentation, and team training, so your engineers can operate and extend the infrastructure confidently.",
      },
    ],
    idealFor: [
      {
        type: "Teams With Manual Deployments",
        description:
          "Still shipping with manual steps, and it's slowing releases down and introducing risk.",
      },
      {
        type: "Startups Moving to Production",
        description:
          "Ready to launch and need infrastructure that can actually support real users, not just a demo.",
      },
      {
        type: "Businesses With Infrastructure or Security Concerns",
        description:
          "Uncertain whether their current setup would hold up to scrutiny, or to an actual incident.",
      },
      {
        type: "Scaling Applications",
        description:
          "Growing fast enough that the current infrastructure is becoming a genuine constraint.",
      },
    ],
    technologies: [
      "AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions",
      "Nginx", "Cloudflare", "Linux", "PostgreSQL",
    ],
    faqs: [
      {
        q: "Do you work with AWS, GCP, or Azure?",
        a: "Yes, primarily AWS, though the underlying principles carry across providers. I'll recommend whichever fits your existing setup and team's familiarity, rather than defaulting to one.",
      },
      {
        q: "Can you improve our existing infrastructure without rebuilding it?",
        a: "Usually, yes. Most engagements start with hardening and improving what's already running rather than a full migration. A rebuild only gets recommended when it's genuinely the better call.",
      },
      {
        q: "Do you handle on-call and ongoing operations?",
        a: "I can, as part of an ongoing retainer. For project-based engagements, I hand off with full documentation and training so your team can operate it confidently.",
      },
      {
        q: "How do you approach cloud cost optimization?",
        a: "By looking at actual usage patterns first, not just switching instance sizes. Most cost problems come from architecture decisions, not pricing, so that's where the real savings usually are.",
      },
      {
        q: "What compliance standards do you work with?",
        a: "I've worked with general security best practices and standard data protection requirements. For a specific regulatory framework your business needs to meet, tell me upfront and I'll be direct about whether it's within my expertise or needs a specialist alongside me.",
      },
    ],
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Let's Build Infrastructure",
    ctaHeadlineAccent: "You Don't Have to Think About.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me what's breaking or worrying you, and I'll tell you honestly what it would take to fix it.",
  },

  {
    slug: "engineering-leadership",
    metaTitle: "Engineering Leadership | Nafiz Anam — Technology & Product Partner",
    metaDescription:
      "Fractional CTO and technical leadership for growing teams that need direction, standards, and mentoring, without a full-time senior hire.",
    metaImage: "/Nafiz_Anam_Engineering_Leadership_Service.png",
    tagline: "Engineering Leadership",
    headline: "Talented Engineers",
    headlineAccent: "Still Need Someone Setting the Direction.",
    description:
      "Great engineering teams don't happen by default, they're built through deliberate leadership, clear standards, and a culture of continuous improvement. I provide senior engineering leadership as a fractional CTO, technical lead, or embedded advisor, to help teams deliver better software, faster.",
    problems: [
      {
        title: "A Team Delivering Slower Than the Business Expects",
        description:
          "Sprints miss commitments, estimates are unreliable, and the backlog grows faster than the team can ship. The problem is usually process and architecture, not individual effort.",
      },
      {
        title: "Declining Code Quality Under Delivery Pressure",
        description:
          "Short-term delivery pressure has accumulated technical debt that now slows every subsequent release. The codebase is fragile, but nobody's had time to fix it.",
      },
      {
        title: "No Senior Technical Voice",
        description:
          "The team is executing, but no one is making architecture decisions, setting quality standards, or thinking about the system two years from now.",
      },
      {
        title: "Scaling the Engineering Team",
        description:
          "Hiring more engineers without the right process and culture in place makes delivery slower, not faster. Onboarding is inefficient and standards are inconsistent.",
      },
      {
        title: "Founder-Engineer Breakdown",
        description:
          "The relationship between business leadership and the engineering team is strained by missed commitments, unclear priorities, or communication failures.",
      },
    ],
    deliverables: [
      {
        title: "A Technical Roadmap",
        description:
          "A prioritized technical roadmap aligned with business goals, with clear milestones, estimates, and risk identification.",
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
          "Regular one-on-ones, code review, and coaching that develops engineer capability and builds a culture of continuous improvement.",
      },
      {
        title: "Hiring Support",
        description:
          "Technical interview design, candidate assessment, and hiring criteria definition to build an engineering team with complementary skills.",
      },
      {
        title: "Stakeholder Communication",
        description:
          "Clear, honest communication of technical progress, blockers, and risks to non-technical stakeholders, eliminating the translation gap.",
      },
    ],
    process: [
      {
        number: "01",
        title: "Team Assessment",
        description:
          "Understanding the current team structure, delivery process, codebase quality, architectural state, and organizational dynamics.",
      },
      {
        number: "02",
        title: "Priority Identification",
        description:
          "Identifying the highest-leverage interventions: process changes, architectural improvements, or culture shifts that will have the greatest impact.",
      },
      {
        number: "03",
        title: "Standards Definition",
        description:
          "Establishing engineering standards for code quality, testing, deployment, and communication that the team can consistently work toward.",
      },
      {
        number: "04",
        title: "Process Improvement",
        description:
          "Implementing delivery processes: sprint planning, estimation, code review, retrospectives, that improve predictability and reduce waste.",
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
          "Documentation, knowledge transfer, and internal leadership development, so the team sustains the improvement after the engagement ends.",
      },
    ],
    idealFor: [
      {
        type: "Founders Managing Engineering Directly",
        description:
          "Currently the de facto technical leader, and need senior oversight without stepping back from the business.",
      },
      {
        type: "Engineering Teams Needing Structure",
        description:
          "Shipping code but missing the standards, process, or architecture governance that turns effort into predictable delivery.",
      },
      {
        type: "Startups Scaling Their Team",
        description:
          "Growing the engineering headcount, and need leadership in place before growth outpaces process.",
      },
      {
        type: "Businesses Between Technical Leaders",
        description:
          "Between a departed CTO and their next hire, and need continuity so delivery doesn't stall in the gap.",
      },
    ],
    technologies: [
      "Technical Leadership", "Engineering Management", "System Design",
      "Architecture Review", "Code Review", "Agile & Scrum",
      "Technical Hiring", "Mentoring", "Engineering Culture", "CI/CD",
      "Delivery Planning",
    ],
    faqs: [
      {
        q: "What does a fractional CTO engagement actually look like?",
        a: "Typically a set number of hours or days per week, covering architecture decisions, code review, team mentoring, and stakeholder communication. The exact mix depends on what the team actually needs, decided during discovery, not assumed upfront.",
      },
      {
        q: "How quickly can you join a team?",
        a: "Usually within one to two weeks of agreeing on scope. The first two weeks are spent on assessment, understanding the team, codebase, and process, before making any changes.",
      },
      {
        q: "Can you help us hire engineers?",
        a: "Yes. I can design the technical interview process, assess candidates, and help define the hiring criteria that actually match what the team needs, not just a generic job description.",
      },
      {
        q: "Do you replace the engineering manager?",
        a: "No, and this usually isn't a good fit if there's already strong technical leadership in place. This service fills the gap when there isn't one, or when that role needs experienced backup.",
      },
      {
        q: "What if we want to hire a full-time CTO later?",
        a: "That's a natural outcome of this working well. I'll help define the role, and often help find and evaluate the right hire, then hand off cleanly with full documentation and context.",
      },
    ],
    ctaEyebrow: "LET'S TALK",
    ctaHeadline: "Let's Give Your Team",
    ctaHeadlineAccent: "the Direction It's Missing.",
    ctaDescription:
      "The first conversation is free, with no obligation. Tell me what's not working with the team, and I'll tell you honestly whether fractional leadership is the right fix.",
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
