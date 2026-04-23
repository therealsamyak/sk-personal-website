# skakatur.dev

My personal website and blog. Built with Next.js, Astro (EmDash CMS), TypeScript, Tailwind CSS, and shadcn/ui. Hosted on Cloudflare Workers free tier.

## Tech Stack

- **Portfolio** ([apps/web](apps/web)) — Next.js + shadcn/ui, deployed to Cloudflare Workers via OpenNext
- **Blog** ([apps/blog](apps/blog)) — Astro with EmDash CMS, deployed to Cloudflare Workers
- **Monorepo** — pnpm workspaces + Turborepo

## Local Development

```bash
pnpm install
```

Each app has its own `.env.example` — copy and fill in values:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/blog/.env.example apps/blog/.env
```

```bash
pnpm run dev
```

## Deployment

Both apps deploy to Cloudflare Workers. Each app has its own `.env.production` with the necessary secrets and config.

### Web App

```bash
pnpm run cf-deploy-website
```

Set environment variables in the Cloudflare Dashboard under **Workers & Pages** → **web** → **Settings** → **Variables**.

### Blog

```bash
pnpm run cf-deploy-blog
```

Set secrets via the Cloudflare Dashboard under **Workers & Pages** → **blog** → **Settings** → **Variables** → **Encrypt**.
