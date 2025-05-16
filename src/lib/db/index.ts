import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/auth-schema";
import { env } from "@/env";

const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, { schema });
