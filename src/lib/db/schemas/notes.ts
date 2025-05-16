import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { user } from "./auth-schema";

export const notes = pgTable("notes", {
  id: text("id").notNull().primaryKey().default(nanoid(12)),
  name: text("name").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});
