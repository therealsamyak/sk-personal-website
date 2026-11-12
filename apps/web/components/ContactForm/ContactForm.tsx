"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck, CircleX } from "lucide-react"
import Script from "next/script"
import { useCallback, useEffect, useRef, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import type { z } from "zod"
import { submitContactForm } from "@/lib/resend/actions"
import { clientContactFormSchema } from "@/lib/resend/validation"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { Field, FieldError, FieldLabel } from "@/ui/field"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"

declare global {
  interface Window {
    turnstile?: {
      render: (element: Element | string, options: Record<string, unknown>) => string
      reset: (widgetIdOrElement: string | Element) => void
      remove: (widgetIdOrElement: string | Element) => void
    }
  }
}

type ContactFormStatus = "idle" | "submitting" | "success" | "error"

function ContactLoadingIndicator() {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const intervalId = window.setInterval(() => setDotCount((count) => (count % 3) + 1), 400)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div
      aria-live="polite"
      className="loading-appear [grid-area:1/1] flex min-h-[300px] items-center justify-center"
    >
      <p className="text-muted-foreground text-sm">
        Loading<span aria-hidden="true">{".".repeat(dotCount)}</span>
      </p>
    </div>
  )
}

// Render the contact form and report the server submission result.
export const ContactForm = () => {
  const [status, setStatus] = useState<ContactFormStatus>("idle")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
    // Clear corrected errors while typing so the submit button does not move on blur.
    mode: "onTouched",
  })

  const watchedValues = useWatch({ control: form.control })
  const isFormValid = clientContactFormSchema.safeParse(watchedValues).success

  const renderTurnstileWidget = useCallback(() => {
    const container = turnstileRef.current
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!container || !window.turnstile || widgetIdRef.current || !siteKey) return
    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(null),
      "error-callback": () => setTurnstileToken(null),
    })
  }, [])

  useEffect(() => {
    // Restore the Turnstile widget when Strict Mode repeats effect setup.
    renderTurnstileWidget()
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderTurnstileWidget])

  const onSubmit = async (data: z.infer<typeof clientContactFormSchema>) => {
    setStatus("submitting")

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("message", data.message)

      if (turnstileToken) {
        formData.append("cf-turnstile-response", turnstileToken)
      }

      await submitContactForm(formData)
      setStatus("success")
      setTurnstileToken(null)
      form.reset()
    } catch {
      // Report rejected contact submissions without showing premature success.
      setStatus("error")
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderTurnstileWidget}
      />
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="scannerGlow" colorInterpolationFilters="linearRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur16" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur8" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur16" />
              <feMergeNode in="blur8" />
              <feMergeNode in="blur4" />
              <feMergeNode in="blur2" />
            </feMerge>
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>
        </defs>
      </svg>
      <Card className="p-6 relative overflow-hidden">
        <div
          aria-live="polite"
          className="flex min-h-[300px] flex-col items-center justify-center gap-4"
          style={{ display: status === "success" ? "flex" : "none" }}
        >
          <CircleCheck className="size-12 text-green-600 dark:text-green-400" />
          <p className="text-center text-green-600 dark:text-green-400">
            Thanks for your message! I&apos;ll get back to you soon.
          </p>
        </div>

        <div
          role="alert"
          className="flex min-h-[300px] flex-col items-center justify-center gap-4"
          style={{ display: status === "error" ? "flex" : "none" }}
        >
          <CircleX className="size-12 text-red-600 dark:text-red-400" />
          <p className="text-center text-red-600 dark:text-red-400">
            Something went wrong. Refresh the page and try again.
          </p>
        </div>

        <div
          style={{
            display: status === "success" || status === "error" ? "none" : undefined,
          }}
        >
          <div style={{ display: status === "submitting" ? "grid" : undefined }}>
            {status === "submitting" && <ContactLoadingIndicator />}
            <div
              className={status === "submitting" ? "form-scan-clip [grid-area:1/1]" : ""}
              style={
                status === "submitting"
                  ? {
                      backgroundColor: "var(--card)",
                    }
                  : undefined
              }
            >
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input {...field} id="name" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input {...field} id="email" type="email" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="message">Message</FieldLabel>
                      <Textarea {...field} id="message" aria-invalid={fieldState.invalid} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                {/* turnstile */}
                <div className="flex justify-center">
                  <div ref={turnstileRef} id="turnstile-container" />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status !== "idle" || !isFormValid || !turnstileToken}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
        {status === "submitting" && (
          <div className="scanner-overlay">
            <div className="scanner-line" />
          </div>
        )}
      </Card>
    </>
  )
}
