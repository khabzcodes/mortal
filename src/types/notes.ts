import { notes } from "@/lib/db/schemas/notes";

export type Note = typeof notes.$inferSelect;
