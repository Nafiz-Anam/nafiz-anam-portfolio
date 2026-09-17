import { prisma } from "../src/index";

const CATEGORIES = [
  { name: "e-Commerce", slug: "e-commerce", sortOrder: 0 },
  { name: "Engineering", slug: "engineering", sortOrder: 1 },
  { name: "Architecture", slug: "architecture", sortOrder: 2 },
  { name: "Process", slug: "process", sortOrder: 4 },
  { name: "Business", slug: "business", sortOrder: 5 },
];

async function main() {
  console.log("Seeding blog categories…");

  for (const category of CATEGORIES) {
    await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`  ✓ ${category.name}`);
  }

  console.log(`Done. ${CATEGORIES.length} blog categories seeded.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
