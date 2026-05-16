"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck, CircleX } from "lucide-react"
import { useEffect, useReducer, useRef } from "react"
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

type FormState = {
  status: "idle" | "submitting" | "success" | "error"
  turnstileVerified: boolean
  dotCount: number
}

type FormAction =
  | { type: "SET_STATUS"; status: FormState["status"] }
  | { type: "SET_TURNSTILE"; verified: boolean }
  | { type: "TICK_DOT" }
  | { type: "RESET_AFTER_SUCCESS" }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.status }
    case "SET_TURNSTILE":
      return { ...state, turnstileVerified: action.verified }
    case "TICK_DOT":
      return { ...state, dotCount: (state.dotCount + 1) % 3 }
    case "RESET_AFTER_SUCCESS":
      return { ...state, status: "success", turnstileVerified: false }
    default:
      return state
  }
}

export const ContactForm = () => {
  const [state, dispatch] = useReducer(formReducer, {
    status: "idle",
    turnstileVerified: false,
    dotCount: 0,
  })

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const formAreaRef = useRef<HTMLDivElement>(null)
  const successViewRef = useRef<HTMLDivElement>(null)
  const errorViewRef = useRef<HTMLDivElement>(null)

  const dots = ".".repeat(state.dotCount + 1)

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
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
        callback: () => dispatch({ type: "SET_TURNSTILE", verified: true }),
        "error-callback": () => dispatch({ type: "SET_TURNSTILE", verified: false }),
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
    if (state.status !== "submitting") return
    const id = setInterval(() => dispatch({ type: "TICK_DOT" }), 400)
    return () => clearInterval(id)
  }, [state.status])

  const onSubmit = async (data: z.infer<typeof clientContactFormSchema>) => {
    dispatch({ type: "SET_STATUS", status: "submitting" })

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
      dispatch({ type: "SET_STATUS", status: "error" })
    }
  }

  const stateRef = useRef(state.status)
  stateRef.current = state.status

  const handleScanComplete = () => {
    if (stateRef.current !== "submitting") return

    // Instant DOM swap — bypass React re-render delay
    if (formAreaRef.current) formAreaRef.current.style.display = "none"
    if (successViewRef.current) successViewRef.current.style.display = "flex"

    dispatch({ type: "RESET_AFTER_SUCCESS" })
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
          callback: () => dispatch({ type: "SET_TURNSTILE", verified: true }),
          "error-callback": () => dispatch({ type: "SET_TURNSTILE", verified: false }),
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
      <Card className="p-6 relative overflow-hidden">
        <div
          ref={successViewRef}
          className="flex min-h-[300px] flex-col items-center justify-center gap-4"
          style={{ display: state.status === "success" ? "flex" : "none" }}
        >
          <CircleCheck className="size-12 text-green-600 dark:text-green-400" />
          <p className="text-center text-green-600 dark:text-green-400">
            Thanks for your message! I&apos;ll get back to you soon.
          </p>
        </div>

        <div
          ref={errorViewRef}
          className="flex min-h-[300px] flex-col items-center justify-center gap-4"
          style={{ display: state.status === "error" ? "flex" : "none" }}
        >
          <CircleX className="size-12 text-red-600 dark:text-red-400" />
          <p className="text-center text-red-600 dark:text-red-400">
            Something went wrong. Refresh the page and try again.
          </p>
        </div>

        <div
          ref={formAreaRef}
          style={{
            display: state.status === "success" || state.status === "error" ? "none" : undefined,
          }}
        >
          <div style={{ display: state.status === "submitting" ? "grid" : undefined }}>
            {state.status === "submitting" && (
              <div
                className="[grid-area:1/1] flex min-h-[300px] items-center justify-center"
                style={{ animation: "loadingAppear 800ms ease-in-out forwards" }}
              >
                <p className="text-muted-foreground text-sm">Loading{dots}</p>
              </div>
            )}
            <div
              className={state.status === "submitting" ? "[grid-area:1/1]" : ""}
              style={
                state.status === "submitting"
                  ? {
                      animation: "formScanClip 800ms ease-in-out forwards",
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
                  disabled={state.status !== "idle" || !isFormValid || !state.turnstileVerified}
                >
                  {state.status === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
        {state.status === "submitting" && (
          <div className="scanner-overlay">
            <div className="scanner-line" onAnimationEnd={handleScanComplete} />
          </div>
        )}
      </Card>
    </>
  )
}
