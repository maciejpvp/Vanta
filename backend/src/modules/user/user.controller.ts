import { Request, Response } from "express";
import { loginUser, registerUser } from "./user.service";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await registerUser({ username, password });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const data = await loginUser({ username, password });
    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
