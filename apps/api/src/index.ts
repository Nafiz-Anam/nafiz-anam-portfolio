import { config } from "dotenv";
import path from "node:path";
config({ path: path.resolve(process.cwd(), "../../.env") });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import { apiRouter } from "./routes";

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN_WEB, process.env.CORS_ORIGIN_CMS].filter(
  (origin): origin is string => Boolean(origin)
);

const uploadDir = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadDir));

app.use(apiRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: { message: "internal server error" } });
});

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

app.listen(port, () => {
  console.log(`api listening on :${port}`);
});
