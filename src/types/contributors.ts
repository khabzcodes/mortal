import {
  contributionsRelations,
  contributions,
} from "@/lib/db/schemas/contributors";

export type SelectContributor =
  typeof contributionsRelations.table.$inferSelect;

export type InsertContributor = typeof contributions.$inferInsert;
