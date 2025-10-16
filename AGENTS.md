# Agent Guidelines for sk-personal-website

## Commands
- **Build**: `bun run build` (Next.js production build)
- **Dev**: `bun run dev` (Next.js development server)
- **Lint**: `bun run lint` (Biome check and fix)
- **Deploy**: `bun run deploy` (Cloudflare via OpenNext.js)
- **Preview**: `bun run preview` (Local Cloudflare preview)

## Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Deployment**: Cloudflare Pages via OpenNext.js
- **Language**: TypeScript with strict mode
- **State**: React hooks with react-hook-form + Zod validation

## Code Style
- **Formatter**: Biome (2 spaces, 100 line width, double quotes, semicolons as needed)
- **Imports**: Path aliases (@/ for app/, organizeImports enabled)
- **Components**: PascalCase, functional with hooks
- **Types**: Strict TypeScript, prefer interfaces over types
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error Handling**: Try/catch with typed errors, no console.error in production

## Important Notes
- **NEVER COMMIT TO GITHUB**: Agents must never commit changes to this repository for any reason. All changes should be made locally only.
