export interface ContactRequestBody {
  name: string
  email: string
  message: string
}

export interface ValidationResult {
  success: boolean
  data: ContactRequestBody | null
  errors?: Record<string, string[]> | null
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateContactForm = (body: unknown): ValidationResult => {
  const errors: Record<string, string[]> = {}

  if (!body || typeof body !== "object") {
    return {
      success: false,
      data: null,
      errors: { form: ["Invalid request format"] },
    }
  }

  const data = body as Record<string, unknown>

  // Validate name
  if (!data.name || typeof data.name !== "string") {
    errors.name = ["Name is required"]
  } else {
    const name = data.name.trim()
    if (name.length < 2) {
      errors.name = ["Name must be at least 2 characters long"]
    } else if (name.length > 100) {
      errors.name = ["Name must be less than 100 characters"]
    }
  }

  // Validate email
  if (!data.email || typeof data.email !== "string") {
    errors.email = ["Email is required"]
  } else {
    const email = data.email.trim()
    if (!isValidEmail(email)) {
      errors.email = ["Please enter a valid email address"]
    } else if (email.length > 320) {
      errors.email = ["Email address is too long"]
    }
  }

  // Validate message
  if (!data.message || typeof data.message !== "string") {
    errors.message = ["Message is required"]
  } else {
    const message = data.message.trim()
    if (message.length < 10) {
      errors.message = ["Message must be at least 10 characters long"]
    } else if (message.length > 2000) {
      errors.message = ["Message must be less than 2000 characters"]
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, data: null, errors }
  }

  return {
    success: true,
    data: {
      name: (data.name as string).trim(),
      email: (data.email as string).trim(),
      message: (data.message as string).trim(),
    },
    errors: null,
  }
}
