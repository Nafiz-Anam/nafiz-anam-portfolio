export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string; attribution?: string }
  | { type: "callout"; variant: "info" | "tip" | "warning"; title: string; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "pullquote"; text: string }
  | { type: "image"; src: string | null; alt: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
}

export interface ArticleData {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string | null;
  };
  coverImage: string | null;
  blocks: ContentBlock[];
  takeaways: string[];
  relatedArticles: RelatedArticle[];
}

const ARTICLES: ArticleData[] = [
  {
    slug: "why-saas-products-fail-year-two",
    category: "SaaS",
    title: "Why Most SaaS Products Fail in Year Two",
    subtitle:
      "The technical decisions founders make in year one quietly become the ceiling of what's possible in year two. Here's what to watch for — and how to avoid building yourself into a corner.",
    publishedDate: "June 12, 2025",
    readingTime: "8 min read",
    author: {
      name: "Nafiz Anam",
      role: "Lead Software Engineer & Founder",
      avatarUrl: "/Nafiz-Anam.jpg",
    },
    coverImage: null,
    takeaways: [
      "Most SaaS failures in year two are rooted in year-one architecture decisions, not market fit or product quality.",
      "Single-tenant data models and hardcoded business logic are the two most common technical time bombs.",
      "Scaling assumptions made for 10 users rarely survive contact with 1,000 — design for the next order of magnitude, not just the next sprint.",
      "Technical debt compounds like financial debt — the interest payments eventually exceed the principal.",
      "A proper multi-tenant schema and clean domain model in year one costs roughly the same effort as a wrong one — but saves months of rewrites later.",
      "The most dangerous phrase in early-stage engineering is: 'We'll refactor it when we have time.'",
    ],
    relatedArticles: [
      {
        slug: "multi-tenant-architecture-scale",
        title: "Designing Multi-Tenant Architectures That Scale",
        excerpt:
          "Shared schema, separate schemas, or hybrid? A practical breakdown of the trade-offs and when each approach makes sense.",
        category: "Architecture",
        readingTime: "12 min read",
        date: "May 2025",
      },
      {
        slug: "real-cost-of-technical-debt",
        title: "The Real Cost of Technical Debt",
        excerpt:
          "Technical debt isn't just slow development. It's compounding risk, lost engineers, and a business that can't adapt.",
        category: "Software Engineering",
        readingTime: "7 min read",
        date: "May 2025",
      },
      {
        slug: "choosing-tech-stack-2025",
        title: "Choosing the Right Tech Stack in 2025",
        excerpt:
          "The best tech stack isn't the newest one. It's the one that fits your team, your timeline, and your product's scaling characteristics.",
        category: "Software Engineering",
        readingTime: "6 min read",
        date: "Mar 2025",
      },
    ],
    blocks: [
      {
        type: "p",
        html: "Year one of a SaaS product is a sprint. You're moving fast, validating assumptions, closing your first customers. The code is held together with optimism and caffeine. And that's okay — it's supposed to be. The problem is what happens next.",
      },
      {
        type: "p",
        html: "Most SaaS products don't fail because the market wasn't there. They fail because the product can't evolve fast enough to capture it. By year two, the team is spending 60–70% of their engineering capacity on maintenance, workarounds, and firefighting instead of building. The codebase has become the enemy.",
      },
      {
        type: "pullquote",
        text: "The most dangerous technical debt isn't the kind that slows you down. It's the kind that makes the right next move impossible.",
      },
      {
        type: "p",
        html: "I've seen this pattern across dozens of SaaS products — from early-stage startups to Series B companies. The root causes are almost always the same. This article breaks down the four most common technical time bombs and what to do about them.",
      },
      {
        type: "h2",
        id: "the-architecture-trap",
        text: "The Architecture Trap",
      },
      {
        type: "p",
        html: "The most common year-one mistake is building a single-tenant architecture and calling it multi-tenant. This sounds like a subtle distinction, but it has enormous downstream consequences.",
      },
      {
        type: "p",
        html: "A true multi-tenant data model isolates customer data at the schema level while allowing shared infrastructure. A fake multi-tenant model adds a <code>company_id</code> column to every table and hopes for the best. Here's what the latter looks like in practice:",
      },
      {
        type: "code",
        lang: "sql",
        code: `-- Year one: looks multi-tenant, isn't really
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  company_id  UUID REFERENCES companies(id),
  role        TEXT DEFAULT 'member',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  company_id  UUID REFERENCES companies(id),  -- manually enforced everywhere
  owner_id    UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- The missing row-level isolation means one bad query
-- can leak data across company boundaries.`,
      },
      {
        type: "callout",
        variant: "warning",
        title: "The Silent Data Leak Risk",
        text: "When every query must manually filter by company_id, one forgotten WHERE clause leaks data across tenant boundaries. This isn't theoretical — it has caused real security incidents at funded companies. Row-level security policies or a proper tenancy abstraction layer eliminate this class of bug entirely.",
      },
      {
        type: "p",
        html: "The correct approach is to enforce tenancy at the database level — either through row-level security policies (Postgres supports this natively), separate schemas per tenant, or a tenancy middleware layer that guarantees isolation before queries reach the ORM. The exact choice depends on your scale and compliance requirements.",
      },
      {
        type: "h2",
        id: "the-scaling-assumption-problem",
        text: "The Scaling Assumption Problem",
      },
      {
        type: "p",
        html: "Engineers building for 10 users make decisions that work for 10 users. That's rational. The problem is those decisions often require a complete rewrite to support 10,000 users — not an upgrade.",
      },
      {
        type: "p",
        html: "The most common scaling assumption mistakes I see in early SaaS products:",
      },
      {
        type: "ul",
        items: [
          "Synchronous processing for everything — no job queues, no background workers, no async patterns",
          "No caching layer — every page load hits the database, every time",
          "N+1 query patterns baked deep into ORM usage that's been copy-pasted across the codebase",
          "No pagination — endpoints that return all records until they return 50,000 records",
          "File processing on the web server thread — uploads that block request handling",
          "Secrets and configuration hardcoded or stored in plaintext environment variables without rotation support",
        ],
      },
      {
        type: "blockquote",
        text: "You don't need to solve every scaling problem on day one. But you need to be aware of which problems you're deferring — and design escape hatches so you can solve them later without a rewrite.",
        attribution: "Nafiz Anam",
      },
      {
        type: "p",
        html: "The goal isn't premature optimization. It's designing the system so that the right next move is always possible. A synchronous email-sending function that becomes a queue-backed job is a two-hour refactor. A synchronous email-sending function that's been inlined into 40 different request handlers is a week-long migration.",
      },
      {
        type: "h2",
        id: "data-model-debt",
        text: "Data Model Debt",
      },
      {
        type: "p",
        html: "The data model is the hardest thing to change in a production system. Schema migrations on live databases are painful, risky, and slow. This is why data model decisions made in year one carry the most long-term weight — and why getting them wrong is so expensive.",
      },
      {
        type: "p",
        html: "Here's a comparison of the trade-offs between fixing data model debt early versus late:",
      },
      {
        type: "table",
        headers: ["Factor", "Fix in Year One", "Fix in Year Two"],
        rows: [
          ["Migration risk", "Low — small dataset, no critical users", "High — production data, paying customers"],
          ["Engineering cost", "1–2 days per model change", "1–2 weeks per model change"],
          ["Downtime required", "Usually none", "Often unavoidable"],
          ["Team confidence", "High — changes are exploratory", "Low — fear of breaking prod"],
          ["Opportunity cost", "Minimal — product is young", "Severe — team can't ship features"],
          ["Customer impact", "Zero or near-zero", "Significant — affects uptime SLAs"],
        ],
      },
      {
        type: "p",
        html: "The pattern I recommend: treat the data model like a public API. Changing it should be deliberate, backward-compatible where possible, and always done through proper migration files — never by editing the database directly.",
      },
      {
        type: "h2",
        id: "hardcoded-business-logic",
        text: "Hardcoded Business Logic",
      },
      {
        type: "p",
        html: "The fourth pattern — and the most insidious — is business logic baked directly into infrastructure. Pricing tiers hardcoded in middleware. Plan limits checked in the database schema. Feature flags as environment variables that require a deploy to change.",
      },
      {
        type: "h3",
        id: "the-pricing-problem",
        text: "The Pricing Problem",
      },
      {
        type: "p",
        html: "Pricing changes are one of the most common and highest-leverage things an early SaaS company does. If your pricing tier logic is scattered across 15 files and requires a deploy to update, your ability to run experiments is severely constrained.",
      },
      {
        type: "callout",
        variant: "tip",
        title: "Design for Configurability",
        text: "Separate business rules from code. Store plan limits, feature flags, and pricing tiers in the database or a config service — not in code. This lets you change business rules without deployments, run A/B tests on pricing, and grant exceptions to specific customers without one-off hacks.",
      },
      {
        type: "h2",
        id: "what-to-do-differently",
        text: "What to Do Differently",
      },
      {
        type: "p",
        html: "The good news: most of these problems are avoidable with a small amount of upfront intentionality. You don't need to over-engineer. You need to make decisions that keep future moves possible.",
      },
      {
        type: "ol",
        items: [
          "Design your data model around your domain, not your current UI. Build for the entities your business operates on, not the screens you're showing today.",
          "Enforce tenancy at the infrastructure level from day one. Don't rely on application code to maintain isolation.",
          "Introduce a job queue from the start, even if you don't need it yet. The pattern is cheap to add early and expensive to retrofit.",
          "Keep business rules in data, not in code. Pricing tiers, plan limits, feature flags — store them where they can be changed without a deploy.",
          "Define a clear migration strategy and run every schema change through it. No manual edits to production databases, ever.",
          "Write the system you'd be comfortable handing to another engineer. If understanding your codebase requires tribal knowledge, the bus factor is already a problem.",
        ],
      },
      {
        type: "image",
        src: null,
        alt: "Architecture diagram: multi-tenant SaaS data isolation layers",
        caption:
          "A proper multi-tenant architecture enforces isolation at multiple layers — not just in application code.",
      },
      {
        type: "h2",
        id: "conclusion",
        text: "Conclusion",
      },
      {
        type: "p",
        html: "SaaS success in year two depends heavily on what you build — and what you avoid building — in year one. The companies that scale cleanly aren't the ones who had perfect foresight. They're the ones who made decisions with future flexibility in mind, even when they couldn't predict exactly what future they'd need to be flexible for.",
      },
      {
        type: "p",
        html: "Technical debt is real, and some amount of it is inevitable and even rational in early-stage products. The goal isn't zero debt — it's debt you're aware of, debt you've chosen deliberately, and debt you have a plan to retire.",
      },
      {
        type: "pullquote",
        text: "Ship fast. But build the version of the product that the next version of your team can actually work with.",
      },
    ],
  },
  {
    slug: "multi-tenant-architecture-scale",
    category: "Architecture",
    title: "Designing Multi-Tenant Architectures That Scale",
    subtitle:
      "Shared schema, separate schemas, or hybrid? A practical breakdown of the three core multi-tenancy patterns, the trade-offs that matter, and how to choose the right approach for your SaaS product.",
    publishedDate: "May 28, 2025",
    readingTime: "12 min read",
    author: {
      name: "Nafiz Anam",
      role: "Lead Software Engineer & Founder",
      avatarUrl: "/Nafiz-Anam.jpg",
    },
    coverImage: null,
    takeaways: [
      "Multi-tenancy isn't one pattern — it's a spectrum from fully shared infrastructure to fully isolated per-tenant environments.",
      "Shared schema (single database, tenant_id column) is fastest to build but has the weakest isolation and hardest compliance story.",
      "Separate schemas per tenant offers strong isolation with lower cost than full database separation, and works well up to thousands of tenants.",
      "Hybrid approaches are increasingly common: shared infrastructure for small tenants, isolated for enterprise customers.",
      "Row-level security in PostgreSQL is a powerful, underused tool that brings database-enforced tenant isolation to shared-schema architectures.",
      "Choose your model based on your compliance requirements, expected tenant count, and the enterprise vs. SMB mix of your customer base.",
    ],
    relatedArticles: [
      {
        slug: "why-saas-products-fail-year-two",
        title: "Why Most SaaS Products Fail in Year Two",
        excerpt:
          "The technical decisions founders make in year one quietly become the ceiling of what's possible in year two.",
        category: "SaaS",
        readingTime: "8 min read",
        date: "Jun 2025",
      },
      {
        slug: "real-cost-of-technical-debt",
        title: "The Real Cost of Technical Debt",
        excerpt:
          "Technical debt isn't just slow development. It's compounding risk, lost engineers, and a business that can't adapt.",
        category: "Software Engineering",
        readingTime: "7 min read",
        date: "May 2025",
      },
      {
        slug: "docker-in-production",
        title: "Docker in Production: What Most Tutorials Miss",
        excerpt:
          "Running Docker in development is easy. Running it reliably in production is a different discipline entirely.",
        category: "Cloud & DevOps",
        readingTime: "10 min read",
        date: "Apr 2025",
      },
    ],
    blocks: [
      {
        type: "p",
        html: "Multi-tenancy is one of the defining architectural decisions in any SaaS product. Get it right and your infrastructure scales cleanly as your customer base grows. Get it wrong and you're looking at a painful migration — on live production data, under time pressure, with paying customers watching.",
      },
      {
        type: "pullquote",
        text: "Multi-tenancy is not a feature you add later. It's an architectural constraint that shapes every table you design and every query you write.",
      },
      {
        type: "h2",
        id: "the-three-models",
        text: "The Three Core Models",
      },
      {
        type: "p",
        html: "There are three primary approaches to multi-tenancy in SaaS, each representing a different point on the isolation vs. efficiency trade-off spectrum.",
      },
      {
        type: "table",
        headers: ["Model", "Isolation", "Cost", "Complexity", "Best For"],
        rows: [
          ["Shared Schema", "Low", "Lowest", "Low", "SMB-focused products, MVPs"],
          ["Separate Schemas", "Medium", "Medium", "Medium", "Mid-market SaaS"],
          ["Separate Databases", "High", "Highest", "High", "Enterprise, regulated industries"],
        ],
      },
    ],
  },
  {
    slug: "real-cost-of-technical-debt",
    category: "Software Engineering",
    title: "The Real Cost of Technical Debt",
    subtitle:
      "Technical debt isn't just slow development. It's compounding risk, lost engineers, and a business that can't adapt when it needs to most.",
    publishedDate: "May 14, 2025",
    readingTime: "7 min read",
    author: {
      name: "Nafiz Anam",
      role: "Lead Software Engineer & Founder",
      avatarUrl: "/Nafiz-Anam.jpg",
    },
    coverImage: null,
    takeaways: [
      "Technical debt has four distinct costs: velocity, quality, talent, and optionality — most organizations only measure the first.",
      "The talent cost of technical debt is often larger than the direct engineering cost — senior engineers leave codebases they can't respect.",
      "Not all technical debt is equal: deliberate debt with a retirement plan is a tool; accidental debt from poor decisions is a liability.",
      "Paying down debt requires dedicated capacity — 'we'll fix it later' almost never happens without budget explicitly allocated to it.",
      "The right metric for technical debt is not lines of code but: how long does it take to implement a new feature end-to-end?",
    ],
    relatedArticles: [
      {
        slug: "why-saas-products-fail-year-two",
        title: "Why Most SaaS Products Fail in Year Two",
        excerpt: "The technical decisions founders make in year one quietly become the ceiling of what's possible.",
        category: "SaaS",
        readingTime: "8 min read",
        date: "Jun 2025",
      },
      {
        slug: "multi-tenant-architecture-scale",
        title: "Designing Multi-Tenant Architectures That Scale",
        excerpt: "A practical breakdown of the three core multi-tenancy patterns and how to choose.",
        category: "Architecture",
        readingTime: "12 min read",
        date: "May 2025",
      },
      {
        slug: "engineering-leadership-founders-wrong",
        title: "Engineering Leadership: What Founders Get Wrong",
        excerpt: "Most founders think hiring a senior engineer solves their technical leadership problem.",
        category: "Leadership",
        readingTime: "11 min read",
        date: "Mar 2025",
      },
    ],
    blocks: [
      {
        type: "p",
        html: "Every engineering team carries technical debt. The question isn't whether you have it — it's whether you understand what it's actually costing you.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): ArticleData | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}
