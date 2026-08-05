import { prisma } from "../src/index";

// One-off seed matching the reference layout (checklist-style challenge/solution/results
// sections) so the case-study detail page design can be validated against real content.
const PROJECT = {
  title: "Digital Transformation for Digital Native: Boosting Online Presence and Workflow Efficiency",
  slug: "digital-transformation-digital-native",
  excerpt:
    "Ready to take your business to the next level? Discover how a digital transformation elevated Digital Native's online presence and streamlined workflow for enhanced efficiency and growth.",
  industry: "Media & Marketing",
  tags: ["CMS Platform Development", "Custom Software Solutions", "Digital Marketing Solutions"],
  client: "Digital Native",
  role: "Full-Stack Lead · Product Strategy · Dashboard Engineering",
  outcome: "30% increase in visitor engagement. 25%+ reduction in project management time.",
  year: "2024",
  contentHtml: `
<h2>About Digital Native</h2>
<p>Digital Native is a New York-based media and marketing agency specializing in innovative strategies for brands across various industries. With a strong reputation for creativity, Digital Native needed a robust digital platform to support its expanding client base and diverse service offerings.</p>

<h2>The Challenge</h2>
<p>Digital Native faced several key challenges that limited their operational efficiency and the effectiveness of their online presence:</p>
<ul>
<li>Outdated Website Design: Their website lacked a modern, user-friendly interface, impacting their ability to showcase their creative portfolio to prospective clients.</li>
<li>Workflow Inefficiencies: Managing client campaigns and projects was cumbersome, with a lack of centralized tools to streamline internal processes.</li>
<li>Limited Analytics Capabilities: Digital Native required better insights into site performance, client engagement, and project outcomes to make data-driven decisions.</li>
<li>Scalability Issues: As the agency continued to grow, their digital infrastructure needed to scale smoothly without disrupting operations.</li>
</ul>

<h2>The Solution</h2>
<p>We developed a comprehensive solution to address these challenges, including both a website overhaul and a custom-built management dashboard:</p>
<ul>
<li>Modern Website Redesign:
  <ul>
    <li>Delivered a clean, responsive website with intuitive navigation to highlight their portfolio and service offerings.</li>
    <li>Implemented SEO best practices to enhance visibility in search results, attracting new leads organically.</li>
    <li>Integrated a blog and resources section to position Digital Native as an industry thought leader, improving client trust and engagement.</li>
  </ul>
</li>
<li>Custom Management Dashboard:
  <ul>
    <li>Built a centralized dashboard to streamline client project management, tracking campaign progress, and organizing tasks efficiently.</li>
    <li>Integrated analytics tools within the dashboard, allowing team members to monitor performance and client engagement in real-time.</li>
    <li>Added secure client access features, so clients could review project updates, submit feedback, and access their campaign reports conveniently.</li>
  </ul>
</li>
<li>Scalability and Growth-Ready Infrastructure:
  <ul>
    <li>Structured the website and dashboard to scale with Digital Native's expanding clientele, ensuring performance and responsiveness under higher loads.</li>
    <li>Deployed cloud-based hosting solutions with optimized resources, enabling the platform to handle growth seamlessly.</li>
  </ul>
</li>
</ul>

<h2>Results</h2>
<p>The transformation resulted in immediate and measurable improvements for Digital Native:</p>
<ul>
<li>Increased Client Engagement: The refreshed website led to a 30% increase in visitor engagement and inquiries within the first quarter.</li>
<li>Enhanced Operational Efficiency: The centralized dashboard reduced project management time by over 25%, allowing the team to focus on strategy and creative work.</li>
<li>Data-Driven Decisions: With real-time analytics and reporting, Digital Native gained better insights into client needs and site performance, improving their ability to make informed business decisions.</li>
<li>Scalable Growth: The new infrastructure provided a robust foundation for Digital Native to continue growing without system slowdowns, positioning them for sustained success.</li>
</ul>

<h2>Final Thoughts</h2>
<p>Partnering on this project meant more than delivering a technical solution — it was about redefining what's possible for the business. Aligning engineering with Digital Native's unique goals meant crafting digital solutions that resolved immediate challenges while paving the way for future growth.</p>
<p>Whether it's building a responsive website, designing an efficient dashboard, or developing a scalable system, the goal stays the same: support the client at every stage of their digital journey.</p>
`.trim(),
  status: "published" as const,
  publishedAt: new Date("2024-09-01"),
  seoTitle: "Digital Transformation Case Study — Nafiz Anam",
  seoDescription:
    "How a website redesign and custom management dashboard boosted Digital Native's online presence and workflow efficiency.",
};

async function main() {
  console.log("Seeding demo case study…");
  await prisma.project.upsert({
    where: { slug: PROJECT.slug },
    update: PROJECT,
    create: PROJECT,
  });
  console.log(`  ✓ ${PROJECT.title}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
