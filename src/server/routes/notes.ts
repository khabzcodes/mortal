import { Hono } from "hono";
import { notesRepository } from "@/lib/db/repositories/notes";
import { createLogger } from "@/lib/logger";
import { getSession } from "@/lib/auth-utils";
import { zValidator } from "@hono/zod-validator";
import { createNoteValidation } from "@/validations/notes";
import { ZodError } from "zod";

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

      return c.json({ data: note }, 201);
    } catch (error) {
      logger.error("Error creating note", error);
      if (error instanceof ZodError) {
        return c.json({ message: error.errors[0].message }, 400);
      }
      return c.json({ message: "Failed to create note" }, 500);
    }
  });
