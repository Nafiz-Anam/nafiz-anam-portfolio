import { Router } from "express";
import { prisma } from "@portfolio/db";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  let dbStatus: "ok" | "error" = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = "error";
  }

  const status = dbStatus === "ok" ? "ok" : "degraded";
  res.status(status === "ok" ? 200 : 503).json({
    status,
    timestamp: new Date().toISOString(),
    services: { db: dbStatus },
  });
});
