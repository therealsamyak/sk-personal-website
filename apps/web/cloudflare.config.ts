import { bindings, defineConfig } from "cf/config"

// Configure the deployed Worker and its resource bindings.
export default defineConfig({
  worker: {
    name: "skakatur-dev",
    compatibilityDate: "2026-04-21",
    compatibilityFlags: ["nodejs_compat"],
    unsafe: { metadata: { keep_bindings: ["plain_text", "json", "secret_text", "secret_key"] } },
    entrypoint: ".open-next/worker.js",
    workersDev: false,
    previewUrls: false,
    observability: {
      logs: {
        enabled: true,
      },
    },
    domains: ["skakatur.dev"],
    env: {
      NEXT_PUBLIC_BASE_URL: bindings.text("https://skakatur.dev"),
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text("0x4AAAAAABunVtq2F8mV8IF1"),
      ASSETS: bindings.assets(),
    },
  },
})
