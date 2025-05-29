import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization, user } from "./auth-schema";

export const projects = pgTable("projects", {
  id: text("id").notNull().primaryKey(),
  organizationId: text("organization_id")
    .notNull()
    .notNull()
    .references(() => organization.id),
  name: text("name").notNull(),
  overview: text("overview"),
  createdById: text("created_by_id")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
