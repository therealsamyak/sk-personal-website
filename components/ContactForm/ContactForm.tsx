"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type { z } from "zod"
import { clientContactFormSchema } from "@/lib/validation"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"
import { Field, FieldError, FieldLabel } from "@/ui/field"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"

interface ContactResponse {
  message: string
  success: boolean
  errors?: Record<string, string[]>
}

export const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  const form = useForm<z.infer<typeof clientContactFormSchema>>({
    resolver: zodResolver(clientContactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
    mode: "onBlur",
  })

  const onSubmit = async (data: z.infer<typeof clientContactFormSchema>) => {
    setPending(true)
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result: ContactResponse = await response.json()

      if (result.success) {
        setMessage(result.message)
        form.reset()
      } else if (result.errors) {
        Object.entries(result.errors).forEach(([field, errors]) => {
          form.setError(field as "name" | "email" | "message", {
            type: "server",
            message: errors[0],
          })
        })
        if (result.message) setMessage(result.message)
      } else {
        setMessage(result.message)
      }
    } catch (_error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" className="w-full" disabled={pending || !form.formState.isValid}>
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
