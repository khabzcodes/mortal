import { contributors } from "@/lib/db/schemas/contributors";
import { UserSelect } from "./members";

export type InsertContributor = typeof contributors.$inferInsert;
export type ContributorWithUser = InsertContributor & {
  user: UserSelect;
};
