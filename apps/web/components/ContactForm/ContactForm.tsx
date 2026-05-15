"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck, CircleX } from "lucide-react"
import { useEffect, useReducer, useRef } from "react"
import type { BaseSyntheticEvent, ReactNode, RefObject } from "react"
import { Controller, useForm } from "react-hook-form"
import type { Control, SubmitHandler } from "react-hook-form"
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

type ContactFormValues = z.infer<typeof clientContactFormSchema>

type ContactFormState = {
  status: ContactFormStatus
  turnstileVerified: boolean
  dotCount: number
}

type ContactFormAction =
  | { type: "set-status"; status: ContactFormStatus }
  | { type: "set-turnstile-verified"; verified: boolean }
  | { type: "advance-dots" }
  | { type: "complete-success" }

const ScannerGlow = () => (
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
)

const ContactFormMessage = ({
  icon,
  message,
  tone,
}: {
  icon: ReactNode
  message: string
  tone: "success" | "error"
}) => (
  <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
    {icon}
    <p
      className="text-center text-green-600 dark:text-green-400 data-[error=true]:text-red-600 dark:data-[error=true]:text-red-400"
      data-error={tone === "error"}
    >
      {message}
    </p>
  </div>
)

const ContactFormFields = ({
  control,
  onSubmit,
  isDisabled,
  isSubmitting,
  isFormValid,
  turnstileRef,
}: {
  control: Control<ContactFormValues>
  onSubmit: (event?: BaseSyntheticEvent) => unknown
  isDisabled: boolean
  isSubmitting: boolean
  isFormValid: boolean
  turnstileRef: RefObject<HTMLDivElement | null>
}) => (
  <form onSubmit={onSubmit} className="flex flex-col gap-4">
    <Controller
      name="name"
      control={control}
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
      control={control}
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
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea {...field} id="message" aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <div className="flex justify-center">
      <div ref={turnstileRef} id="turnstile-container" />
    </div>
    <Button type="submit" className="w-full" disabled={isDisabled || !isFormValid}>
      {isSubmitting ? "Sending..." : "Send Message"}
    </Button>
  </form>
)

export const ContactForm = () => {
  const [formState, dispatch] = useReducer(
    (state: ContactFormState, action: ContactFormAction): ContactFormState => {
      switch (action.type) {
        case "set-status":
          return {
            ...state,
            status: action.status,
            dotCount: action.status === "submitting" ? state.dotCount : 0,
          }
        case "set-turnstile-verified":
          return {
            ...state,
            turnstileVerified: action.verified,
          }
        case "advance-dots":
          return {
            ...state,
            dotCount: (state.dotCount + 1) % 3,
          }
        case "complete-success":
          return {
            status: "success" as const,
            turnstileVerified: false,
            dotCount: 0,
          }
        default: {
          const exhaustiveAction: never = action
          throw new Error(`Unhandled action: ${JSON.stringify(exhaustiveAction)}`)
        }
      }
    },
    {
      status: "idle",
      turnstileVerified: false,
      dotCount: 0,
    },
  )
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const formAreaRef = useRef<HTMLDivElement>(null)
  const successViewRef = useRef<HTMLDivElement>(null)
  const errorViewRef = useRef<HTMLDivElement>(null)

  const dots = ".".repeat(formState.dotCount + 1)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  const watchedValues = form.watch()
  const isFormValid = clientContactFormSchema.safeParse(watchedValues).success

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
        callback: () => dispatch({ type: "set-turnstile-verified", verified: true }),
        "error-callback": () => dispatch({ type: "set-turnstile-verified", verified: false }),
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

  useEffect(() => {
    if (formState.status !== "submitting") return
    const id = setInterval(() => dispatch({ type: "advance-dots" }), 400)
    return () => clearInterval(id)
  }, [formState.status])

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    dispatch({ type: "set-status", status: "submitting" })

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
      // Instant DOM swap — bypass React re-render delay
      if (formAreaRef.current) formAreaRef.current.style.display = "none"
      if (errorViewRef.current) errorViewRef.current.style.display = "flex"
      dispatch({ type: "set-status", status: "error" })
    }
  }

  const stateRef = useRef(formState.status)
  stateRef.current = formState.status

  const handleScanComplete = () => {
    if (stateRef.current !== "submitting") return

    // Instant DOM swap — bypass React re-render delay
    if (formAreaRef.current) formAreaRef.current.style.display = "none"
    if (successViewRef.current) successViewRef.current.style.display = "flex"

    dispatch({ type: "complete-success" })
    form.reset()
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
          callback: () => dispatch({ type: "set-turnstile-verified", verified: true }),
          "error-callback": () => dispatch({ type: "set-turnstile-verified", verified: false }),
        })
      }
    }
  }

  return (
    <>
      <ScannerGlow />
      <Card className="p-6 relative overflow-hidden">
        <div
          ref={successViewRef}
          style={{ display: formState.status === "success" ? "flex" : "none" }}
        >
          <ContactFormMessage
            icon={<CircleCheck className="size-12 text-green-600 dark:text-green-400" />}
            message="Thanks for your message! I'll get back to you soon."
            tone="success"
          />
        </div>

        <div ref={errorViewRef} style={{ display: formState.status === "error" ? "flex" : "none" }}>
          <ContactFormMessage
            icon={<CircleX className="size-12 text-red-600 dark:text-red-400" />}
            message="Something went wrong. Refresh the page and try again."
            tone="error"
          />
        </div>

        <div
          ref={formAreaRef}
          style={{
            display:
              formState.status === "success" || formState.status === "error" ? "none" : undefined,
          }}
        >
          <div style={{ display: formState.status === "submitting" ? "grid" : undefined }}>
            {formState.status === "submitting" && (
              <div
                className="[grid-area:1/1] flex min-h-[300px] items-center justify-center"
                style={{ animation: "loadingAppear 800ms ease-in-out forwards" }}
              >
                <p className="text-muted-foreground text-sm">Loading{dots}</p>
              </div>
            )}
            <div
              className={formState.status === "submitting" ? "[grid-area:1/1]" : ""}
              style={
                formState.status === "submitting"
                  ? {
                      animation: "formScanClip 800ms ease-in-out forwards",
                      backgroundColor: "var(--card)",
                    }
                  : undefined
              }
            >
              <ContactFormFields
                control={form.control}
                onSubmit={form.handleSubmit(onSubmit)}
                isDisabled={formState.status !== "idle" || !formState.turnstileVerified}
                isSubmitting={formState.status === "submitting"}
                isFormValid={isFormValid}
                turnstileRef={turnstileRef}
              />
            </div>
          </div>
        </div>
        {formState.status === "submitting" && (
          <div className="scanner-overlay">
            <div className="scanner-line" onAnimationEnd={handleScanComplete} />
          </div>
        )}
      </Card>
    </>
  )
}
