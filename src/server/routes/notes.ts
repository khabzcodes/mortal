import { Hono } from "hono";
import { notesRepository } from "@/lib/db/repositories/notes";
import { createLogger } from "@/lib/logger";
import { getSession } from "@/lib/auth-utils";
import { zValidator } from "@hono/zod-validator";
import {
  createNoteValidation,
  updateContentValidation,
} from "@/validations/notes";
import { z, ZodError } from "zod";
import { actions } from "@/lib/db/schemas/note-activities";

const logger = createLogger("NotesRoute");

export const notes = new Hono()
  .get("/", async (c) => {
    try {
      const session = await getSession();
      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const notes = await notesRepository.selectNotesByUserId(session.user.id);

      return c.json({ data: notes }, 200);
    } catch (error) {
      logger.error("Error fetching notes", error);
      return c.json({ message: "Failed to fetch notes" }, 500);
    }
  })
  .get("/favorites", async (c) => {
    try {
      const session = await getSession();
      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const notes = await notesRepository.selectFavoriteNotesByUserId(
        session.user.id
      );

      return c.json({ data: notes }, 200);
    } catch (error) {
      logger.error("Error fetching favorite notes", error);
      return c.json({ message: "Failed to fetch favorite notes" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const session = await getSession();
      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const noteId = c.req.param("id");
      const note = await notesRepository.selectNoteById(noteId);

      if (!note || note.userId !== session.user.id) {
        return c.json({ message: "Note not found" }, 404);
      }

      return c.json({ data: note }, 200);
    } catch (error) {
      logger.error("Error fetching note", error);
      return c.json({ message: "Failed to fetch note" }, 500);
    }
  })
  .post("/", zValidator("json", createNoteValidation), async (c) => {
    try {
      const session = await getSession();
      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const { title, description, tags } = c.req.valid("json");

      const note = await notesRepository.insertNote({
        title,
        description,
        tags: tags || [],
        userId: session.user.id,
      });

      if (!note) {
        return c.json({ message: "Failed to create note" }, 500);
      }

      await c.trackActivity(note.id, session.user.id, "CREATE");

      return c.json({ data: note }, 201);
    } catch (error) {
      logger.error("Error creating note", error);
      if (error instanceof ZodError) {
        return c.json({ message: error.errors[0].message }, 400);
      }
      return c.json({ message: "Failed to create note" }, 500);
    }
  })
  .put(
    "/:id/content",
    zValidator("json", updateContentValidation),
    async (c) => {
      try {
        const session = await getSession();
        if (!session) {
          return c.json({ message: "Unauthorized" }, 401);
        }

        const noteId = c.req.param("id");
        const { content } = c.req.valid("json");

        const note = await notesRepository.updateNoteContent(noteId, content);

        if (!note || note.userId !== session.user.id) {
          return c.json({ message: "Note not found" }, 404);
        }

        await c.trackActivity(note.id, session.user.id, "UPDATE");

        return c.json({ data: note }, 200);
      } catch (error) {
        logger.error("Error updating note content", error);
        if (error instanceof ZodError) {
          return c.json({ message: error.errors[0].message }, 400);
        }
        return c.json({ message: "Failed to update note content" }, 500);
      }
    }
  )
  .put(
    "/:id/favorite",
    zValidator("json", z.object({ isFavorite: z.boolean() })),
    async (c) => {
      try {
        const session = await getSession();
        if (!session) {
          return c.json({ message: "Unauthorized" }, 401);
        }

        const noteId = c.req.param("id");
        const { isFavorite } = c.req.valid("json");

        const note = await notesRepository.toggleNoteFavorite(
          noteId,
          isFavorite
        );

        if (!note || note.userId !== session.user.id) {
          return c.json({ message: "Note not found" }, 404);
        }

        await c.trackActivity(
          note.id,
          session.user.id,
          isFavorite ? "ADD_TO_FAVORITES" : "REMOVE_FROM_FAVORITES"
        );

        return c.json({ data: note }, 200);
      } catch (error) {
        logger.error("Error toggling note favorite", error);
        if (error instanceof ZodError) {
          return c.json({ message: error.errors[0].message }, 400);
        }
        return c.json({ message: "Failed to toggle note favorite" }, 500);
      }
    }
  );
