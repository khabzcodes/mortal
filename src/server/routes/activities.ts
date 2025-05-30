import { Hono } from "hono";

import { getSession } from "@/lib/auth-utils";
import { activitiesRepository } from "@/lib/db/repositories/activities";
import { createLogger } from "@/lib/logger";

const logger = createLogger("ActivitiesRoute");

export const activities = new Hono().get("/summary", async (c) => {
  try {
    const session = await getSession();
    if (!session) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const activities = await activitiesRepository.selectActivitySummaryByUserId(session.user.id);

    if (!activities) {
      return c.json({ message: "No activities found" }, 404);
    }

    return c.json({ data: activities }, 200);
  } catch (error) {
    logger.error("Error fetching activity summary", error);
    return c.json({ message: "Failed to fetch activity summary" }, 500);
  }
});
