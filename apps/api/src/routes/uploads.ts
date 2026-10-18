import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";

export const uploadsRouter = Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
const MAX_UPLOAD_MB = process.env.MAX_UPLOAD_MB ? Number(process.env.MAX_UPLOAD_MB) : 5;
// apps/web and apps/cms are on different origins from apps/api — a relative
// "/uploads/x.jpg" URL resolves against whichever app renders it, not the API
// that actually serves the file. Must be absolute.
const PUBLIC_API_URL = process.env.PUBLIC_API_URL ?? "http://localhost:4000";

const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

// Max width images are ever rendered at on web/cms, x2 for retina — resizing to
// this is lossless in practice since nothing displays the extra pixels anyway.
const MAX_IMAGE_WIDTH = 2000;
const WEBP_QUALITY = 90;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

// Animated GIFs pass through untouched — a single-frame re-encode would kill the
// animation. Everything else is resized and re-encoded to WebP on the way in, so
// every upload (no matter what the CMS user drops in) is optimized automatically.
async function optimizeImage(file: Express.Multer.File) {
  if (file.mimetype === "image/gif") {
    return { buffer: file.buffer, ext: ".gif", mimeType: "image/gif" };
  }

  const buffer = await sharp(file.buffer)
    .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  return { buffer, ext: ".webp", mimeType: "image/webp" };
}

// Admin: list all media
uploadsRouter.get("/", requireAuth, async (_req, res) => {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ media });
});

uploadsRouter.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: { message: "no file uploaded" } });

  const { buffer, ext, mimeType } = await optimizeImage(req.file);
  const filename = `${crypto.randomUUID()}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const media = await prisma.media.create({
    data: {
      filename,
      url: `${PUBLIC_API_URL}/uploads/${filename}`,
      mimeType,
      size: buffer.byteLength,
    },
  });

  res.status(201).json(media);
});

// Admin: delete media + unlink file from disk
uploadsRouter.delete("/:id", requireAuth, async (req, res) => {
  const media = await prisma.media.findUnique({ where: { id: req.params.id } });
  if (!media) return res.status(404).json({ error: { message: "not found" } });

  await prisma.media.delete({ where: { id: req.params.id } });

  const filePath = path.join(UPLOAD_DIR, media.filename);
  await fs.unlink(filePath).catch(() => {
    // File may already be gone — not a hard error
  });

  res.status(204).send();
});

uploadsRouter.use((err: Error, _req: any, res: any, _next: any) => {
  res.status(400).json({ error: { message: err.message } });
});
