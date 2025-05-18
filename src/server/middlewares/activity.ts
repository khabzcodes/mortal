import { activitiesRepository } from "@/lib/db/repositories/activities";
import { actions } from "@/lib/db/schemas/note-activities";
import { createLogger } from "@/lib/logger";
import { NoteActivity } from "@/types/activity";
import { Hono } from "hono";
import { nanoid } from "nanoid";

const logger = createLogger("ActivityMiddleware");

type ActivityAction = (typeof actions.enumValues)[number];

interface ActivityOptions {
  await?: boolean;
  metadata?: Record<string, any>;
}

export const noteActivityMiddleware = () => {
  return async <T extends Hono>(app: T) => {
    app.use("*", async (c, next) => {
      c.trackActivity = async (
        nodeId: string,
        userId: string,
        action: ActivityAction
      ) => {
        const activityData: NoteActivity = {
          id: nanoid(12),
          noteId: nodeId,
          userId,
          action,
          createdAt: new Date(),
        };

        const saveActivity = async () => {
          try {
            const response = await activitiesRepository.insertActivity(
              activityData
            );
            logger.info("Activity saved", { response });
          } catch (error) {
            logger.error("Error saving activity", { error });
          }
        };

        await saveActivity();
      };

      await next();
    });

    return app;
  };
};

declare module "hono" {
  interface Context {
    trackActivity: (
      noteId: string,
      userId: string,
      action: (typeof actions.enumValues)[number],
      options?: ActivityOptions
    ) => Promise<void>;
  }
}
