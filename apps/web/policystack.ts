import { defineConfig, LegalBases, Providers, Voluntary } from "@policystack/sdk"

export default defineConfig({
  company: {
    name: "Samyak Kakatur",
    legalName: "Samyak Kakatur",
    address: "United States",
    url: "https://skakatur.dev",
    contact: {
      email: "therealsamyak@gmail.com",
    },
  },
  effectiveDate: "2026-11-07",
  jurisdictions: ["eea", "us-ca"],
  data: {
    collected: {
      Communications: ["Name", "Email address", "Message content"],
      "Usage analytics": [
        "Page views and URLs",
        "Referrer",
        "Browser, device, language, and screen information",
        "Visit time",
        "IP address processed for session and aggregate analytics",
      ],
      "Hosting and delivery": ["IP address", "Request metadata"],
    },
    context: {
      Communications: {
        purpose: "To respond to inquiries submitted via the contact form",
        lawfulBasis: LegalBases.LegitimateInterests,
        retention: "90 days",
        provision: Voluntary("We cannot respond to your message without this information."),
      },
      "Usage analytics": {
        purpose:
          "To produce aggregate usage statistics in the self-hosted Umami service after analytics consent.",
        lawfulBasis: LegalBases.Consent,
        retention: "Retained as configured in the self-hosted Umami service.",
        provision: Voluntary("You can decline analytics without losing core site functionality."),
      },
      "Hosting and delivery": {
        purpose: "To host, route, and protect the site and its future analytics tunnel.",
        lawfulBasis: LegalBases.LegitimateInterests,
        retention: "Retained as required by Cloudflare for delivery and security.",
        provision: Voluntary("The site cannot be delivered without this technical processing."),
      },
    },
  },
  thirdParties: [
    Providers.Cloudflare,
    Providers.Resend,
    {
      name: "Self-hosted Umami",
      purpose: "Aggregate usage analytics for this website after analytics consent.",
    },
  ],
  cookies: {
    used: { essential: true, analytics: true },
    context: {
      essential: {
        lawfulBasis: LegalBases.LegitimateInterests,
        label: "Essential",
        description: "Stores theme and consent preferences in your browser.",
      },
      analytics: {
        lawfulBasis: LegalBases.Consent,
        label: "Analytics",
        description:
          "Loads the operator-run Umami script. Umami does not use cookies for this website ID.",
      },
    },
  },
  trackingTechnologies: ["local storage", "analytics scripts"],
  automatedDecisionMaking: [],
})
