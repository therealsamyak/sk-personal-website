import { env } from "cloudflare:workers"

import { Resend } from "resend"
import { escapeContactHtml } from "./sanitize"

interface ContactFormData {
  name: string
  email: string
  message: string
}

// Send both contact emails concurrently and wait for both delivery requests.
export const sendContactEmails = async (formData: ContactFormData) => {
  const { name, email, message } = formData
  const htmlName = escapeContactHtml(name)
  const htmlEmail = escapeContactHtml(email)
  const htmlMessage = escapeContactHtml(message)
  const resend = new Resend(env.RESEND_API_KEY)

  if (!env.NOTIFICATION_EMAIL) {
    throw new Error("NOTIFICATION_EMAIL environment variable is not set")
  }

  if (!env.FROM_EMAIL) {
    throw new Error("FROM_EMAIL environment variable is not set")
  }

  try {
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const confirmationPromise = resend.emails.send({
      from: env.FROM_EMAIL,
      to: [email],
      subject: "Thanks for reaching out!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thanks for reaching out!</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 24px;">
            <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
              Hi ${htmlName},
            </p>

            <p style="margin: 0 0 16px 0;">
              Thanks for reaching out! I received your message:
            </p>

            <div style="margin: 0 0 16px 0; padding: 16px; background-color: #f9fafb; border-left: 3px solid #2563eb; border-radius: 4px;">
              <p style="margin: 0; font-style: italic; color: #374151;">"${htmlMessage}"</p>
            </div>

            <p style="margin: 0 0 24px 0;">
              I'll get back to you within 2 business days.
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              Best,<br>
              Samyak Kakatur
            </p>
          </body>
        </html>
      `,
    })

    const notificationPromise = resend.emails.send({
      from: env.FROM_EMAIL,
      to: [env.NOTIFICATION_EMAIL],
      subject: `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New message from ${htmlName}</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h1 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 600; color: #1f2937;">
              New message from ${htmlName}
            </h1>

            <div style="margin: 0 0 24px 0;">
              <div style="margin: 0 0 12px 0;">
                <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">From:</strong>
                <span style="margin-left: 8px;">${htmlName}</span>
              </div>
              <div style="margin: 0 0 12px 0;">
                <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</strong>
                <a href="mailto:${htmlEmail}" style="margin-left: 8px; color: #2563eb; text-decoration: none;">${htmlEmail}</a>
              </div>
            </div>

            <div style="margin: 0 0 24px 0;">
              <strong style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message:</strong>
              <div style="padding: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; color: #1f2937;">${htmlMessage}</div>
            </div>

            <p style="margin: 0 0 24px 0;">
              <a href="mailto:${htmlEmail}" style="color: #2563eb; text-decoration: none; font-weight: 500;">Reply to ${htmlName}</a>
            </p>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">

            <p style="margin: 0; color: #9ca3af; font-size: 13px;">
              Sent: ${timestamp}
            </p>
          </body>
        </html>
      `,
    })

    const [confirmationEmail, notificationEmail] = await Promise.allSettled([
      confirmationPromise,
      notificationPromise,
    ])
    if (confirmationEmail.status === "rejected") throw confirmationEmail.reason
    if (notificationEmail.status === "rejected") throw notificationEmail.reason

    if (confirmationEmail.value.error || notificationEmail.value.error) {
      return { success: false, error: "Contact email delivery failed" }
    }

    return {
      success: true,
      confirmationId: confirmationEmail.value.data?.id,
      notificationId: notificationEmail.value.data?.id,
    }
  } catch (error) {
    console.error("Error sending emails:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
