import type { Metadata } from "next"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

export const metadata: Metadata = {
  title: "Contact | Samyak Kakatur",
  description: "Get in touch with me.",
}

const ContactPage = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1">
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default ContactPage
