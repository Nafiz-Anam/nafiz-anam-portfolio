import { prisma } from "../src/index";

const TESTIMONIALS = [
  {
    id: "testimonial-seed-1",
    quote:
      "Nafiz took a vague product idea and turned it into a working, scalable platform in under three months. He communicates clearly, flags risks early, and never disappears mid-sprint.",
    name: "Sarah Whitfield",
    role: "Founder & CEO",
    company: "Clinicly Health",
    rating: 5,
    featured: true,
    sortOrder: 0,
    published: true,
  },
  {
    id: "testimonial-seed-2",
    quote:
      "We brought Nafiz in to untangle a legacy system nobody wanted to touch. He mapped the whole thing, migrated us piece by piece with zero downtime, and left documentation the rest of the team could actually use.",
    name: "Marcus Chen",
    role: "VP of Engineering",
    company: "Freightline Logistics",
    rating: 5,
    featured: true,
    sortOrder: 1,
    published: true,
  },
  {
    id: "testimonial-seed-3",
    quote:
      "Senior-level judgment without senior-level ego. He pushed back on scope when it mattered and shipped when it mattered more.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Ledgerly",
    rating: 5,
    featured: true,
    sortOrder: 2,
    published: true,
  },
  {
    id: "testimonial-seed-4",
    quote:
      "Nafiz slotted into our existing team like he'd been there for years. Code reviews got sharper, deploys got calmer, and our roadmap actually started moving again.",
    name: "Tom Reilly",
    role: "CTO",
    company: "Northbridge Retail",
    rating: 5,
    featured: false,
    sortOrder: 3,
    published: true,
  },
  {
    id: "testimonial-seed-5",
    quote:
      "What stood out wasn't just the engineering — it was how honest he was about tradeoffs. He talked us out of over-engineering our MVP and it saved us months.",
    name: "Elena Vasquez",
    role: "Co-Founder",
    company: "Fieldwork Analytics",
    rating: 5,
    featured: false,
    sortOrder: 4,
    published: true,
  },
  {
    id: "testimonial-seed-6",
    quote:
      "Rare combination — moves fast without cutting corners. Our audit trail, test coverage, and deploy pipeline are all in better shape than before he joined.",
    name: "David Okafor",
    role: "Engineering Manager",
    company: "Solvent Insurance",
    rating: 5,
    featured: false,
    sortOrder: 5,
    published: true,
  },
];

async function main() {
  console.log("Seeding testimonials…");

  for (const testimonial of TESTIMONIALS) {
    await prisma.testimonial.upsert({
      where: { id: testimonial.id },
      update: testimonial,
      create: testimonial,
    });
    console.log(`  ✓ ${testimonial.name} (${testimonial.company})`);
  }

  console.log(`Done. ${TESTIMONIALS.length} testimonials seeded.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
