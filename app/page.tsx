import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { TechStack } from "@/components/TechStack"

const AboutPage = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1 px-6 pt-6 pb-12 md:pt-8 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl">
          <AboutSection />
        </div>
        <TechStack />
        <ExperienceSection />
      </div>
    </main>
    <Footer />
  </div>
)

export default AboutPage
