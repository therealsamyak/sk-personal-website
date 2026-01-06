"use server"

import { sendContactEmails } from "./email"
import { sanitizeContactData } from "./sanitize"
import { verifyTurnstileToken } from "./turnstile"
import { clientContactFormSchema } from "./validation"

export const submitContactForm = async (formData: FormData) => {
  const parsed = clientContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    throw new Error("Server fail. Refresh the page and try again later.")
  }

  const token = formData.get("cf-turnstile-response") as string | null

  if (!token) {
    throw new Error("Server fail. Refresh the page and try again later.")
  }

  const turnstileResult = await verifyTurnstileToken(token)
  if (!turnstileResult.success) {
    throw new Error("Server fail. Refresh the page and try again later.")
  }

  const sanitized = sanitizeContactData(parsed.data)
  const emailResult = await sendContactEmails(sanitized)

  if (!emailResult.success) {
    throw new Error("Server fail. Refresh the page and try again later.")
  }

  return { success: true }
}
