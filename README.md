# CTRL+ALT+CREATE Starter

A production-ready Next.js 15 boilerplate designed for hackathons and rapid prototyping. Get from idea to deployed app in minutes, not hours.

Built for [CTRL+ALT+CREATE Live Seattle](https://ctrlaltcreate.live/) - the creative coding event where ideas come to life.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)](https://ui.shadcn.com/)
[![CTRL+ALT+CREATE](https://img.shields.io/badge/Event-CTRL+ALT+CREATE-purple)](https://ctrlaltcreate.live/)

## Features

### **Modern Stack**

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode for type safety
- **Tailwind CSS 4** with custom design tokens
- **shadcn/ui** components library (19 pre-configured components)

### **UI Components**

- Pre-configured responsive layout with sidebar navigation
- Dark/light mode with system preference detection
- 19 shadcn/ui components ready to use
- Custom theme with CSS variables for easy customization
- 5 example pages showcasing components and features

### **Developer Experience**

- **ESLint** and **Prettier** configured
- **React Hook Form** with **Zod** validation
- Hot reload optimized for fast development
- VS Code settings and recommended extensions

### **API Routes**

- **Health Check** - Verify API availability
- **Supabase Integration** - Full CRUD operations with database
- **Email Sending** - Transactional emails via Resend
- Pre-built templates and examples

### **Production Ready**

- One-click deployment to Vercel
- SEO optimized with metadata API
- Responsive design (mobile-first)
- Accessibility features built-in

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/zainjoyce/ctrlaltcreate-starter.git
   cd ctrlaltcreate-starter
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

**That's it! You're ready to start building.**

## Project Structure

```
ctrlaltcreate-starter/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── data/         # Supabase CRUD operations
│   │   ├── email/        # Email sending with Resend
│   │   └── health/       # Health check endpoint
│   ├── components/        # Component showcase page
│   ├── docs/             # Documentation page
│   ├── forms/            # Form examples page
│   ├── getting-started/  # Setup guide page
│   ├── settings/         # Settings page
│   ├── styling/          # Design system page
│   ├── favicon.ico       # App favicon
│   ├── globals.css       # Global styles & theme
│   └── layout.tsx        # Root layout with providers
├── components/            # Shared React components
│   ├── layout/           # Layout components (nav, sidebar)
│   └── ui/               # shadcn/ui components (19+ components)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client utilities
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── docs/                 # Documentation files
├── components.json       # shadcn/ui configuration
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## Available Pages

### Example Pages

- **Homepage** (`/`) - Landing page with features overview
- **Getting Started** (`/getting-started`) - Step-by-step setup guide
- **Components** (`/components`) - Interactive component showcase
- **Forms** (`/forms`) - Form examples with validation
- **Styling** (`/styling`) - Design system and theme documentation
- **Settings** (`/settings`) - Settings page example
- **Documentation** (`/docs`) - Comprehensive developer guide

## Available Components

### Form Components

- **Button** - Multiple variants and sizes
- **Input** - Text inputs with validation
- **Textarea** - Multi-line text input
- **Label** - Form labels with accessibility
- **Form** - React Hook Form integration

### Layout Components

- **Card** - Content containers
- **Sidebar** - Collapsible navigation
- **Separator** - Visual dividers
- **Badge** - Status indicators

### Feedback Components

- **Alert** - Important notifications
- **Toast** - Temporary notifications (Sonner)
- **Dialog** - Modal dialogs
- **Dropdown Menu** - Action menus

### Navigation Components

- **Breadcrumb** - Page navigation
- **Navigation Menu** - Main navigation
- **Tabs** - Content switching

## Usage Examples

### Creating a Form with Validation

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
})

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', name: '' },
  })

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Your name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
```

### Using the Layout System

```tsx
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'

export default function MyPage() {
  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Current Page' }]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        {/* Your page content */}
      </div>
    </SidebarInset>
  )
}
```

## Customization

### Theme Colors

Edit `app/globals.css` to customize the color palette:

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* Add your custom colors */
}
```

### Adding New Components

Use the shadcn/ui CLI to add more components:

```bash
npx shadcn@latest add [component-name]
```

## API Routes

This starter includes pre-configured API routes for common hackathon needs. All routes include TypeScript types, validation, and comprehensive error handling.

### Health Check - `/api/health`

Simple endpoint for verifying API availability and debugging.

```bash
# Check API status
GET http://localhost:3000/api/health
```

### Data Operations - `/api/data`

Full CRUD operations with Supabase. Perfect for storing user data, posts, or any database records.

**Setup:**
1. Create a [Supabase](https://supabase.com) project (free tier available)
2. Add credentials to `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Create tables in Supabase dashboard

**Usage:**
```bash
# Fetch all records
GET /api/data

# Create new record
POST /api/data
Body: { "title": "My Post", "content": "Hello", "user_id": "..." }

# Update record
PUT /api/data
Body: { "id": "...", "title": "Updated" }

# Delete record
DELETE /api/data
Body: { "id": "..." }
```

### Email Sending - `/api/email/send`

Send transactional emails with pre-built templates. Great for welcome emails, notifications, and alerts.

**Setup:**
1. Sign up for [Resend](https://resend.com) (free tier: 3,000 emails/month)
2. Get your API key from dashboard
3. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_api_key
   RESEND_FROM_EMAIL=onboarding@resend.dev  # Use resend.dev for testing
   ```

**Built-in Templates:**
- `welcome` - Welcome new users
- `notification` - General notifications
- `reset-password` - Password reset links
- `custom` - Your own HTML

**Usage:**
```bash
# Send welcome email
POST /api/email/send
Body: {
  "to": "user@example.com",
  "subject": "Welcome!",
  "template": "welcome",
  "data": { "name": "John", "url": "https://yourapp.com" }
}

# Check configuration
GET /api/email/send
```

For more details, see the inline documentation in each route file or visit the `/docs` page in your running app.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/zainjoyce/ctrlaltcreate-starter)

### Other Platforms

- **Netlify**: Drag and drop your `out` folder after running `npm run build`
- **Railway**: Connect your GitHub repository
- **Digital Ocean**: Use App Platform with auto-deploy

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript compiler
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

## Contact

**Zain Joyce** - [@zainjoyce](https://github.com/zainjoyce)

Project Link: [https://github.com/zainjoyce/ctrlaltcreate-starter](https://github.com/zainjoyce/ctrlaltcreate-starter)

---

**Happy Building! 🛠️**
