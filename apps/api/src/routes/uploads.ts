import path from "node:path";
import crypto from "node:crypto";
import { Router } from "express";
import multer from "multer";
import { prisma } from "@portfolio/db";
import { requireAuth } from "../middleware/requireAuth";

export const uploadsRouter = Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
const MAX_UPLOAD_MB = process.env.MAX_UPLOAD_MB ? Number(process.env.MAX_UPLOAD_MB) : 5;

const ALLOWED_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

uploadsRouter.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: { message: "no file uploaded" } });

  const media = await prisma.media.create({
    data: {
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
    },
  });

  res.status(201).json(media);
});

uploadsRouter.use((err: Error, _req: any, res: any, _next: any) => {
  res.status(400).json({ error: { message: err.message } });
});
