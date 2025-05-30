import { NoteActivity, NoteActivityInsert } from "@/types/activity";

export type ActivitiesRepository = {
  insertActivity(activity: Omit<NoteActivity, "id" | "createdAt">): Promise<NoteActivity>;
  selectActivitySummaryByUserId(userId: string): Promise<NoteActivityInsert[]>;
};
