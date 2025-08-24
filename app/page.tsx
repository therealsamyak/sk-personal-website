import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { TechStackSection } from "@/components/TechStackSection"
import { Separator } from "@/components/ui/separator"

const CustomSeparator = () => (
  <div className="flex w-full items-center justify-center px-6 pt-4">
    <Separator className="w-full" />
  </div>
)

const Page = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <HeroSection />
      <CustomSeparator />
      <ProjectsSection />
      <CustomSeparator />
      <TechStackSection />
      <CustomSeparator />
      <ContactSection />
    </main>
    <Footer />
  </div>
)

export default Page
