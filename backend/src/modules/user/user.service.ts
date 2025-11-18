import bcrypt from "bcrypt";
import { db } from "../../database/db";
import jwt from "jsonwebtoken";
import { UserType } from "../../types";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

interface RegisterUserInput {
  username: string;
  password: string;
}

interface RegisterUserOutput {
  id: number;
  username: string;
}

export const registerUser = async ({
  username,
  password,
}: RegisterUserInput): Promise<RegisterUserOutput> => {
  if (!username || !password)
    throw new Error("Username and password are required");

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, password) VALUES (?, ?)",
    );
    const info = stmt.run(username, hashedPassword);

    return {
      id: info.lastInsertRowid as number,
      username,
    };
  } catch (err: any) {
    if (err.message.includes("UNIQUE"))
      throw new Error("Username already exists");
    throw err;
  }
};

interface LoginUserInput {
  username: string;
  password: string;
}

interface LoginUserOutput {
  token: string;
  username: string;
}

export const loginUser = async ({
  username,
  password,
}: LoginUserInput): Promise<LoginUserOutput> => {
  if (!username || !password)
    throw new Error("Username and password are required");

  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const user = stmt.get(username) as UserType | undefined;

  if (!user) throw new Error("Invalid username or password");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid username or password");

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, username: user.username };
};
