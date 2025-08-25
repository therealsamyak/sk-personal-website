interface TurnstileResponse {
  success: boolean
  "error-codes"?: string[]
  challenge_ts?: string
  hostname?: string
  action?: string
}

export interface TurnstileValidationResult {
  success: boolean
  error?: string
  turnstileToken?: string
}

export const validateTurnstileToken = async (token: string): Promise<TurnstileValidationResult> => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured")
    return { success: false, error: "Server configuration error", turnstileToken: token }
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    if (!response.ok) {
      return { success: false, error: "Turnstile validation request failed", turnstileToken: token }
    }

    const result: TurnstileResponse = await response.json()

    if (!result.success) {
      console.error("Turnstile validation failed:", result["error-codes"])
      return {
        success: false,
        error: "Verification failed. Please try again.",
        turnstileToken: token,
      }
    }

    return { success: true, turnstileToken: token }
  } catch (error) {
    console.error("Turnstile validation error:", error)
    return { success: false, error: "Verification service unavailable", turnstileToken: token }
  }
}
