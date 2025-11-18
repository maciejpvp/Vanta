import express from "express";
import { healthRouter } from "./modules/health/health.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/health", healthRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export { app };
