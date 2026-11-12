const UMAMI_WEBSITE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Committed public production defaults; environment variables may override them.
const DEFAULT_UMAMI_BASE_URL = "https://analytics.azurlaneecgc.com"
const DEFAULT_WEBSITE_UMAMI_WEBSITE_ID = "6870dce5-8778-47e1-b4f7-5ee887df95a6"

export type UmamiAnalyticsConfig = {
  scriptUrl: string
  websiteId: string
}

function isLoopbackHostname(hostname: string): boolean {
  return hostname === "localhost" || hostname.endsWith(".localhost") || hostname === "127.0.0.1"
}

function resolveUmamiAnalyticsConfig(): UmamiAnalyticsConfig | null {
  const baseUrl = (process.env.NEXT_PUBLIC_UMAMI_BASE_URL ?? DEFAULT_UMAMI_BASE_URL).trim()
  const websiteId = (
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? DEFAULT_WEBSITE_UMAMI_WEBSITE_ID
  ).trim()

  if (!baseUrl || !websiteId) return null
  if (!UMAMI_WEBSITE_ID_PATTERN.test(websiteId)) return null

  let parsedBaseUrl: URL
  try {
    parsedBaseUrl = new URL(baseUrl)
  } catch {
    return null
  }

  const allowedHttpOrigin =
    parsedBaseUrl.protocol === "http:" && isLoopbackHostname(parsedBaseUrl.hostname)
  if (!allowedHttpOrigin && parsedBaseUrl.protocol !== "https:") return null
  if (!allowedHttpOrigin && !parsedBaseUrl.hostname.includes(".")) return null
  if (parsedBaseUrl.username || parsedBaseUrl.password) return null
  if (parsedBaseUrl.pathname !== "/" || parsedBaseUrl.search || parsedBaseUrl.hash) return null

  return {
    scriptUrl: `${parsedBaseUrl.origin}/script.js`,
    websiteId,
  }
}

// Public build-time configuration for the consent-gated Umami browser script.
export const umamiAnalyticsConfig = resolveUmamiAnalyticsConfig()
