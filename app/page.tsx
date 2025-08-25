import { AboutSection } from "@/components/AboutSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { TechStack } from "@/components/TechStack"

const AboutPage = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1 pt-6 px-6 pb-12 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <AboutSection />
        </div>
        <TechStack />
      </div>
    </main>
    <Footer />
  </div>
)

export default AboutPage
