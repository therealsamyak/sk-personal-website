# Personal Website - Project Structure & Guidelines

## Project Overview
A modern, responsive personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. Features a clean, modular architecture following FAANG best practices.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Language**: TypeScript
- **Linting**: Biome
- **Package Manager**: Bun
- **Deployment**: Vercel

## Architecture & Component Structure

### Component Organization
All components follow a strict folder-based structure:
```
app/components/ComponentName/
├── ComponentName.tsx    # Main component implementation
└── index.tsx        # Re-export using `export * from "./component"`
```

### Component Naming Conventions
- **Export Pattern**: Named exports only (`export const ComponentName = () => { ... }`)
- **Import Pattern**: Named imports (`import { ComponentName } from "@/components/ComponentName"`)
- **Function Style**: Arrow functions exclusively
- **Folder Structure**: Each component gets its own folder with `ComponentName.tsx` and `index.tsx`

### Current Component Structure
```
app/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── index.tsx
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   └── index.tsx
│   ├── etc.../
│   │
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── index.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/ (shadcn/ui components)
├── config/
│   ├── projects.ts      # Project data configuration
│   ├── tech-stack.ts    # Technology skills configuration
│   └── site.ts          # Site-wide configuration
├── api/
│   └── contact/
│       └── route.ts
├── hooks/
├── lib/
├── globals.css
├── layout.tsx
└── page.tsx
```

## Configuration System

### Site Configuration (`app/config/site.ts`)
Central configuration for personal information, navigation, and social links:
- Personal info (name, title, description, email)
- Optional profile image support
- Social media links with icons
- Navigation menu items

### Projects Configuration (`app/config/projects.ts`)
All project data is externalized from components:
- Project interface with title, description, image, link, tags
- Easy to add/remove/modify projects without touching components
- Supports image URLs and GitHub links

### Tech Stack Configuration (`app/config/tech-stack.ts`)
Technology skills organized by category:
- Frontend, Backend, DevOps, Tools categories
- Easy to update skills without component changes
- Supports custom categories

## Development Guidelines

### Code Style
- **Functions**: Arrow functions only (`const Component = () => { ... }`)
- **Exports**: Named exports (`export const Component`)
- **Imports**: Named imports (`import { Component }`)
- **TypeScript**: Strict typing with interfaces
- **Formatting**: Handled by Biome

### Component Best Practices
1. **Single Responsibility**: Each component has one clear purpose
2. **Configuration-Driven**: Data comes from config files, not hardcoded
3. **Type Safety**: All props and data structures are typed
4. **Accessibility**: Proper ARIA labels and semantic HTML
5. **Performance**: Optimized images with Next.js Image component

### Image Handling
- Use Next.js `Image` component for all images
- Support for optional images (profile image in hero section)
- Placeholder images provided by default
- Proper alt text and accessibility

### State Management
- Local state with React hooks for forms
- Configuration-based data (no complex state management needed)
- Server actions for API calls (contact form)

## File Organization Rules

### Component Files
- `ComponentName.tsx`: Contains the actual component implementation
- `index.tsx`: Contains `export * from "./ComponentName"` only
- No default exports anywhere

### Config Files
- All configuration in `app/config/` directory
- Typed interfaces for all config data
- Easy to modify without touching components

### Styling
- Tailwind CSS classes only
- Responsive design with mobile-first approach
- Dark mode support via theme provider
- shadcn/ui components for consistent design system

## Development Workflow

### Adding New Components
1. Create folder: `app/components/NewComponent/`
2. Create `NewComponent.tsx` with named export
3. Create `index.tsx` with `export * from "./NewComponent"`
4. Import using named import: `import { NewComponent }`

### Modifying Content
- **Projects**: Edit `app/config/projects.ts`
- **Tech Stack**: Edit `app/config/tech-stack.ts`
- **Personal Info**: Edit `app/config/site.ts`
- **Styling**: Modify Tailwind classes in components

### Quality Assurance
1. `bun lint` - Run linting and auto-fix issues
2. `bun run build` - Ensure build passes
3. Fix any errors before committing

## API Endpoints

### Contact Form (`/api/contact`)
- POST endpoint for contact form submissions
- Input validation and sanitization
- Email sending functionality
- Proper error handling and responses

## Deployment
- Configured for Vercel deployment
- Static generation for optimal performance
- Environment variables for email configuration

## Future Considerations
- Blog section can be added following same component structure
- Portfolio items can be enhanced with more detailed project pages
- Analytics can be integrated through configuration
- CMS integration possible through config file approach

This architecture ensures maintainability, scalability, and follows modern React/Next.js best practices while keeping the codebase clean and organized.
