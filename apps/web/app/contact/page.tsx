import type { Metadata } from "next"
import { ContactSection } from "@/components/ContactSection"

export const metadata: Metadata = {
  title: "Contact | Samyak Kakatur",
  description: "Get in touch with me.",
}

const ContactPage = () => <ContactSection />

export default ContactPage
