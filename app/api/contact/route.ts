import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmails } from "@/lib/email"
import { sanitizeContactData } from "./sanitize"
import { validateContactForm } from "./validation"

interface ContactResponse {
  message: string
  success: boolean
  errors?: Record<string, string[]> | null
}

export const POST = async (request: NextRequest): Promise<NextResponse<ContactResponse>> => {
  try {
    // Validate content type
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

    // Parse JSON body
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

    // Validate form data
    const validation = validateContactForm(body)
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        {
          message: "Please fix the errors and try again",
          success: false,
          errors: validation.errors,
        },
        { status: 400 },
      )
    }

    const { name, email, message } = validation.data

    // Sanitize input data
    const sanitizedData = sanitizeContactData({ name, email, message })

    // Send emails
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
