import { collecting, defineCookie, thirdParty } from "@policystack/sdk"

// Static scan declarations for blog storage, hosting, and Umami analytics.
export const umamiAnalyticsDataDisclosure = collecting(
  "Usage analytics",
  {
    pageViewsAndUrls: "",
    referrer: "",
    clientAttributes: "",
    visitTime: "",
    ipDerivedData: "",
  },
  {
    pageViewsAndUrls: "Page views and URLs",
    referrer: "Referrer",
    clientAttributes: "Browser, device, language, and screen information",
    visitTime: "Visit time",
    ipDerivedData: "IP address processed for session and aggregate analytics",
  },
)

thirdParty(
  "Self-hosted Umami",
  "Aggregate usage analytics for this blog after analytics consent.",
  "/privacy",
)

thirdParty(
  "Cloudflare",
  "Hosts the blog and processes technical request data for delivery and security.",
  "https://www.cloudflare.com/privacypolicy/",
)

defineCookie("essential")
defineCookie("analytics")
