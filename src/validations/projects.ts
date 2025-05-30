import { z } from "zod";

export const getProjectsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
});

export const updateProjectSchema = z.object({
  name: z
    .string({
      message: "Project name is required",
    })
    .min(1, {
      message: "Project name must be at least 1 character long",
    })
    .max(50, {
      message: "Project name must be at most 50 characters long",
    }),
});

export const updateProjectOverviewSchema = z.object({
  overview: z.string().optional().nullable(),
});

export type UpdateProjectInputValidation = z.infer<typeof updateProjectSchema>;
export type UpdateProjectOverviewInputValidation = z.infer<typeof updateProjectOverviewSchema>;
