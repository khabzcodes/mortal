import { Note } from "@/types/notes";

export type NotesRepository = {
  selectNotesByUserId(userId: string): Promise<Note[]>;
  insertNote(note: Exclude<Note, "id" | "createdAt">): Promise<Note>;
};
