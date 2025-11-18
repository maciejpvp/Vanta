import { Request, Response } from "express";
import { checkServerStatus } from "./health.service";

export const getHealth = (req: Request, res: Response): void => {
  const status = checkServerStatus();
  res.status(200).json(status);
};
