import { bindings, defineConfig } from "cf/config"
import { websitePublicEnv } from "./config/web-public-env.ts"

// Configure the deployed Worker and its resource bindings.
export default defineConfig({
  worker: {
    name: "skakatur-dev",
    compatibilityDate: "2026-04-21",
    compatibilityFlags: ["nodejs_compat"],
    unsafe: { metadata: { keep_bindings: ["plain_text", "json", "secret_text", "secret_key"] } },
    entrypoint: "vinext/server/fetch-handler",
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    workersDev: false,
    previewUrls: false,
    observability: {
      logs: {
        enabled: true,
      },
    },
    domains: ["skakatur.dev"],
    env: {
      NEXT_PUBLIC_BASE_URL: bindings.text(websitePublicEnv.NEXT_PUBLIC_BASE_URL),
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text(
        websitePublicEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      ),
      ASSETS: bindings.assets(),
    },
  },
})
