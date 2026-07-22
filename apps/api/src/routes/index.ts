import { Router } from "express";
import { healthRouter } from "./health";
import { projectsRouter } from "./projects";
import { authRouter } from "./auth";
import { uploadsRouter } from "./uploads";
import { blogRouter } from "./blog";
import { blogCategoriesRouter } from "./blog-categories";
import { testimonialsRouter } from "./testimonials";
import { siteConfigRouter } from "./site-config";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/uploads", uploadsRouter);
apiRouter.use("/blog", blogRouter);
apiRouter.use("/blog-categories", blogCategoriesRouter);
apiRouter.use("/testimonials", testimonialsRouter);
apiRouter.use("/site-config", siteConfigRouter);
