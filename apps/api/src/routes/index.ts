import { Router } from "express";
import { healthRouter } from "./health";
import { projectsRouter } from "./projects";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/projects", projectsRouter);
