import { NotesRepository } from "@/lib/db/repositories/interfaces/notes";
import { db } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { notes } from "../schemas/notes";

export const notesRepository: NotesRepository = {
  selectNotesByUserId: async (userId) => {
    return await db.query.notes.findMany({
      where: (n) => eq(n.userId, userId),
      orderBy: (n) => [desc(n.createdAt)],
    });
  },
  insertNote: async (note) => {
    const [newNote] = await db.insert(notes).values(note).returning();
    return newNote;
  },
};
