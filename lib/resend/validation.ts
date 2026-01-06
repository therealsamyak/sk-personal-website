import { z } from "zod"

export const clientContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(320, "Email address is too long")
    .trim(),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(2000, "Message must be less than 2000 characters")
    .trim(),
})

export type ClientContactFormData = z.infer<typeof clientContactFormSchema>
