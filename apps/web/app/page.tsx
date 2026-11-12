import type { Metadata } from "next"

import { AboutSection } from "@/components/AboutSection"

export const metadata: Metadata = {
  title: "Samyak Kakatur",
  description: "Full-Stack & Embedded Software Engineer.",
}
import { ExperienceSection } from "@/components/ExperienceSection"
import { TechStack } from "@/components/TechStack"

const AboutPage = () => (
  <div className="px-6 pt-6 pb-12 md:pt-8 md:pb-24">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl">
        <AboutSection />
      </div>
      <TechStack />
      <ExperienceSection />
    </div>
  </div>
)

export default AboutPage
