import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import { d1, r2 } from "@emdash-cms/cloudflare"
import { formsPlugin } from "@emdash-cms/plugin-forms"
import { defineConfig, fontProviders } from "astro/config"
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
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Syne",
      cssVariable: "--font-display",
      weights: [400, 500, 600, 700, 800],
      fallbacks: ["'Helvetica Neue'", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Spectral",
      cssVariable: "--font-serif",
      weights: [300, 400, 500, 600],
      fallbacks: ["'Times New Roman'", "serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: [400, 500, 600],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
})
