import { defineWranglerConfig } from "wrangler/experimental-config"

// Build the OpenNext Worker and its static assets.
export default defineWranglerConfig({
  assetsDirectory: ".open-next/assets",
})
