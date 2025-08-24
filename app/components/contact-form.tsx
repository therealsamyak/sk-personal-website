"use client"

import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "../actions"

const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    try {
      const response = await submitContactForm(formData)
      setMessage(response.message)
    } catch (_error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <Card className="p-6">
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={nameId} className="mb-2 block font-medium text-sm">
            Name
          </label>
          <Input id={nameId} name="name" required />
        </div>
        <div>
          <label htmlFor={emailId} className="mb-2 block font-medium text-sm">
            Email
          </label>
          <Input id={emailId} name="email" type="email" required />
        </div>
        <div>
          <label htmlFor={messageId} className="mb-2 block font-medium text-sm">
            Message
          </label>
          <Textarea id={messageId} name="message" required />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && <p className="mt-4 text-center text-muted-foreground text-sm">{message}</p>}
      </form>
    </Card>
  )
}

export default ContactForm
