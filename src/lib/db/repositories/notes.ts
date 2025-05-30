import { desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "@/lib/db";
import { NotesRepository } from "@/lib/db/repositories/interfaces/notes";
import { notes } from "../schemas/notes";

export const notesRepository: NotesRepository = {
  selectNotesByOrganizationId: async (organizationId) => {
    return await db.query.notes.findMany({
      where: eq(notes.organizationId, organizationId),
      with: {
        contributors: {
          with: {
            user: true,
          },
        },
      },
      orderBy: [desc(notes.createdAt)],
    });
  },
  selectNoteById: async (id) => {
    const note = await db.query.notes.findFirst({
      where: (n) => eq(n.id, id),
      with: {
        contributors: {
          with: {
            user: true,
          },
        },
      },
    });
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
  updateNoteContent: async (id, content, lastUpdatedById) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        content,
        lastUpdatedById,
      })
      .where(eq(notes.id, id))
      .returning();
    return updatedNote;
  },
};
