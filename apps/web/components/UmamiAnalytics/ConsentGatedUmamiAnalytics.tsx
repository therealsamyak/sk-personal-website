"use client"

import { useConsent } from "@policystack/react/consent"
import { useEffect } from "react"
import { umamiAnalyticsConfig } from "@/lib/umami-analytics"

type UmamiTracker = {
  track: (
    trackEvent?: (properties: Record<string, unknown>) => Record<string, unknown>,
  ) => Promise<void>
}

declare global {
  interface Window {
    umami?: UmamiTracker
  }
}

const UMAMI_SCRIPT_SELECTOR = "script[data-umami-consent-gated='true']"
let routeTrackingInstalled = false

function trackCurrentUmamiPageView() {
  try {
    void window.umami?.track((properties) => ({ ...properties, url: window.location.href }))
  } catch {
    // Umami failures must not affect navigation or the application.
  }
}

function installUmamiRouteTracking() {
  if (routeTrackingInstalled) return
  routeTrackingInstalled = true

  const originalPushState = history.pushState.bind(history)
  const originalReplaceState = history.replaceState.bind(history)

  history.pushState = (...args: Parameters<History["pushState"]>) => {
    const result = originalPushState(...args)
    trackCurrentUmamiPageView()
    return result
  }

  history.replaceState = (...args: Parameters<History["replaceState"]>) => {
    const result = originalReplaceState(...args)
    trackCurrentUmamiPageView()
    return result
  }

  window.addEventListener("popstate", trackCurrentUmamiPageView)
}

// Load Umami only after analytics consent and remove it when consent is withdrawn.
export function ConsentGatedUmamiAnalytics() {
  const { decisions } = useConsent()
  const analyticsConsented = decisions.analytics === true

  useEffect(() => {
    if (!analyticsConsented || !umamiAnalyticsConfig) return

    installUmamiRouteTracking()
    if (document.querySelector(UMAMI_SCRIPT_SELECTOR)) return

    const script = document.createElement("script")
    let consentPeriodActive = true

    script.src = umamiAnalyticsConfig.scriptUrl
    script.async = true
    script.dataset.umamiConsentGated = "true"
    script.dataset.websiteId = umamiAnalyticsConfig.websiteId
    script.dataset.autoTrack = "false"
    script.dataset.doNotTrack = "true"

    script.addEventListener(
      "load",
      () => {
        if (consentPeriodActive && script.isConnected) trackCurrentUmamiPageView()
      },
      { once: true },
    )

    script.addEventListener(
      "error",
      () => {
        script.remove()
        delete window.umami
      },
      { once: true },
    )

    document.head.appendChild(script)

    return () => {
      consentPeriodActive = false
      script.remove()
      delete window.umami
    }
  }, [analyticsConsented])

  return null
}
