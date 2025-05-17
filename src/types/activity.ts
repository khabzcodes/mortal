import { noteActivities } from "@/lib/db/schemas/note-activities";

export type NoteActivity = typeof noteActivities.$inferSelect;
