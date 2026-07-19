import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes";

const app = express();

const allowedOrigins = [process.env.CORS_ORIGIN_WEB, process.env.CORS_ORIGIN_CMS].filter(
  (origin): origin is string => Boolean(origin)
);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

app.listen(port, () => {
  console.log(`api listening on :${port}`);
});
