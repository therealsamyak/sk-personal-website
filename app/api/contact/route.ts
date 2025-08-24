import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmails } from "@/lib/email"

interface ContactRequestBody {
  name: string
  email: string
  message: string
}

interface ContactResponse {
  message: string
  success: boolean
  errors?: Record<string, string[]>
}

interface ValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateContactForm(body: unknown): ValidationResult {
  const errors: Record<string, string[]> = {}

  if (!body || typeof body !== "object") {
    errors.form = ["Invalid request format"]
    return { isValid: false, errors }
  }

  const { name, email, message } = body as Partial<ContactRequestBody>

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = ["Name is required"]
  } else if (name.trim().length < 2) {
    errors.name = ["Name must be at least 2 characters long"]
  } else if (name.trim().length > 100) {
    errors.name = ["Name must be less than 100 characters"]
  }

  if (!email || typeof email !== "string" || email.trim().length === 0) {
    errors.email = ["Email is required"]
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = ["Please enter a valid email address"]
  } else if (email.trim().length > 320) {
    errors.email = ["Email address is too long"]
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    errors.message = ["Message is required"]
  } else if (message.trim().length < 10) {
    errors.message = ["Message must be at least 10 characters long"]
  } else if (message.trim().length > 2000) {
    errors.message = ["Message must be less than 2000 characters"]
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

function sanitizeInput(input: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: Intentional control character removal for security
  return input.trim().replace(/[\x00-\x1F\x7F]/g, "")
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        {
          message: "Content-Type must be application/json",
          success: false,
        },
        { status: 400 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          message: "Invalid JSON format",
          success: false,
        },
        { status: 400 },
      )
    }

    const validation = validateContactForm(body)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          message: "Please fix the errors and try again",
          success: false,
          errors: validation.errors,
        },
        { status: 400 },
      )
    }

    const { name, email, message } = body as ContactRequestBody

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    }

    const emailResult = await sendContactEmails(sanitizedData)

    if (emailResult.success) {
      return NextResponse.json(
        {
          message: "Thanks for your message! I'll get back to you soon.",
          success: true,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
            "Content-Security-Policy": "default-src 'none'",
          },
        },
      )
    }

    console.error("Email sending failed:", emailResult.error)
    return NextResponse.json(
      {
        message:
          "Your message was received but there was an issue with email delivery. I'll still get back to you soon.",
        success: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again later.",
        success: false,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  }
}
