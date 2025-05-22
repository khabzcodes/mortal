import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string({
      message: "Please enter your name",
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string({
      message: "Please enter a valid email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z
    .string({
      message: "Please enter your password",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
    ),
});

export const signInSchema = z.object({
  email: z
    .string({
      message: "Please enter a valid email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z.string({
    message: "Please enter your password",
  }),
});

export type SignUpInputValidation = z.infer<typeof signUpSchema>;
export type SignInInputValidation = z.infer<typeof signInSchema>;
