import { notes } from "@/lib/db/schemas/notes";
import { ContributorWithUser } from "./contributors";

export type Note = typeof notes.$inferSelect;
export type NoteWithContributors = typeof notes.$inferSelect & {
  contributors: ContributorWithUser[];
};
