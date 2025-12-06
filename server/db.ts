import * as schema from "@shared/schema";
import fs from "fs";
import path from "path";

let db: any;

if (process.env.DATABASE_URL) {
  // PostgreSQL mode
  const { drizzle: drizzlePg } = await import("drizzle-orm/node-postgres");
  const pg = await import("pg");
  
  const pool = new pg.default.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  
  db = drizzlePg(pool, { schema });
} else {
  // SQLite mode (fallback for development without PostgreSQL)
  const { drizzle: drizzleSqlite } = await import("drizzle-orm/better-sqlite3");
  const Database = (await import("better-sqlite3")).default;

  // Use a file-backed SQLite database when SQLITE_DB_PATH is provided,
  // otherwise fall back to in-memory for ephemeral environments.
  const sqlitePath = process.env.SQLITE_DB_PATH || ":memory:";

  if (sqlitePath !== ":memory:") {
    const dir = path.dirname(sqlitePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const sqlite = new Database(sqlitePath);
  
  // Create tables manually for in-memory database
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS contact_messages (
      id VARCHAR PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);
  
  db = drizzleSqlite(sqlite, { schema });
}

export { db };
