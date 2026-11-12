type UmamiTracker = {
  track: (
    properties: (payload: Record<string, unknown>) => Record<string, unknown>,
  ) => Promise<void>
}

declare global {
  interface Window {
    umami?: UmamiTracker
  }
}

// Configure the standard cookieless Umami tracker for a website.
export type UmamiBrowserConfig = {
  scriptUrl: string
  websiteId: string
  manualPageviews?: boolean
}

let lastTrackedPageUrl: string | undefined

// Track one Umami page view after the website route and title commit.
export function trackUmamiPageView(): void {
  if (!window.umami || lastTrackedPageUrl === location.href) return
  lastTrackedPageUrl = location.href
  try {
    void window.umami
      .track((payload) => ({ ...payload, url: location.href, title: document.title }))
      .catch(() => {})
  } catch {
    // Analytics downtime must not interrupt navigation.
  }
}

// Load standard Umami page-view analytics once and respect Do Not Track.
export function loadUmamiAnalytics(config: UmamiBrowserConfig): void {
  if (["1", "yes"].includes(navigator.doNotTrack ?? "")) return
  if (location.pathname.startsWith("/_emdash")) return
  if (document.querySelector("script[data-umami-analytics]")) return

  const script = document.createElement("script")
  script.src = config.scriptUrl
  script.async = true
  script.dataset.umamiAnalytics = "true"
  script.dataset.websiteId = config.websiteId
  script.dataset.doNotTrack = "true"
  if (config.manualPageviews) {
    script.dataset.autoPageview = "false"
    script.addEventListener("load", trackUmamiPageView, { once: true })
  }
  script.addEventListener("error", () => script.remove(), { once: true })
  document.head.appendChild(script)
}
