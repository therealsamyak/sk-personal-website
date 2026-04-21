"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { navigation } from "@/config/site"

let didPrefetch = false

export const PrefetchLinks = () => {
  const router = useRouter()

  useEffect(() => {
    if (didPrefetch) return
    didPrefetch = true

    const scheduleIdle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1))

    for (const item of navigation) {
      scheduleIdle(
        () => {
          router.prefetch(item.href)
        },
        { timeout: 2000 },
      )
    }
  }, [router])

  return null
}
