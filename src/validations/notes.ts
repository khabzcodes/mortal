import { z } from "zod";

export const tagSchema = z.string().min(1).max(20).trim();

export const createNoteValidation = z.object({
  title: z
    .string({
      message: "Title is required",
    })
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must be less than 50 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, { message: "Description must be less than 200 characters" }),
  tags: z.array(tagSchema).default([]).optional(),
});

export const updateContentValidation = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

export type CreateNoteInputValidation = z.infer<typeof createNoteValidation>;
