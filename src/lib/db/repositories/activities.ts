import { nanoid } from "nanoid";
import { db } from "..";
import { noteActivities } from "../schemas/note-activities";
import { ActivitiesRepository } from "./interfaces/activities";
import { desc, eq } from "drizzle-orm";

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
    const activities = await db.query.noteActivities.findMany({
      where: (n) => eq(n.userId, userId),
      with: {
        note: true,
      },
      orderBy: (n) => desc(n.createdAt),
      limit: 10,
    });
    return activities;
  },
};
