import { Hono } from "hono";
import { notesRepository } from "@/lib/db/repositories/notes";
import { createLogger } from "@/lib/logger";
import { getSession } from "@/lib/auth-utils";

const logger = createLogger("NotesRoute");

export const notes = new Hono().get("/", async (c) => {
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
});
