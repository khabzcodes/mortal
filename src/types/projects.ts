import { projects } from "@/lib/db/schemas/projects";

export type Project = typeof projects.$inferInsert;
