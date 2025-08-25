"use client"

import { useEffect, useId, useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { clientContactFormSchema } from "@/lib/validation"

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string
          callback?: string | ((token: string) => void)
          "error-callback"?: string | (() => void)
          "expired-callback"?: string | (() => void)
          theme?: "light" | "dark" | "auto"
          size?: "normal" | "compact"
        },
      ) => string
    }
    onTurnstileSuccess?: (token: string) => void
    onTurnstileError?: () => void
    onTurnstileExpired?: () => void
  }
}

interface ContactFormData {
  name: string
  email: string
  message: string
  turnstileToken: string
}

interface ContactResponse {
  message: string
  success: boolean
  errors?: Record<string, string[]>
  turnstileToken?: string
}

export const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const turnstileId = useId()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if Turnstile script has loaded and render widget
    const checkTurnstile = () => {
      if (window.turnstile && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
        // Wait for the widget element to be in the DOM
        const widget = document.getElementById(turnstileId)

        if (widget && !turnstileWidgetId) {
          try {
            const widgetId = window.turnstile.render(widget, {
              sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
              callback: (token: string) => {
                setTurnstileToken(token)
                setFieldErrors((prev) => ({ ...prev, turnstile: [] }))
              },
              "error-callback": () => {
                setTurnstileToken(null)
                setFieldErrors((prev) => ({
                  ...prev,
                  turnstile: ["Verification failed. Please try again."],
                }))
              },
              "expired-callback": () => {
                setTurnstileToken(null)
                setFieldErrors((prev) => ({
                  ...prev,
                  turnstile: ["Verification expired. Please try again."],
                }))
              },
              theme: "auto",
            })
            setTurnstileWidgetId(widgetId)
          } catch (error) {
            console.error("Failed to render Turnstile widget:", error)
          }
        }
      } else if (!window.turnstile) {
        setTimeout(checkTurnstile, 500)
      }
    }

    // Add a small delay to ensure DOM is ready
    setTimeout(checkTurnstile, 100)
  }, [turnstileId, turnstileWidgetId])

  const validateField = (field: keyof typeof formData, value: string) => {
    try {
      const fieldSchema = clientContactFormSchema.pick({ [field]: true })
      fieldSchema.parse({ [field]: value })
      setFieldErrors((prev) => ({ ...prev, [field]: [] }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.issues.map((issue) => issue.message)
        setFieldErrors((prev) => ({ ...prev, [field]: errors }))
      }
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  // Cleanup effect for widget removal
  useEffect(() => {
    return () => {
      // Cleanup is handled by React when component unmounts
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setMessage("")

    if (!turnstileToken) {
      setMessage("Please complete the verification challenge.")
      setPending(false)
      return
    }

    const data: ContactFormData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      turnstileToken,
    }

    // Client-side validation before submitting
    try {
      clientContactFormSchema.parse({
        name: data.name,
        email: data.email,
        message: data.message,
        turnstileToken: data.turnstileToken,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string[]> = {}
        for (const issue of error.issues) {
          const field = issue.path.join(".")
          if (!errors[field]) {
            errors[field] = []
          }
          errors[field].push(issue.message)
        }
        setFieldErrors(errors)
        setPending(false)
        return
      }
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result: ContactResponse = await response.json()

      // Handle both successful responses and error responses with proper JSON
      if (result.success) {
        setMessage(result.message)
        setFormData({ name: "", email: "", message: "" })
        setFieldErrors({})
        setTurnstileToken(null)
        // Reset Turnstile widget
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId)
        }
      } else {
        // Handle server-side validation errors (including Turnstile failures)
        if (result.errors) {
          setFieldErrors(result.errors)
          // If there's a general message and no form-specific errors, show the message
          if (result.message && !result.errors.form) {
            setMessage(result.message)
          }
        } else {
          // Handle general error messages
          setMessage(result.message)
        }

        // For Turnstile failures, reset the token and widget
        if (result.errors?.form || result.message.toLowerCase().includes("verification")) {
          setTurnstileToken(null)
          if (window.turnstile && turnstileWidgetId) {
            window.turnstile.reset(turnstileWidgetId)
          }
        }
      }
    } catch (_error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={nameId} className="mb-2 block font-medium text-sm">
            Name
          </label>
          <Input
            id={nameId}
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            className={fieldErrors.name?.length > 0 ? "border-red-500 focus:ring-red-500" : ""}
          />
          {fieldErrors.name && (
            <div className="mt-1 space-y-1">
              {fieldErrors.name.map((error) => (
                <p key={error} className="text-red-600 text-xs">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <label htmlFor={emailId} className="mb-2 block font-medium text-sm">
            Email
          </label>
          <Input
            id={emailId}
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className={fieldErrors.email?.length > 0 ? "border-red-500 focus:ring-red-500" : ""}
          />
          {fieldErrors.email && (
            <div className="mt-1 space-y-1">
              {fieldErrors.email.map((error) => (
                <p key={error} className="text-red-600 text-xs">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <label htmlFor={messageId} className="mb-2 block font-medium text-sm">
            Message
          </label>
          <Textarea
            id={messageId}
            name="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            required
            className={fieldErrors.message?.length > 0 ? "border-red-500 focus:ring-red-500" : ""}
          />
          {fieldErrors.message && (
            <div className="mt-1 space-y-1">
              {fieldErrors.message.map((error) => (
                <p key={error} className="text-red-600 text-xs">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {isClient && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && <div id={turnstileId} />}
          {isClient && !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <div className="text-red-600 text-sm">Turnstile site key not configured</div>
          )}
          {fieldErrors.turnstile && (
            <div className="mt-1 space-y-1">
              {fieldErrors.turnstile.map((error) => (
                <p key={error} className="text-red-600 text-xs">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={pending || !turnstileToken}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && !fieldErrors.form && (
          <p
            className={`mt-2 text-center text-sm ${
              message.includes("Thanks") || message.includes("received")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {fieldErrors.form && (
          <div className="mt-2 space-y-1">
            {fieldErrors.form.map((error) => (
              <p key={error} className="text-center text-red-600 text-sm">
                {error}
              </p>
            ))}
          </div>
        )}
      </form>
    </Card>
  )
}
