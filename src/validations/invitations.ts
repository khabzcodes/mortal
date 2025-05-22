import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z
    .string({ message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  role: z.string({
    message: "Role is required",
  }),
});

export type CreateInvitationInputValidation = z.infer<
  typeof createInvitationSchema
>;
