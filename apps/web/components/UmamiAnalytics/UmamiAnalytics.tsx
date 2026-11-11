"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { loadUmamiAnalytics, trackUmamiPageView } from "../../../../shared/umami-browser"
import { umamiAnalyticsConfig } from "@/lib/umami-analytics"

// Track website page views automatically across links, history, and new routes.
export function UmamiAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (umamiAnalyticsConfig) loadUmamiAnalytics({ ...umamiAnalyticsConfig, manualPageviews: true })
  }, [])

  useEffect(trackUmamiPageView, [pathname, searchParams])

  return null
}
