import { CheckIcon, RocketIcon, CodeIcon, PlayIcon, ServerIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'

export default function GettingStartedPage() {
  const quickSteps = [
    {
      icon: CodeIcon,
      title: 'Clone & Install',
      description: 'Get the starter code and install dependencies',
      code: 'git clone https://github.com/zainjoyce/ctrlaltcreate-starter.git\ncd ctrlaltcreate-starter\nnpm install',
      time: '30 seconds'
    },
    {
      icon: PlayIcon,
      title: 'Start Development',
      description: 'Launch the development server',
      code: 'npm run dev',
      time: '10 seconds'
    },
    {
      icon: ServerIcon,
      title: 'Test API Routes',
      description: 'Try the pre-built API endpoints',
      code: 'curl http://localhost:3000/api/health',
      time: '30 seconds'
    },
    {
      icon: RocketIcon,
      title: 'Deploy',
      description: 'Push to GitHub and deploy to Vercel',
      code: 'git push origin main\n# Connect to Vercel for auto-deploy',
      time: '2 minutes'
    }
  ]

  const features = [
    'Next.js 15 with App Router',
    'TypeScript with strict mode',
    'Tailwind CSS 4 with design tokens',
    '19+ shadcn/ui components',
    'React Hook Form + Zod validation',
    'Supabase integration with CRUD API',
    'Resend email with templates',
    'ESLint + Prettier configured',
    'Dark/light mode support',
    'Responsive sidebar layout',
    'Pre-built API routes',
    'One-click Vercel deployment'
  ]

  const nextSteps = [
    {
      title: 'Configure Supabase (Optional)',
      description: 'Set up your Supabase project for database and auth',
      code: 'Copy .env.example to .env.local and add your Supabase keys',
      link: '/docs'
    },
    {
      title: 'Set Up Email Sending (Optional)',
      description: 'Configure Resend for transactional emails',
      code: 'Add RESEND_API_KEY to .env.local',
      link: '/docs'
    },
    {
      title: 'Customize Your Theme',
      description: 'Edit colors and design tokens in app/globals.css',
      link: '/styling'
    },
    {
      title: 'Add More Components',
      description: 'Use shadcn/ui CLI to add additional components',
      code: 'npx shadcn@latest add [component-name]'
    }
  ]

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Getting Started' }
        ]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <Badge variant='secondary' className='mb-4'>
                Quick Setup Guide
              </Badge>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>Getting Started</h1>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Get your hackathon project up and running in under 2 minutes.
                This guide will take you from clone to deployed app.
              </p>
            </div>

            {/* Quick Setup Steps */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
              {quickSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className='flex items-center gap-3'>
                      <div className='bg-primary text-primary-foreground p-2 rounded-lg flex-shrink-0'>
                        <step.icon className='h-5 w-5' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <CardTitle className='text-lg'>{step.title}</CardTitle>
                        <Badge variant='outline' className='text-xs'>
                          ~{step.time}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='bg-muted p-3 rounded-lg overflow-x-auto'>
                      <code className='text-sm whitespace-pre-wrap break-words'>{step.code}</code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What&apos;s Included</CardTitle>
                <CardDescription>
                  Everything you need for a modern web application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 gap-4'>
                  {features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <CheckIcon className='h-4 w-4 text-green-500' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Project Structure</CardTitle>
                <CardDescription>
                  Understanding the folder organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className='bg-muted p-4 rounded-lg text-sm overflow-x-auto'>
{`ctrlaltcreate-starter/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (NEW!)
│   │   ├── data/         # Supabase CRUD operations
│   │   ├── email/        # Email sending with Resend
│   │   └── health/       # Health check endpoint
│   ├── components/        # Component showcase
│   ├── docs/             # Documentation
│   ├── forms/            # Form examples
│   ├── styling/          # Design system
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # shadcn/ui components (19+)
│   └── layout/           # Layout components
├── lib/
│   ├── supabase.ts       # Supabase utilities (NEW!)
│   └── utils.ts          # Helper functions
├── hooks/                # Custom React hooks
└── public/               # Static assets`}
                </pre>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  Customize the starter for your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {nextSteps.map((step, index) => (
                    <div key={index} className='border rounded-lg p-4'>
                      <h4 className='font-medium mb-1'>{step.title}</h4>
                      <p className='text-sm text-muted-foreground mb-2'>{step.description}</p>
                      {step.code && (
                        <code className='bg-muted px-2 py-1 rounded text-xs'>
                          {step.code}
                        </code>
                      )}
                      {step.link && (
                        <Button variant='outline' size='sm' asChild className='mt-2'>
                          <a href={step.link}>Learn More</a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Routes Highlight */}
            <Alert className='bg-blue-500/10 border-blue-500/20'>
              <ServerIcon className='h-4 w-4 text-blue-500' />
              <AlertTitle>API Routes Ready!</AlertTitle>
              <AlertDescription>
                This starter now includes pre-built API routes for Supabase and Resend.
                Visit the <a href='/docs' className='underline font-medium'>Documentation</a> page
                to see usage examples and setup instructions.
              </AlertDescription>
            </Alert>

            {/* Help & Resources */}
            <Alert>
              <RocketIcon className='h-4 w-4' />
              <AlertTitle>Ready to Build!</AlertTitle>
              <AlertDescription>
                You now have everything you need to start building your hackathon project.
                Explore the <a href='/components' className='underline'>Components</a>,{' '}
                <a href='/forms' className='underline'>Forms</a>, and{' '}
                <a href='/docs' className='underline'>API Routes</a> pages to see what&apos;s available.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}