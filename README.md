# Personal Portfolio Template

A modern portfolio website with dark/light theme, project showcase, and contact form. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Getting Started

```bash
git clone https://github.com/therealsamyak/sk-personal-website.git
cd sk-personal-website
pnpm install
cp .env.example .env
```

Edit `.env` with your Resend API key (for contact form).

```bash
pnpm run dev
```

## Make It Yours

Ask your favorite AI agent to help you customize the content!

## Deployment

Deployed to Cloudflare Workers via OpenNext.

```bash
pnpm run cf-build
pnpm run cf-deploy
```

Set these environment variables in Cloudflare:

**Secret (encrypted):**

- `FROM_EMAIL` - Sender email for contact form
- `NOTIFICATION_EMAIL` - Your email to receive form submissions
- `RESEND_API_KEY` - Your Resend API key
- `TURNSTILE_SECRET_KEY` - Turnstile secret for spam protection

**Plaintext:**

- `NEXT_PUBLIC_BASE_URL` - Your production URL (e.g., https://yourdomain.dev)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Turnstile site key for spam protection

## Created by

[Samyak Kakatur](https://github.com/therealsamyak)
