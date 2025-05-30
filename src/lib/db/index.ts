import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as authSchema from "./schemas/auth-schema";
import { user } from "./schemas/auth-schema";
import { contributors, contributorsRelations } from "./schemas/contributors";
import { noteActivities, noteActivitiesRelations } from "./schemas/note-activities";
import { notes, notesRelations } from "./schemas/notes";

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
