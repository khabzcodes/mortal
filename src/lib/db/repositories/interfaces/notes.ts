import { Note } from "@/types/notes";

export type NotesRepository = {
  selectNotesByOrganizationId(organizationId: string): Promise<Note[]>;
  selectNoteById(id: string): Promise<Note | null>;
  insertNote(
    note: Omit<Note, "id" | "content" | "createdAt" | "updatedAt">
  ): Promise<Note>;
  updateNoteContent(id: string, content: string): Promise<Note | null>;
};
