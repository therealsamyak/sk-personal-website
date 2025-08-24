"use client"

import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactResponse {
  message: string
  success: boolean
  errors?: Record<string, string[]>
}

export const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setMessage("")
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
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

      if (result.success) {
        setMessage(result.message)
        ;(event.target as HTMLFormElement).reset()
      } else if (result.errors) {
        setFieldErrors(result.errors)
        if (result.message && !result.errors.form) {
          setMessage(result.message)
        }
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={nameId} className="mb-2 block font-medium text-sm">
            Name
          </label>
          <Input
            id={nameId}
            name="name"
            required
            className={fieldErrors.name ? "border-red-500 focus:ring-red-500" : ""}
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
            required
            className={fieldErrors.email ? "border-red-500 focus:ring-red-500" : ""}
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
            required
            className={fieldErrors.message ? "border-red-500 focus:ring-red-500" : ""}
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
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && !fieldErrors.form && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Thanks") || message.includes("received")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {fieldErrors.form && (
          <div className="mt-4 space-y-1">
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
