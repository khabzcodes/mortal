import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/auth-schema";
import { env } from "@/env";

const sql = postgres(env.DATABASE_URL, {
  max: 10, // Connection pool size
  idle_timeout: 20, // Idle connection timeout in seconds
  connect_timeout: 10, // Connection timeout in seconds
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});
export const db = drizzle(sql, { schema });
