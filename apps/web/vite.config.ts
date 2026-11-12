import { cloudflare } from "@cloudflare/vite-plugin"
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter"
import { defineConfig, loadEnv } from "vite"
import vinext from "vinext"
import { websitePublicEnv } from "./config/web-public-env.ts"

// Build the website with prerendered responses and dynamic contact server actions.
export default defineConfig(({ mode }) => ({
  define: Object.fromEntries(
    Object.entries(websitePublicEnv).map(([key, value]) => [
      `process.env.${key}`,
      JSON.stringify(
        process.env[key] ?? loadEnv(mode, process.cwd(), "NEXT_PUBLIC_")[key] ?? value,
      ),
    ]),
  ),
  plugins: [
    vinext({
      cache: { cdn: staticAssetsAdapter() },
      prerender: { routes: "*" },
    }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
}))
