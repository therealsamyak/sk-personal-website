import { env } from "cloudflare:workers"
import { z } from "zod"

interface TurnstileVerifyResult {
  success: boolean
  error?: string
}

// Verify the contact CAPTCHA before requesting email delivery.
export const verifyTurnstileToken = async (token: string): Promise<TurnstileVerifyResult> => {
  const secretKey = env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    return {
      success: false,
      error: "Bot detected. Refresh page and try again.",
    }
  }

  const formData = new FormData()
  formData.append("secret", secretKey)
  formData.append("response", token)

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    })

    const result = z.object({ success: z.boolean() }).parse(await response.json())

    if (result.success) {
      return { success: true }
    }

    return {
      success: false,
      error: "Bot detected. Refresh page and try again.",
    }
  } catch {
    return {
      success: false,
      error: "Bot detected. Refresh page and try again.",
    }
  }
}
