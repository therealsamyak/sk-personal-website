import { defineConfig } from "cf/config"

const privacyPolicyDomain = process.env.PRIVACY_POLICY_DOMAIN
if (!privacyPolicyDomain) {
  throw new Error("Set PRIVACY_POLICY_DOMAIN in the private deployment environment")
}

// Preserve the existing privacy Worker and its domain routing.
export default defineConfig({
  worker: {
    name: "ai-privacy-policy",
    compatibilityDate: "2026-11-11",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
    },
    triggers: [
      {
        type: "fetch",
        pattern: `${privacyPolicyDomain}/*`,
        zone: privacyPolicyDomain,
      },
    ],
    workersDev: false,
    previewUrls: false,
    observability: {
      enabled: false,
    },
  },
})
