"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
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

export const ContactForm = () => {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [turnstileVerified, setTurnstileVerified] = useState(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  useEffect(() => {
    const container = turnstileRef.current
    if (!container) return

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let aborted = false

    const renderWidget = () => {
      if (aborted) return
      const el = turnstileRef.current
      if (!el || !window.turnstile?.render) return
      if (!document.body.contains(el)) return
      if (el.querySelector("iframe, input")) return
      widgetIdRef.current = window.turnstile.render(el, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        theme: "auto",
        callback: () => setTurnstileVerified(true),
        "error-callback": () => setTurnstileVerified(false),
      })
    }

    const scheduleRender = () => {
      // Delay to let ViewTransitions settle before rendering into the container
      requestAnimationFrame(() => {
        timeoutId = setTimeout(renderWidget, 50)
      })
    }

    if (window.turnstile?.render) {
      scheduleRender()
    } else {
      const script = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')
      if (script) {
        script.addEventListener("load", scheduleRender)
        return () => {
          script.removeEventListener("load", scheduleRender)
          aborted = true
          if (timeoutId) clearTimeout(timeoutId)
        }
      }
    }

    return () => {
      aborted = true
      if (timeoutId) clearTimeout(timeoutId)
      if (widgetIdRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* widget may already be removed */
        }
        widgetIdRef.current = null
      }
    }
  }, [])

  const onSubmit = async (data: z.infer<typeof clientContactFormSchema>) => {
    setState("submitting")

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("message", data.message)

      const turnstileInput = turnstileRef.current?.querySelector<HTMLInputElement>(
        'input[name="cf-turnstile-response"]',
      )

      if (turnstileInput?.value) {
        formData.append("cf-turnstile-response", turnstileInput.value)
      }

      await submitContactForm(formData)
    } catch {
      setState("error")
    }
  }

  const handleScanComplete = () => {
    if (state !== "submitting") return
    setState("success")
    form.reset()
    setTurnstileVerified(false)
    if (window.turnstile) {
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* widget may already be removed */
        }
        widgetIdRef.current = null
      }
      const container = turnstileRef.current
      if (container && window.turnstile.render) {
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          theme: "auto",
          callback: () => setTurnstileVerified(true),
          "error-callback": () => setTurnstileVerified(false),
        })
      }
    }
  }

  return (
    <>
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
      <Card
        className={`p-6 relative overflow-hidden ${state === "error" ? "form-error-shake" : ""}`}
      >
        {state === "success" ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
            <CircleCheck className="size-12 text-green-600 dark:text-green-400" />
            <p className="text-center text-green-600 dark:text-green-400">
              Thanks for your message! I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <div style={{ display: state === "submitting" ? "grid" : undefined }}>
            {state === "submitting" && (
              <div className="[grid-area:1/1] flex min-h-[300px] flex-col items-center justify-center gap-4">
                <CircleCheck className="size-12 text-green-600 dark:text-green-400" />
                <p className="text-center text-green-600 dark:text-green-400">
                  Thanks for your message! I&apos;ll get back to you soon.
                </p>
              </div>
            )}
            <div
              className={state === "submitting" ? "[grid-area:1/1] scan-clip" : ""}
              onAnimationEnd={state === "submitting" ? handleScanComplete : undefined}
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
                  disabled={state !== "idle" || !form.formState.isValid || !turnstileVerified}
                >
                  {state === "submitting" ? "Sending..." : "Send Message"}
                </Button>
                {state === "error" && (
                  <p className="mt-2 text-center text-sm text-red-600 dark:text-red-400">
                    Server fail. Refresh the page and try again later.
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
        {state === "submitting" && (
          <div className="scanner-overlay">
            <div className="scanner-line" />
          </div>
        )}
      </Card>
    </>
  )
}
