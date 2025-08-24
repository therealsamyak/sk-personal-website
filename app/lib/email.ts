import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  message: string
}

export const sendContactEmails = async (formData: ContactFormData) => {
  const { name, email, message } = formData

  if (!process.env.NOTIFICATION_EMAIL) {
    throw new Error("NOTIFICATION_EMAIL environment variable is not set")
  }

  if (!process.env.FROM_EMAIL) {
    throw new Error("FROM_EMAIL environment variable is not set")
  }

  try {
    // Send confirmation email to the person who submitted the form
    const confirmationEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [email],
      subject: "Contact Form Submission Confirmation",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Confirmation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Contacting Us</h1>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 18px; margin-bottom: 20px;">Dear ${name},</p>

              <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
                Thank you for reaching out! We've successfully received your message and will review it shortly.
              </p>

              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;">
                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">Your Message:</h3>
                <p style="margin: 0; color: #666; font-style: italic;">"${message}"</p>
              </div>

              <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
                We appreciate you taking the time to contact us and will get back to you as soon as possible, typically within 24-48 hours.
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <div style="display: inline-block; padding: 15px 25px; background: #667eea; color: white; border-radius: 25px; font-weight: 500;">
                  ✓ Message Received Successfully
                </div>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="font-size: 14px; color: #888; text-align: center; margin: 0;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    // Send notification email to you
    const notificationEmail = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.NOTIFICATION_EMAIL],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">🔔 New Contact Form Submission</h1>
            </div>

            <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <p style="font-size: 18px; margin-bottom: 30px; color: #333;">
                You've received a new message through your contact form.
              </p>

              <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0;">
                <div style="display: grid; gap: 20px;">
                  <div>
                    <div style="font-weight: 600; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Name</div>
                    <div style="font-size: 16px; color: #555; padding: 10px; background: white; border-radius: 6px;">${name}</div>
                  </div>

                  <div>
                    <div style="font-weight: 600; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Email</div>
                    <div style="font-size: 16px; color: #555; padding: 10px; background: white; border-radius: 6px;">
                      <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                    </div>
                  </div>

                  <div>
                    <div style="font-weight: 600; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Message</div>
                    <div style="font-size: 16px; color: #555; padding: 15px; background: white; border-radius: 6px; line-height: 1.6;">${message}</div>
                  </div>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}" style="display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">
                  Reply to ${name}
                </a>
              </div>

              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

              <p style="font-size: 14px; color: #888; text-align: center; margin: 0;">
                Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              </p>
            </div>
          </body>
        </html>
      `,
    })

    return {
      success: true,
      confirmationId: confirmationEmail.data?.id,
      notificationId: notificationEmail.data?.id,
    }
  } catch (error) {
    console.error("Error sending emails:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
