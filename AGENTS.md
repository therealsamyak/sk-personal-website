# Agent Guidelines for sk-personal-website

## Build Commands

```bash
bun run build          # Production build
bun run dev            # Dev server (localhost:3000)
bun run check          # Run Biome linter with auto-fix
bun run start          # Start production server
```

**No test suite configured** - manual testing required.

## Code Style Guidelines

### Imports & Aliases
- **Path aliases**: Use `@/` prefix for all internal imports
  - `@/components/*` → `app/components/*`
  - `@/lib/*` → `app/lib/*`
  - `@/hooks/*` → `app/hooks/*`
  - `@/ui/*` → `app/components/ui/*`
- **"use client"** at top of client components (line 1)
- **Named exports** preferred over default
- **Order**: Third-party → internal → types
  ```typescript
  import { useState } from "react"
  import { Button } from "@/components/ui/button"
  import type { Project } from "@/config/projects"
  ```

### Formatting (Biome)
- **Indentation**: 2 spaces (no tabs)
- **Line width**: 100 characters
- **Quotes**: Double quotes (`"string"`)
- **Semicolons**: As needed (Biome adds/removes automatically)
- **Auto-organize imports**: Enabled (runs on `bun run check`)

### TypeScript & Types
- **Strict mode**: Enabled - never suppress with `@ts-ignore` or `as any`
- **Interfaces**: Use for object shapes, exported types
  ```typescript
  export interface ContactFormData { name: string; email: string }
  export type ClientContactFormData = z.infer<typeof clientContactFormSchema>
  ```
- **Zod schemas**: Use for runtime validation
  ```typescript
  export const clientContactFormSchema = z.object({ ... })
  export type ClientContactFormData = z.infer<typeof clientContactFormSchema>
  ```
- **Type inference**: Preferred over explicit typing when obvious
- **Props**: Extend Radix/HTML element props where applicable
  ```typescript
  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { ... }
  ```

### Naming Conventions
- **Components**: PascalCase (`ContactForm.tsx`, `export const ContactForm`)
- **Functions/hooks**: camelCase (`useMobile`, `sendContactEmails`)
- **Files/folders**: kebab-case (`about-section/`, `contact-form.tsx`)
- **Constants**: camelCase (`personalInfo`, `navigation`)
- **Type prefixes**: `ClientContactFormData`, `ValidationResult`
- **Schema suffixes**: `clientContactFormSchema`, `serverContactFormSchema`

### Component Patterns
- **Structure**: Co-located with `index.tsx` barrel export
  ```
  components/ContactForm/
    ContactForm.tsx  # Main component
    index.tsx        # Export: { ContactForm }
  ```
- **Props**: Define interfaces explicitly
- **UI components**: Use shadcn/ui + Radix primitives
  ```typescript
  import { Button } from "@/components/ui/button"
  import { Dialog } from "@/components/ui/dialog"
  ```
- **Styling**: Tailwind + `cn()` utility for conditional classes
  ```typescript
  import { cn } from "@/lib/utils"
  <div className={cn("base-classes", isActive && "active-classes")} />
  ```
- **Forward refs**: Use for composables (Button, Input, etc.)
  ```typescript
  const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({...}, ref) => {...})
  Button.displayName = "Button"
  ```
- **Client vs Server**: Use `"use client"` for hooks, state, interactivity

### Error Handling
- **API responses**: Consistent structure
  ```typescript
  interface ApiResponse {
    success: boolean
    message: string
    errors?: Record<string, string[]> | null
  }
  ```
- **Try/catch**: Always return typed error objects
  ```typescript
  try {
    const result = await apiCall()
    return { success: true, data: result }
  } catch (error) {
    console.error("Operation failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
  ```
- **Environment validation**: Check before using env vars
  ```typescript
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set")
  }
  ```
- **Validation**: Zod schemas for both client and server
  ```typescript
  // Client
  clientContactFormSchema.parse(data)
  // Server
  const validation = validateContactForm(body)
  if (!validation.success) { return NextResponse.json({ errors: validation.errors }, { status: 400 }) }
  ```

### Utility & API Patterns
- **Tailwind helper**: Always use `cn()` for conditional classes
  ```typescript
  import { cn } from "@/lib/utils"
  ```
- **API routes**: Use `NextResponse` with proper status codes
  ```typescript
  import { NextRequest, NextResponse } from "next/server"
  export const POST = async (request: NextRequest): Promise<NextResponse<ApiResponse>> => { ... }
  ```
- **Content-Type**: Validate before parsing JSON
  ```typescript
  const contentType = request.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    return NextResponse.json({ message: "Invalid content-type" }, { status: 400 })
  }
  ```
- **Sanitization**: Strip control characters before processing
  ```typescript
  export const sanitizeInput = (input: string): string =>
    input.trim().replace(/[\x00-\x1F\x7F]/g, "")
  ```
- **Email service**: Dual emails (user confirmation + admin notification) via Resend

### File Organization
```
app/
├── components/          # React components
│   ├── ui/             # shadcn/ui base components (don't modify lightly)
│   ├── FeatureName/    # Feature components with index.tsx
├── config/             # Static data (site.ts, projects.ts, tech-stack.ts)
├── hooks/              # Custom React hooks
├── lib/                # Utilities (utils.ts, email.ts, validation.ts)
├── api/                # API routes (app/api/*/route.ts)
└── pages/              # Next.js pages (page.tsx)
```

### Git & Hooks
- **Pre-commit**: Runs `bun run` on staged files (lefthook)
- **Never commit**: `node_modules`, `.env`, build artifacts

### Tech Stack Notes
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI + shadcn/ui
- **Validation**: Zod
- **Email**: Resend
- **Deployment**: Cloudflare via @opennextjs/cloudflare
- **Package manager**: Bun (use `bun run`, `bun install`)
