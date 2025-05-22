import { pgEnum, pgTable, text, time, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { notes } from "./notes";
import { relations } from "drizzle-orm";

export const contributors = pgTable("contributors", {
  id: text("id").notNull().primaryKey(),
  noteId: text("note_id")
    .notNull()
    .references(() => notes.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contributorsRelations = relations(contributors, ({ one }) => ({
  note: one(notes, {
    fields: [contributors.noteId],
    references: [notes.id],
  }),
  user: one(user, {
    fields: [contributors.userId],
    references: [user.id],
  }),
}));
