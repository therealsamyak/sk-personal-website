import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmails } from "@/lib/email"

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill in all fields.", success: false },
        { status: 400 },
      )
    }

    const emailResult = await sendContactEmails({
      name,
      email,
      message,
    })

    if (emailResult.success) {
      return NextResponse.json({
        message: "Thanks for your message! I'll get back to you soon.",
        success: true,
      })
    }

    console.error("Email sending failed:", emailResult.error)
    return NextResponse.json({
      message:
        "Your message was received but there was an issue with email delivery. I'll still get back to you soon.",
      success: true,
    })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again or contact me directly.", success: false },
      { status: 500 },
    )
  }
}
