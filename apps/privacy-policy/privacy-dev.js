import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { Miniflare } from "miniflare"

const workerRoot = new URL(".cloudflare/output/v0/workers/default/", import.meta.url)
const { manifest, ...config } = JSON.parse(
  await readFile(new URL("worker.config.json", workerRoot), "utf8"),
)
const server = new Miniflare({
  host: "127.0.0.1",
  port: Number(process.env.PORT || 8788),
  workers: [
    {
      config: {
        ...config,
        assets: {
          ...config.assets,
          directory: fileURLToPath(new URL("assets/", workerRoot)),
          hasUserWorker: true,
        },
        manifest: {
          mainModule: manifest.mainModule,
          modules: {
            [manifest.mainModule]: {
              type: "esm",
              contents: await readFile(
                new URL(`bundle/${manifest.mainModule}`, workerRoot),
                "utf8",
              ),
            },
          },
        },
      },
    },
  ],
})
console.log(`Privacy policy: ${new URL("/ai-privacy-policy", await server.ready)}`)
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, async () => {
    await server.dispose()
    process.exit(0)
  })
}
