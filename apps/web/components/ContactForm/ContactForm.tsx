"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { accentPair } from "glimm"
import { GlimmScope, type GlimmScopeHandle } from "glimm/react"
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
import { ContactLoadingIndicator } from "./ContactLoadingIndicator"

const contactSuccessPalette = accentPair("#16899a", "#53bbc7")

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

// Render the contact form and report the server submission result.
export const ContactForm = () => {
  const [status, setStatus] = useState<ContactFormStatus>("idle")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const successScopeRef = useRef<GlimmScopeHandle>(null)
  const confirmationRef = useRef<HTMLParagraphElement>(null)
  const contactContentRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus({ preventScroll: true })
  }, [status])

  const submitContactMessage = async (data: z.infer<typeof clientContactFormSchema>) => {
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
    } catch {
      // Report rejected contact submissions without showing premature success.
      setStatus("error")
      return
    }

    const revealContactSuccess = () => {
      setStatus("success")
      setTurnstileToken(null)
      form.reset()
    }
    try {
      const content = contactContentRef.current
      if (content) content.style.minHeight = content.getBoundingClientRect().height + "px"
      // Remove the completed Turnstile iframe before Glimm clones the outgoing view.
      const container = turnstileRef.current
      if (container && widgetIdRef.current && window.turnstile) {
        container.style.height = container.getBoundingClientRect().height + "px"
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
      if (successScopeRef.current) {
        successScopeRef.current.play({ change: revealContactSuccess })
      } else {
        revealContactSuccess()
      }
    } catch {
      // Animation failure cannot change a confirmed contact delivery into an error.
      revealContactSuccess()
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderTurnstileWidget}
      />
      <output className="sr-only" aria-live="polite">
        {status === "success" ? "Thanks for your message! I'll get back to you soon." : ""}
      </output>
      <Card className="p-0 relative overflow-hidden">
        <GlimmScope
          ref={successScopeRef}
          pageEffect={false}
          direction="btt"
          sweepMs={1200}
          palette={contactSuccessPalette}
          brightness={0.65}
          peakAlpha={0.65}
          swellAmount={0}
        >
          <div ref={contactContentRef} className="relative grid p-6">
            <div
              className="[grid-area:1/1] flex min-h-[300px] flex-col items-center justify-center gap-4"
              style={{ display: status === "success" ? "flex" : "none" }}
            >
              <CircleCheck className="size-12 text-green-600 dark:text-green-400" />
              <p
                ref={confirmationRef}
                tabIndex={-1}
                className="text-center text-green-600 dark:text-green-400"
              >
                Thanks for your message! I&apos;ll get back to you soon.
              </p>
            </div>

            <div
              role="alert"
              className="[grid-area:1/1] flex min-h-[300px] flex-col items-center justify-center gap-4"
              style={{ display: status === "error" ? "flex" : "none" }}
            >
              <CircleX className="size-12 text-red-600 dark:text-red-400" />
              <p className="text-center text-red-600 dark:text-red-400">
                Something went wrong. Refresh the page and try again.
              </p>
            </div>

            <div
              className="[grid-area:1/1]"
              inert={status === "success" || status === "error"}
              style={{
                visibility: status === "success" || status === "error" ? "hidden" : undefined,
              }}
            >
              <div style={{ display: status === "submitting" ? "grid" : undefined }}>
                {status === "submitting" && <ContactLoadingIndicator />}
                <div
                  className="[grid-area:1/1]"
                  style={{ visibility: status === "submitting" ? "hidden" : undefined }}
                >
                  <form
                    onSubmit={(event) => form.handleSubmit(submitContactMessage)(event)}
                    className="flex flex-col gap-4"
                  >
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
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            aria-invalid={fieldState.invalid}
                          />
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
          </div>
        </GlimmScope>
      </Card>
    </>
  )
}
