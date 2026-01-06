export interface TurnstileVerifyResult {
  success: boolean
  error?: string
}

export const verifyTurnstileToken = async (token: string): Promise<TurnstileVerifyResult> => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

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

    const result = await response.json()

    if (result.success) {
      return { success: true }
    }

    return {
      success: false,
      error: "Bot detected. Refresh page and try again.",
    }
  } catch (_error) {
    return {
      success: false,
      error: "Bot detected. Refresh page and try again.",
    }
  }
}
