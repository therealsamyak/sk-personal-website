import { defineConfig } from "cf/config"

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
        pattern: "privacy-policy.example.com/*",
        zone: "privacy-policy.example.com",
      },
    ],
    workersDev: false,
    previewUrls: false,
    observability: {
      enabled: false,
    },
  },
})
