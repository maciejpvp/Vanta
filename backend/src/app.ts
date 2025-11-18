import express from "express";
import { healthRouter } from "./modules/health/health.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();

app.use(express.json());

const apiV1 = express.Router();

apiV1.use("/health", healthRouter);
apiV1.use("/users", userRoutes);

app.use("/api/v1", apiV1);

app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export { app };
