import { pgEnum, pgTable, text, time, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { notes } from "./notes";
import { relations } from "drizzle-orm";

export const privileges = pgEnum("privileges", ["READONLY", "ADMIN"]);

export const contributions = pgTable("contributions", {
  id: text("id").notNull().primaryKey(),
  noteId: text("note_id")
    .notNull()
    .references(() => notes.id),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  privilege: privileges("privilege")
    .notNull()
    .$default(() => "READONLY"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contributionsRelations = relations(contributions, ({ one }) => ({
  note: one(notes, {
    fields: [contributions.noteId],
    references: [notes.id],
  }),
  user: one(user, {
    fields: [contributions.userId],
    references: [user.id],
  }),
}));
