"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
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
    onTurnstileSuccess?: () => void
    onTurnstileError?: () => void
    turnstile?: {
      reset: (element: Element) => void
    }
  }
}

export const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [turnstileVerified, setTurnstileVerified] = useState(false)

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  useEffect(() => {
    ;(window as Window).onTurnstileSuccess = () => setTurnstileVerified(true)
    ;(window as Window).onTurnstileError = () => setTurnstileVerified(false)

    return () => {
      delete (window as Window).onTurnstileSuccess
      delete (window as Window).onTurnstileError
    }
  }, [])

  const onSubmit = async (data: z.infer<typeof clientContactFormSchema>) => {
    setPending(true)
    setMessage("")

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("message", data.message)

      const turnstileInput = document.querySelector<HTMLInputElement>(
        'input[name="cf-turnstile-response"]',
      )

      if (turnstileInput?.value) {
        formData.append("cf-turnstile-response", turnstileInput.value)
      }

      await submitContactForm(formData)

      setMessage("Thanks for your message! I'll get back to you soon.")
      form.reset()
      setTurnstileVerified(false)
      const turnstile = (window as Window).turnstile
      if (turnstile) {
        const widgetElement = document.querySelector(".cf-turnstile")
        if (widgetElement) {
          turnstile.reset(widgetElement)
        }
      }
    } catch {
      setMessage("Server fail. Refresh the page and try again later.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6">
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
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            data-theme="auto"
            data-callback="onTurnstileSuccess"
            data-error-callback="onTurnstileError"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={pending || !form.formState.isValid || !turnstileVerified}
        >
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
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
      </form>
    </Card>
  )
}
