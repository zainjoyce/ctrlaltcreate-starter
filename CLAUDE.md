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

## API Routes

This starter includes pre-configured API routes for common hackathon needs:

### Health Check - `/api/health`
Simple endpoint for verifying API availability and debugging.

**Usage:**
```bash
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### Data Operations - `/api/data`
Full CRUD operations with Supabase integration. Includes validation, error handling, and pagination.

**Setup:**
1. Configure Supabase environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
2. Create your database tables in Supabase dashboard
3. Update type definitions in `lib/supabase.ts`

**Usage:**
```bash
# Fetch all posts (with pagination)
GET /api/data?limit=10&offset=0

# Fetch specific post
GET /api/data?id=uuid

# Create new post
POST /api/data
Body: { "title": "My Post", "content": "Hello", "user_id": "uuid" }

# Update post
PUT /api/data
Body: { "id": "uuid", "title": "Updated Title" }

# Delete post
DELETE /api/data
Body: { "id": "uuid" }
```

### Email Sending - `/api/email/send`
Transactional email sending with Resend. Includes pre-built templates for common use cases.

**Setup:**
1. Sign up at [resend.com](https://resend.com) and get API key
2. Configure environment variables in `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_api_key
   RESEND_FROM_EMAIL=noreply@yourdomain.com  # or onboarding@resend.dev for testing
   ```

**Usage:**
```bash
# Send welcome email
POST /api/email/send
Body: {
  "to": "user@example.com",
  "subject": "Welcome!",
  "template": "welcome",
  "data": { "name": "John", "url": "https://example.com" }
}

# Send notification
POST /api/email/send
Body: {
  "to": "user@example.com",
  "subject": "New Notification",
  "template": "notification",
  "data": { "title": "Alert", "message": "Something happened" }
}

# Send custom HTML
POST /api/email/send
Body: {
  "to": "user@example.com",
  "subject": "Custom Email",
  "template": "custom",
  "html": "<h1>Hello</h1><p>Custom content</p>"
}

# Check configuration
GET /api/email/send
```

**Available Templates:**
- `welcome` - Welcome new users with call-to-action
- `notification` - General notifications with optional action button
- `reset-password` - Password reset with secure link
- `custom` - Provide your own HTML

### Utilities - `lib/supabase.ts`
Helper functions for Supabase client creation:
- `createServerSupabaseClient()` - Server-side client with service role key (bypasses RLS)
- `createClientSupabaseClient()` - Client-side client with anonymous key (respects RLS)
- `handleSupabaseError()` - Consistent error handling
- Database type definitions for type-safe queries