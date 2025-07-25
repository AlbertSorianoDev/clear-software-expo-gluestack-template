import { z } from "zod";

export const CreatePasswordBaseSchema = z.object({
  password: z
    .string()
    .min(8, "Must be at least 8 characters in length")
    .regex(/.*[A-Z].*/, "One uppercase character")
    .regex(/.*[a-z].*/, "One lowercase character")
    .regex(/.*\d.*/, "One number")
    .regex(new RegExp(".*[~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const CreatePasswordSchema = CreatePasswordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  },
);
