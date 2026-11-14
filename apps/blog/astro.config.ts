import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import { access, d1, r2 } from "@emdash-cms/cloudflare"
import { formsPlugin } from "@emdash-cms/plugin-forms"
import { defineConfig, memoryCache } from "astro/config"
import emdash from "emdash/astro"

// Configure the Astro blog with EmDash and Cloudflare.
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
      migrations: { runtime: "check", dev: "auto" },
      storage: r2({ binding: "MEDIA" }),
      auth: access({
        teamDomain: "skakatur.cloudflareaccess.com",
        audienceEnvVar: "CF_ACCESS_AUDIENCE",
        autoProvision: true,
        defaultRole: 30,
      }),
      plugins: [formsPlugin()],
    }),
  ],
  devToolbar: { enabled: false },
  cache: {
    provider: memoryCache(),
  },
})
