"use server"

import { sendContactEmails } from "./email"
import { sanitizeContactData } from "./sanitize"
import { verifyTurnstileToken } from "./turnstile"
import { clientContactFormSchema } from "./validation"

export async function submitContactForm(formData: FormData) {
  const parsed = clientContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    throw new Error("Server fail. Try again later")
  }

  const token = formData.get("cf-turnstile-response") as string | null

  if (!token) {
    throw new Error("Server fail. Try again later")
  }

  const turnstileResult = await verifyTurnstileToken(token)
  if (!turnstileResult.success) {
    throw new Error("Server fail. Try again later")
  }

  const sanitized = sanitizeContactData(parsed.data)
  const emailResult = await sendContactEmails(sanitized)

  if (!emailResult.success) {
    throw new Error("Server fail. Try again later")
  }

  return { success: true }
}
