import { nanoid } from "nanoid";
import { db } from "..";
import { noteActivities } from "../schemas/note-activities";
import { ActivitiesRepository } from "./interfaces/activities";
import { eq } from "drizzle-orm";

export const activitiesRepository: ActivitiesRepository = {
  insertActivity: async (activity) => {
    const [newActivity] = await db
      .insert(noteActivities)
      .values({
        id: nanoid(12),
        ...activity,
      })
      .returning();
    return newActivity;
  },
  selectActivitySummaryByUserId: async (userId) => {
    const activities = await db
      .select()
      .from(noteActivities)
      .where((n) => eq(n.userId, userId));
    return activities;
  },
};
