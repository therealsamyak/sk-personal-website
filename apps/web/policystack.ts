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
  effectiveDate: "2026-06-14",
  jurisdictions: ["eea", "us-ca"],
  data: {
    collected: {
      Communications: ["Name", "Email address", "Message content"],
    },
    context: {
      Communications: {
        purpose: "To respond to inquiries submitted via the contact form",
        lawfulBasis: LegalBases.LegitimateInterests,
        retention: "90 days",
        provision: Voluntary("We cannot respond to your message without this information."),
      },
    },
  },
  thirdParties: [Providers.Cloudflare, Providers.Resend],
  cookies: {
    used: { essential: true, analytics: true, marketing: true },
    context: {
      essential: { lawfulBasis: LegalBases.LegalObligation },
      analytics: { lawfulBasis: LegalBases.Consent },
      marketing: { lawfulBasis: LegalBases.Consent },
    },
  },
  trackingTechnologies: ["local storage"],
  automatedDecisionMaking: [],
})
