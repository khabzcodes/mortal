import { z } from "zod";

export const getProjectsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
});
