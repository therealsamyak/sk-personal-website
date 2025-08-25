import { ContactForm } from "@/components/ContactForm"

export const ContactSection = () => (
  <section className="w-full pt-6 pb-12 md:pt-8 md:pb-24">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
          Get in Touch
        </h2>
        <ContactForm />
      </div>
    </div>
  </section>
)
