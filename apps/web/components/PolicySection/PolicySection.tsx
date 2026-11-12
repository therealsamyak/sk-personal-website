import type { ReactNode } from "react"
import { Card } from "@/ui/card"

// Render short policy content with the website's shared heading and card styles.
export function PolicySection({
  title,
  children,
}: {
  readonly title: string
  readonly children: ReactNode
}) {
  return (
    <section className="w-full pt-6 pb-12 md:pt-8 md:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-4 2xl:px-2">
        <div className="mx-auto mb-8 max-w-4xl text-center">
          <h1 className="mb-4 font-semibold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h1>
        </div>
        <Card className="mx-auto max-w-2xl gap-4 p-6 leading-relaxed">{children}</Card>
      </div>
    </section>
  )
}
