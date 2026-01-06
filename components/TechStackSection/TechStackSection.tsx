import { TechStack } from "../TechStack"

export const TechStackSection = () => (
  <section className="w-full py-12 md:py-24">
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
      <h2 className="mb-12 text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
        Tech Stack
      </h2>
      <TechStack />
    </div>
  </section>
)
