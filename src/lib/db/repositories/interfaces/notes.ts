import { Note, NoteWithContributors } from "@/types/notes";

export type NotesRepository = {
  selectNotesByOrganizationId(organizationId: string): Promise<NoteWithContributors[]>;
  selectNoteById(id: string): Promise<NoteWithContributors | undefined>;
  insertNote(note: Omit<Note, "id" | "content" | "createdAt" | "updatedAt">): Promise<Note>;
  updateNoteContent(id: string, content: string, lastUpdatedById: string): Promise<Note | null>;
};
