import { Router } from "express";
import { loginUserController, registerUserController } from "./user.controller";

const router = Router();

// POST /users/register
router.post("/register", registerUserController);

// POST /users/login
router.post("/login", loginUserController);

export default router;
