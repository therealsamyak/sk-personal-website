import { defineWranglerConfig } from "wrangler/experimental-config"

// Let Cloudflare package these static source files without a site build step.
export default defineWranglerConfig({ assetsDirectory: "public" })
