import { Note } from "@/types/notes";

export type NotesRepository = {
  selectNotesByUserId(userId: string): Promise<Note[]>;
  selectNoteById(id: string): Promise<Note | null>;
  insertNote(
    note: Omit<
      Note,
      "id" | "content" | "isFavorite" | "createdAt" | "updatedAt"
    >
  ): Promise<Note>;
};
