import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import { d1, r2 } from "@emdash-cms/cloudflare"
import { formsPlugin } from "@emdash-cms/plugin-forms"
import { defineConfig, memoryCache } from "astro/config"
import { policyStack } from "@policystack/vite"
import emdash from "emdash/astro"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  output: "server",
  adapter: cloudflare({ imageService: { build: "compile", runtime: "cloudflare-binding" } }),
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  integrations: [
    react(),
    emdash({
      database: d1({ binding: "DB", session: "auto" }),
      storage: r2({ binding: "MEDIA" }),
      plugins: [formsPlugin()],
      // auth: access({
      //   teamDomain: "samheart564.cloudflareaccess.com",
      // }),
    }),
  ],
  devToolbar: { enabled: false },
  cache: {
    provider: memoryCache(),
  },
  vite: {
    plugins: [policyStack({ consent: { mode: "warn" } }), tailwindcss()],
  },
})
