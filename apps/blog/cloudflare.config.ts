import { bindings, defineConfig } from "cf/config"

// Configure the deployed Worker and its resource bindings.
export default defineConfig({
  worker: {
    name: "skakatur-blog",
    compatibilityDate: "2026-04-21",
    compatibilityFlags: ["nodejs_compat"],
    unsafe: { metadata: { keep_bindings: ["plain_text", "json", "secret_text", "secret_key"] } },
    entrypoint: "./src/worker.ts",
    workersDev: false,
    previewUrls: false,
    observability: {
      logs: {
        enabled: true,
      },
    },
    domains: ["blog.skakatur.dev"],
    env: {
      DB: bindings.d1({
        name: "sk-blog-v2",
        id: "68fe4da5-61df-4a54-86bf-af62c0ca3650",
        dev: {
          remote: false,
        },
      }),
      IMAGES: bindings.images(),
      SESSION: bindings.kv({
        id: "d69a89943cd848f1aa616bcb86beb90a",
        dev: {
          remote: false,
        },
      }),
      MEDIA: bindings.r2({
        name: "sk-blog-media",
        dev: {
          remote: false,
        },
      }),
    },
  },
})
