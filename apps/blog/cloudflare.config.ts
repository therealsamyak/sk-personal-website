import { bindings, defineConfig } from "cf/config"

// Configure the deployed Worker and its resource bindings.
export default defineConfig({
  worker: {
    name: "skakatur-blog",
    compatibilityDate: "2026-04-21",
    compatibilityFlags: ["nodejs_compat"],
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
        name: "sk-blog",
        id: "0e23cac9-9532-4995-aa41-bfe1fe31ea0d",
        dev: {
          remote: false,
        },
      }),
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
