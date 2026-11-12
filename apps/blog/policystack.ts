import { defineConfig, LegalBases, Voluntary } from "@policystack/sdk"
import * as scanned from "./policystack.gen"

// PolicyStack configuration merged with the Vite scan of blog analytics code.
export default defineConfig(
  {
    company: {
      name: "Samyak Kakatur",
      legalName: "Samyak Kakatur",
      address: "United States",
      url: "https://blog.skakatur.dev",
      contact: {
        email: "removed@example.invalid",
      },
    },
    effectiveDate: "2026-11-07",
    jurisdictions: ["eea", "us-ca"],
    data: {
      collected: {},
      context: {
        "Usage analytics": {
          purpose:
            "To produce aggregate usage statistics in the self-hosted Umami service after analytics consent.",
          lawfulBasis: LegalBases.Consent,
          retention: "Retained as configured in the self-hosted Umami service.",
          provision: Voluntary("You can decline analytics without losing core blog functionality."),
        },
      },
    },
    cookies: {
      used: { essential: true, analytics: true },
      context: {
        essential: {
          lawfulBasis: LegalBases.LegitimateInterests,
          label: "Essential",
          description: "Stores your theme cookie and consent preferences in this browser.",
        },
        analytics: {
          lawfulBasis: LegalBases.Consent,
          label: "Analytics",
          description:
            "Loads the operator-run Umami script. Umami does not use cookies for this website ID.",
        },
      },
    },
    trackingTechnologies: ["first-party cookie", "local storage", "analytics scripts"],
    automatedDecisionMaking: [],
  },
  scanned,
)
