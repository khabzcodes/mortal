import { NotesRepository } from "@/lib/db/repositories/interfaces/notes";
import { db } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { notes } from "../schemas/notes";
import { nanoid } from "nanoid";

export const notesRepository: NotesRepository = {
  selectNotesByUserId: async (userId) => {
    return await db.query.notes.findMany({
      where: (n) => eq(n.userId, userId),
      orderBy: (n) => [desc(n.createdAt)],
    });
  },
  selectFavoriteNotesByUserId: async (userId) => {
    return await db.query.notes.findMany({
      where: (n) => eq(n.userId, userId) && eq(n.isFavorite, true),
      limit: 6,
      orderBy: (n) => [desc(n.createdAt)],
    });
  },
  selectNoteById: async (id) => {
    const [note] = await db.select().from(notes).where(eq(notes.id, id));
    return note;
  },
  insertNote: async (note) => {
    const [newNote] = await db
      .insert(notes)
      .values({
        id: nanoid(12),
        ...note,
      })
      .returning();
    return newNote;
  },
  updateNoteContent: async (id, content) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        content,
      })
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  },
  toggleNoteFavorite: async (id, isFavorite) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        isFavorite,
      })
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  },
};
