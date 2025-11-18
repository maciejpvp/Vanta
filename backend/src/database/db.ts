import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "app.sqlite");

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

export const db = new Database(dbPath);

export function initDB() {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `,
  ).run();

  console.log("Database initialized.");
}
