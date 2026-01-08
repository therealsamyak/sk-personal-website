# Personal Portfolio Template

A modern portfolio website with dark/light theme, project showcase, and contact form. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Getting Started

```bash
git clone https://github.com/therealsamyak/sk-personal-website.git
cd sk-personal-website
bun install
cp .env.example .env
```

Edit `.env` with your Resend API key (for contact form).

```bash
bun run dev
```

## Make It Yours

Edit these config files to personalize:

- `config/site.ts` - Name, bio, email, social links
- `config/projects.ts` - Your projects
- `config/tech-stack.ts` - Your skills and tech

Replace images in `public/` with your own.

## Deployment

Deployed to Cloudflare Workers via OpenNext.

```bash
bun run deploy
```

Set `RESEND_API_KEY` and `CONTACT_EMAIL` in Cloudflare.

## License

MIT - Use this template however you want.

## Created by

[Samyak Kakatur](https://github.com/therealsamyak)
