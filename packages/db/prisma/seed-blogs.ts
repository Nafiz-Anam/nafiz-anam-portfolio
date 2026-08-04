import { prisma } from "../src/index";

const POSTS = [
  {
    title: "Why Most Custom Software Projects Fail Before They Start",
    slug: "why-custom-software-projects-fail-before-they-start",
    excerpt:
      "Most failed software projects don't fail in the code — they fail in the first two weeks, before a single line is written. Here's what actually predicts success.",
    category: "Engineering",
    tags: ["Software Strategy", "Product", "Discovery"],
    contentHtml: `<h2>The Real Failure Point</h2><p>By the time a project is "over budget and behind schedule," the outcome was often decided weeks earlier — in a discovery phase that got skipped or rushed.</p><h2>What Predicts Success</h2><ul><li>A written problem statement everyone agrees on</li><li>A single owner who can say yes/no on scope</li><li>A definition of done before the first sprint</li></ul><p>Skip these and no amount of engineering talent saves the timeline.</p>`,
    readTimeMinutes: 6,
    status: "published" as const,
    publishedAt: new Date("2024-01-12"),
    authorName: "Nafiz Anam",
    seoTitle: "Why Custom Software Projects Fail Before They Start — Nafiz Anam",
    seoDescription:
      "Most failed software projects fail in discovery, not development. Here's what actually predicts whether a build succeeds.",
  },
  {
    title: "The Real Cost of Technical Debt (With Numbers)",
    slug: "the-real-cost-of-technical-debt-with-numbers",
    excerpt:
      "Technical debt is usually discussed in the abstract. Here's how to actually quantify it, and when paying it down is the cheaper option.",
    category: "Engineering",
    tags: ["Technical Debt", "Architecture", "Team Velocity"],
    contentHtml: `<h2>Debt Compounds Like Debt</h2><p>Every shortcut has an interest rate — measured in slower feature delivery, more bugs per release, and onboarding time for new engineers.</p><h2>A Simple Framework</h2><p>Track: time-to-ship for a comparable feature this quarter vs. a year ago. If it's growing while team size is flat, debt is the cause more often than not.</p>`,
    readTimeMinutes: 7,
    status: "published" as const,
    publishedAt: new Date("2024-02-20"),
    authorName: "Nafiz Anam",
    seoTitle: "The Real Cost of Technical Debt, Quantified — Nafiz Anam",
    seoDescription:
      "A practical framework for measuring technical debt in real numbers, and deciding when it's worth paying down.",
  },
  {
    title: "SaaS Architecture Decisions That Actually Matter Early",
    slug: "saas-architecture-decisions-that-matter-early",
    excerpt:
      "Not every architecture decision needs to be right on day one. These four do — because they're expensive to reverse once you have paying customers.",
    category: "Architecture",
    tags: ["SaaS", "Architecture", "Scaling"],
    contentHtml: `<h2>Decisions You Can Change Later</h2><p>Framework choice, hosting provider, even your database ORM — all reversible with effort but not catastrophic.</p><h2>Decisions You Can't</h2><ul><li>Multi-tenancy model (shared schema vs. isolated)</li><li>Primary key strategy for data you'll migrate</li><li>Auth/session architecture</li><li>Billing model assumptions baked into the data model</li></ul><p>Spend your early-stage architecture time here, not on framework debates.</p>`,
    readTimeMinutes: 8,
    status: "published" as const,
    publishedAt: new Date("2024-04-03"),
    authorName: "Nafiz Anam",
    seoTitle: "SaaS Architecture Decisions That Matter Early — Nafiz Anam",
    seoDescription:
      "Four SaaS architecture decisions worth getting right on day one, because they're expensive to reverse once you have customers.",
  },
  {
    title: "How I Structure Discovery Calls With New Clients",
    slug: "how-i-structure-discovery-calls-with-new-clients",
    excerpt:
      "A discovery call isn't a sales pitch — it's the first fifteen minutes of the engineering process. Here's the exact structure I use.",
    category: "Process",
    tags: ["Client Work", "Discovery", "Freelancing"],
    contentHtml: `<h2>The Structure</h2><ol><li>What's broken today, specifically (not "we need a system")</li><li>Who touches this workflow, and how often</li><li>What's the cost of doing nothing for another 6 months</li><li>What does "done" look like to the person paying the invoice</li></ol><p>If I can't get clear answers to these four, I don't scope the project yet — I schedule a second call.</p>`,
    readTimeMinutes: 5,
    status: "published" as const,
    publishedAt: new Date("2024-05-22"),
    authorName: "Nafiz Anam",
    seoTitle: "How I Structure Client Discovery Calls — Nafiz Anam",
    seoDescription:
      "The exact discovery call structure I use with new clients to scope projects accurately before writing a proposal.",
  },
  {
    title: "When to Hire a Contractor vs. an Agency vs. a Full-Time Engineer",
    slug: "contractor-vs-agency-vs-full-time-engineer",
    excerpt:
      "Each path solves a different problem. Picking the wrong one for your stage is one of the most expensive mistakes founders make.",
    category: "Business",
    tags: ["Hiring", "Startups", "Engineering Leadership"],
    contentHtml: `<h2>Contractor</h2><p>Best for a scoped, well-defined build with a clear end state. You're buying execution, not ongoing judgment.</p><h2>Agency</h2><p>Best when you need a full team fast and don't have technical leadership in-house to direct one.</p><h2>Full-Time Engineer</h2><p>Best once the product direction is stable enough that institutional knowledge compounds in value.</p><p>Most early-stage founders default to "full-time hire" when what they actually need is a contractor for 8 weeks.</p>`,
    readTimeMinutes: 6,
    status: "published" as const,
    publishedAt: new Date("2024-07-09"),
    authorName: "Nafiz Anam",
    seoTitle: "Contractor vs. Agency vs. Full-Time Engineer — Nafiz Anam",
    seoDescription:
      "A practical guide to choosing between a contractor, an agency, and a full-time engineering hire based on your company's stage.",
  },
  {
    title: "What Seven Years of Production Incidents Taught Me",
    slug: "what-seven-years-of-production-incidents-taught-me",
    excerpt:
      "Every outage teaches the same handful of lessons in a different costume. Here are the ones that actually changed how I build.",
    category: "Engineering",
    tags: ["Reliability", "DevOps", "Lessons Learned"],
    contentHtml: `<h2>1. Alerts Without Owners Are Noise</h2><p>If a page doesn't have a named human responsible for acting on it, it will be ignored within a month.</p><h2>2. Rollback Speed Matters More Than Deploy Speed</h2><p>Optimize for how fast you can undo a bad change, not just how fast you can ship a good one.</p><h2>3. Most "Database Issues" Are Actually Query Issues</h2><p>Before scaling infrastructure, profile the slow query. It's cheaper and it's usually the real fix.</p>`,
    readTimeMinutes: 9,
    status: "published" as const,
    publishedAt: new Date("2024-09-14"),
    authorName: "Nafiz Anam",
    seoTitle: "Lessons From Seven Years of Production Incidents — Nafiz Anam",
    seoDescription:
      "Hard-won lessons from seven years of on-call production incidents, and how they changed the way I architect systems.",
  },
];

async function main() {
  console.log("Seeding blog posts…");

  for (const post of POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  ✓ ${post.title}`);
  }

  console.log(`Done. ${POSTS.length} blog posts seeded.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
