import { noteActivities } from "@/lib/db/schemas/note-activities";
import { Note } from "@/types/notes";

export type NoteActivity = typeof noteActivities.$inferSelect;

export interface NoteActivityInsert extends NoteActivity {
  note: Note;
}
