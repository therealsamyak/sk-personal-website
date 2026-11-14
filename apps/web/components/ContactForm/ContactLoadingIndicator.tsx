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
      className="loading-appear [grid-area:1/1] flex min-h-[300px] items-center justify-center"
    >
      <p className="text-muted-foreground text-sm">
        Loading<span aria-hidden="true">{".".repeat(dotCount)}</span>
      </p>
    </div>
  )
}

// Define the contact scanner glow filter.
export function ContactScannerFilter() {
  return (
    <svg
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <defs>
        <filter id="scannerGlow" colorInterpolationFilters="linearRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur16" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur8" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur4" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur16" />
            <feMergeNode in="blur8" />
            <feMergeNode in="blur4" />
            <feMergeNode in="blur2" />
          </feMerge>
          <feBlend in="SourceGraphic" mode="screen" />
        </filter>
      </defs>
    </svg>
  )
}
