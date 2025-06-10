import { z } from "zod";

import { CreatePasswordBaseSchema } from "@/schemas/auth/create-password-schema";

const EmailTermsSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export const SignUpSchema = EmailTermsSchema.merge(CreatePasswordBaseSchema).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  },
);
