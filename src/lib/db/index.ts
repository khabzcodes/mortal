import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as authSchema from "./schemas/auth-schema";
import { user } from "./schemas/auth-schema";
import { env } from "@/env";
import { notes, notesRelations } from "./schemas/notes";
import {
  noteActivities,
  noteActivitiesRelations,
} from "./schemas/note-activities";
import { contributors, contributorsRelations } from "./schemas/contributors";

const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, {
  schema: {
    authSchema,
    notes,
    notesRelations,
    user,
    noteActivities,
    noteActivitiesRelations,
    contributors,
    contributorsRelations,
  },
});
