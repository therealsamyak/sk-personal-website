import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

const ContactPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1">
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default ContactPage
