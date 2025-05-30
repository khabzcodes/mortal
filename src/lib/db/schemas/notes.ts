import { relations } from "drizzle-orm";
import { boolean, json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

import { member, organization } from "./auth-schema";
import { contributors } from "./contributors";

export const notes = pgTable("notes", {
  id: text("id").notNull().primaryKey().default(nanoid(12)),
  title: text("name").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  tags: json("tags").$type<string[]>(),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id),
  createdById: text("created_by_id")
    .notNull()
    .references(() => member.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  lastUpdatedById: text("last_updated_by_id").references(() => member.id),
});

export const notesRelations = relations(notes, ({ one, many }) => ({
  createdBy: one(member, {
    fields: [notes.createdById],
    references: [member.id],
  }),
  lastUpdatedBy: one(member, {
    fields: [notes.lastUpdatedById],
    references: [member.id],
  }),
  organization: one(organization, {
    fields: [notes.organizationId],
    references: [organization.id],
  }),
  contributors: many(contributors),
}));
