# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript compiler without emitting files
```

## Project Architecture

This is a **Next.js 15 boilerplate** built for rapid prototyping and hackathons with the following key architectural patterns:

### Core Stack
- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library (16+ pre-built components)

### Layout System
- **Sidebar-based layout** using `SidebarProvider` and `AppSidebar` components
- **Theme system** with dark/light mode support via `next-themes`
- **Global providers** configured in `app/layout.tsx` including theme and sidebar providers
- **Toast notifications** using Sonner library

### Component Organization
- **UI Components**: Located in `components/ui/` - all shadcn/ui components
- **Layout Components**: Located in `components/layout/` - app-specific layout components
- **Page Components**: App Router pages in `app/` directory

### Form Handling
- **React Hook Form** with **Zod validation** for type-safe form handling
- Pre-configured form components with validation support

### Styling Approach
- **Tailwind CSS 4** with custom design tokens in `app/globals.css`
- **CSS Variables** for theme customization
- **Utility function** in `lib/utils.ts` for conditional class merging (`cn`)

### Key Files
- `app/layout.tsx` - Root layout with all providers
- `components/layout/app-sidebar.tsx` - Main navigation sidebar
- `components/layout/main-nav.tsx` - Breadcrumb navigation
- `lib/utils.ts` - Utility functions including `cn` for class merging
- `app/globals.css` - Global styles and CSS custom properties

### Development Patterns
- Uses `@/` path alias for imports (configured in `tsconfig.json`)
- ESLint configured with Next.js and TypeScript rules
- Prettier for consistent code formatting
- Strict TypeScript configuration for type safety