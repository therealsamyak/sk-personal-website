# Samyak Kakatur - Personal Portfolio Website

A modern, responsive personal portfolio built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui. Features a dark/light theme toggle, project showcase, and a contact form with email integration.

## Features

- 🌙 Dark/Light theme toggle with system preference detection
- 📱 Fully responsive design optimized for all devices
- 🎨 Modern UI built with shadcn/ui and Radix primitives
- 📧 Contact form with Resend email integration
- 🚀 Deployed on Cloudflare Pages via OpenNext
- ⚡ Built with Bun for fast development and tooling
- ✨ Type-safe with strict TypeScript and Zod validation

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Validation**: Zod
- **Email Service**: Resend
- **Package Manager**: Bun
- **Deployment**: Cloudflare Pages via @opennextjs/cloudflare
- **Linting/Formatting**: Biome
- **Pre-commit Hooks**: Lefthook

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A Resend API key (for email functionality)
- Cloudflare account (for deployment)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/therealsamyak/sk-personal-website.git
cd sk-personal-website
```

2. Install dependencies:

```bash
bun install
```

3. Copy the example environment file and configure:

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
# Required for email functionality
RESEND_API_KEY=your_resend_api_key_here

# Optional: Override default recipient email
CONTACT_EMAIL=your_email@example.com
```

### Development

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sk-personal-website/
├── src/
│   ├── apps/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   └── contact/  # Contact form endpoint
│   │   ├── contact/      # Contact page
│   │   ├── projects/     # Projects page
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui base components
│   │   ├── AboutSection/   # About me section
│   │   ├── ContactForm/    # Contact form component
│   │   ├── ContactSection/ # Contact page section
│   │   ├── ExperienceSection/ # Work experience
│   │   ├── Footer/         # Footer component
│   │   ├── Header/         # Header with navigation
│   │   ├── ProjectCard/    # Individual project card
│   │   ├── ProjectsSection/ # Projects grid
│   │   ├── TechStack/      # Tech stack display
│   │   └── ThemeProvider/  # Theme context provider
│   ├── config/           # Site configuration
│   │   ├── site.ts       # Personal info & navigation
│   │   ├── projects.ts   # Projects data
│   │   └── tech-stack.ts # Skills & technologies
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities
├── public/                 # Static assets
├── .env.example           # Environment variables template
├── biome.jsonc            # Biome linter configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── wrangler.toml          # Cloudflare Workers configuration
```

## Configuration

### Personal Information

Edit `app/config/site.ts` to update:

- Name, title, and description
- Email address
- Profile image
- Resume URL
- Social media links (GitHub, LinkedIn, X/Twitter)

### Projects

Edit `app/config/projects.ts` to add or modify projects:

- Title and description
- Project image (stored in `public/`)
- Project link
- Technology tags

### Tech Stack

Edit `app/config/tech-stack.ts` to update your skills:

- Organized by category (Frontend, Backend, Hardware, etc.)
- Each skill has an associated color for styling

## Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run check        # Run Biome linter with auto-fix
bun run preview      # Build and preview Cloudflare deployment
bun run deploy       # Deploy to Cloudflare Pages
bun run cf-typegen   # Generate Cloudflare environment types
```

## Deployment

### Cloudflare Pages (Recommended)

This project uses [@opennextjs/cloudflare](https://github.com/opennextjs/opennextjs-cloudflare) for deployment to Cloudflare Pages.

1. Build the project:

```bash
bun run cf-build
```

2. Deploy to Cloudflare:

```bash
bun run cf-deploy
```

3. Or deploy via Cloudflare dashboard by connecting your GitHub repository

### Environment Variables

Set these in Cloudflare Pages dashboard or Wrangler:

- `RESEND_API_KEY` - Your Resend API key
- `CONTACT_EMAIL` - Email address to receive form submissions

## Code Style

This project follows strict code conventions enforced by Biome:

- **Indentation**: 2 spaces
- **Line width**: 100 characters
- **Quotes**: Double quotes
- **Semicolons**: As needed (auto-formatted)
- **Imports**: Auto-organized

Run `bun run check` to format and lint the codebase.

## License

This project is private. All rights reserved.

## Author

**Samyak Kakatur** - [therealsamyak](https://github.com/therealsamyak)

## Links

- [Portfolio](https://skakatur.dev)
- [GitHub](https://github.com/therealsamyak)
- [LinkedIn](https://linkedin.com/in/samyakkakatur)
- [X/Twitter](https://x.com/skakatur_dev)
