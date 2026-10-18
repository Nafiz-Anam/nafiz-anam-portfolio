// One-off backfill: re-encodes every existing Media row in place through the
// same pipeline uploads.ts now applies automatically to new uploads (resize to
// MAX_IMAGE_WIDTH, re-encode to WebP quality 90). Safe to re-run — anything
// already WebP or an animated GIF is skipped.
//
// Run on the machine/container that has UPLOAD_DIR and DATABASE_URL pointed at
// production, from apps/api:
//   pnpm exec tsx scripts/backfill-optimize-media.ts          # dry run (default)
//   pnpm exec tsx scripts/backfill-optimize-media.ts --write  # actually rewrite files + DB
//
// Dry run prints what it would do and the total bytes it would save, without
// touching disk or the database. Review that output before passing --write.

import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import sharp from "sharp";
import { prisma } from "@portfolio/db";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
const MAX_IMAGE_WIDTH = 2000;
const WEBP_QUALITY = 90;
const WRITE = process.argv.includes("--write");

async function main() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "asc" } });
  console.log(`Found ${media.length} media rows. Mode: ${WRITE ? "WRITE" : "DRY RUN"}`);

  let processed = 0;
  let skipped = 0;
  let failed = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const item of media) {
    if (item.mimeType === "image/webp" || item.mimeType === "image/gif") {
      skipped++;
      continue;
    }

    const oldPath = path.join(UPLOAD_DIR, item.filename);
    let original: Buffer;
    try {
      original = await fs.readFile(oldPath);
    } catch {
      console.warn(`[missing] ${item.filename} (media id ${item.id}) — skipping`);
      failed++;
      continue;
    }

    try {
      const optimized = await sharp(original)
        .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();

      bytesBefore += original.byteLength;
      bytesAfter += optimized.byteLength;

      const newFilename = `${crypto.randomUUID()}.webp`;
      const newPath = path.join(UPLOAD_DIR, newFilename);
      const newUrl = item.url.replace(item.filename, newFilename);

      console.log(
        `[${WRITE ? "rewriting" : "would rewrite"}] ${item.filename} ` +
          `(${original.byteLength}b -> ${optimized.byteLength}b)`
      );

      if (WRITE) {
        await fs.writeFile(newPath, optimized);
        await prisma.media.update({
          where: { id: item.id },
          data: { filename: newFilename, url: newUrl, mimeType: "image/webp", size: optimized.byteLength },
        });
        await fs.unlink(oldPath).catch(() => {
          // old file already gone — not fatal
        });
      }

      processed++;
    } catch (err) {
      console.error(`[error] ${item.filename} (media id ${item.id}):`, err);
      failed++;
    }
  }

  const savedMb = ((bytesBefore - bytesAfter) / 1024 / 1024).toFixed(2);
  console.log(
    `\nDone. processed=${processed} skipped=${skipped} failed=${failed} ` +
      `bytes_before=${bytesBefore} bytes_after=${bytesAfter} saved=${savedMb}MB`
  );
  if (!WRITE) console.log("Dry run only — nothing was written. Re-run with --write to apply.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
