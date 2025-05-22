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
import { auth } from "@/lib/auth";
import { contributorsRepository } from "@/lib/db/repositories/contributors";
import { nanoid } from "nanoid";

const logger = createLogger("NotesRoute");

export const notes = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session | null;
    member: typeof auth.$Infer.Member | null;
  };
}>()
  .get("/", async (c) => {
    try {
      const session = c.get("session");
      const organizationId = session?.session?.activeOrganizationId;
      if (!session || !organizationId) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const notes = await notesRepository.selectNotesByOrganizationId(
        organizationId
      );

      return c.json({ data: notes }, 200);
    } catch (error) {
      logger.error("Error fetching notes", error);
      return c.json({ message: "Failed to fetch notes" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const session = c.get("session");
      if (!session) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const noteId = c.req.param("id");
      const note = await notesRepository.selectNoteById(noteId);

      if (!note) {
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
      const session = c.get("session");
      const member = c.get("member");
      if (!session || !session.session.activeOrganizationId || !member) {
        return c.json({ message: "Unauthorized" }, 401);
      }

      const { title, description, tags } = c.req.valid("json");

      const note = await notesRepository.insertNote({
        title,
        description,
        tags: tags || [],
        organizationId: session.session.activeOrganizationId,
        createdById: member.id,
        lastUpdatedById: null,
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
  })
  .put(
    "/:id/content",
    zValidator("json", updateContentValidation),
    async (c) => {
      try {
        const session = c.get("session");
        const member = c.get("member");
        if (!session || !session.session.activeOrganizationId || !member) {
          return c.json({ message: "Unauthorized" }, 401);
        }

        const noteId = c.req.param("id");
        const { content } = c.req.valid("json");

        const noteExists = await notesRepository.selectNoteById(noteId);
        if (!noteExists) {
          return c.json({ message: "Note not found" }, 404);
        }

        const note = await notesRepository.updateNoteContent(
          noteId,
          content,
          member.id
        );

        if (!note) {
          return c.json({ message: "Note not found" }, 404);
        }

        const isContributor = noteExists.contributors.some(
          (contributor) => contributor.user.id === session.user.id
        );

        if (!isContributor) {
          await contributorsRepository.insertContributor({
            id: nanoid(12),
            noteId: note.id,
            userId: session.user.id,
          });
        }

        return c.json({ data: note }, 200);
      } catch (error) {
        logger.error("Error updating note content", error);
        if (error instanceof ZodError) {
          return c.json({ message: error.errors[0].message }, 400);
        }
        return c.json({ message: "Failed to update note content" }, 500);
      }
    }
  );
