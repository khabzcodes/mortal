import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth-schema";
import { notes } from "./notes";

export const actions = pgEnum("actions", [
  "CREATE",
  "UPDATE",
  "DELETE",
  "PINNED",
  "UNPINNED",
  "ADD_TO_FAVORITES",
  "REMOVE_FROM_FAVORITES",
]);

export const noteActivities = pgTable("note_activities", {
  id: text("id").notNull().primaryKey(),
  noteId: text("note_id")
    .notNull()
    .references(() => notes.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  action: actions("action").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const noteActivitiesRelations = relations(noteActivities, ({ one }) => ({
  note: one(notes, {
    fields: [noteActivities.noteId],
    references: [notes.id],
  }),
  user: one(user, {
    fields: [noteActivities.userId],
    references: [user.id],
  }),
}));
