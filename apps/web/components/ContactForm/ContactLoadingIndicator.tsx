"use client"

import { useEffect, useState } from "react"

// Show contact submission loading feedback.
export function ContactLoadingIndicator() {
  const [dotCount, setDotCount] = useState(1)

  useEffect(() => {
    const intervalId = window.setInterval(() => setDotCount((count) => (count % 3) + 1), 400)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <div
      aria-live="polite"
      className="[grid-area:1/1] flex min-h-[300px] items-center justify-center"
    >
      <p className="text-muted-foreground text-sm">
        Loading<span aria-hidden="true">{".".repeat(dotCount)}</span>
      </p>
    </div>
  )
}
