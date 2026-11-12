# [skakatur.dev](https://skakatur.dev)

My personal website and blog. Built with Vinext (Next.js App Router), Astro (EmDash CMS), TypeScript, Tailwind CSS, and shadcn/ui. Hosted on Cloudflare Workers free tier.

## Tech Stack

- **Web (Portfolio)** ([apps/web](apps/web))
  - [Vinext](https://vinext.dev/), built with Vite and deployed to Cloudflare Workers
- **Blog** ([apps/blog](apps/blog))
  - Astro ([EmDash CMS](https://github.com/emdash-cms/emdash)), deployed to Cloudflare Workers

## Local Development

The repository is a monorepo utilizing [pnpm](https://github.com/pnpm/pnpm) and [Turborepo](https://github.com/vercel/turborepo).

Each app has its own `.env.example`, copy and fill in values:

```bash
cp apps/web/.env.example apps/web/.env.development
cp apps/blog/.env.example apps/blog/.env.development
```

Use pnpm 12.18.0 to install dependencies. The project pins Node.js 26.13.1 through `devEngines.runtime`.
When your Node.js version differs, pnpm downloads the project runtime. Your global Node.js installation stays unchanged.

Install dependencies:

```bash
pnpm install
```

The blog's generated EmDash schema types are committed in `apps/blog/emdash-env.d.ts`.
Builds use this file without a running CMS or access to the production database.
When the local CMS regenerates this file after schema changes, commit the updated declarations with those changes.
The blog uses TypeScript 6 because Astro checking requires the TypeScript programmatic API.

Run `pnpm typecheck` to check both applications. The website uses Oxc tsrs; the blog uses Astro checking for `.astro` templates.
`pnpm check` and the Lefthook pre-commit hook also run these project checks.
The tsrs version respects the existing release-age policy; no package-age exclusions are added.

Run the build and dev commands to get started:

```bash
pnpm run build
pnpm run dev
```

Dev servers are proxied through [Portless](https://github.com/vercel-labs/portless), giving each app a stable `.localhost` URL (`web.localhost`, `blog.localhost`) instead of raw port numbers. `pnpm dev` starts the proxy before Turborepo kicks in (one password prompt to start, another to stop on exit). If the proxy is already running, it's left untouched.

## Deployment

### Umami analytics

Both apps use the operator-run, self-hosted Umami service. Their committed public client defaults identify the public Umami origin and the correct website record for each app.

The production defaults are public browser configuration. Environment variables can override either origin or website ID. Set both override keys to empty strings to disable analytics for local checks. Invalid values also disable analytics without an application error.

Do not commit Umami administrator credentials or API tokens. The admin dashboard is private and the browser collection endpoint is public.

Both apps use `cloudflare.config.ts` with the pinned `cf` beta CLI. Run CLI commands through pnpm with Node.js 26.13.1. Bun cannot run `cf`.
The blog uses the Cloudflare adapter 15 beta, which reads the new configuration through the Cloudflare Vite plugin.
The web app uses Vinext 1.4.5 with Cloudflare Vite plugin v2 (pinned beta) and the Static Assets cache adapter.
Both `build` and `cf-build` emit Cloudflare Build Output under `apps/web/.cloudflare/output`.
Pages and RSC payloads are prerendered into the ASSETS binding; contact POST actions still execute in the Worker.
The private cache directory routes through the Worker. JavaScript and CSS assets bypass it.
No KV, Response Store, or Images binding is required. The blog retains its independent Cloudflare tooling.
The `cf-deploy` script uploads the built output with `cf deploy --prebuilt`.
Use `pnpm --filter web deploy` to build and deploy together. Use `pnpm --filter web preview` to build and preview locally.
Use the web package scripts for Vite development, builds, and local Workers previews.
`NEXT_PUBLIC_*` values are compiled into the client bundle. Shell variables override `.env` files and source defaults.
Set the public Turnstile key before building. Server secrets use `cloudflare:workers` runtime bindings; rebuilds are unnecessary for secret changes.
The web configuration preserves dashboard variables and secrets through Worker upload metadata.

Both apps deploy to Cloudflare Workers. Each app has its own `.env.production` with the necessary secrets and config.

#### Web

```bash
pnpm run cf-deploy-website
```

#### Blog

```bash
pnpm run cf-deploy-blog
```

Ensure environment variables / secrets are set via the Cloudflare Dashboard under **Compute** --> **Workers & Pages** --> **(Worker Name)** --> **Settings** --> **Variables and Secrets**.
