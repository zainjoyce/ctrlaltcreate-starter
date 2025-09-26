import {
  BookOpenIcon,
  ExternalLinkIcon,
  DatabaseIcon,
  KeyIcon,
  PaletteIcon,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'

export default function DocsPage() {
  const apiExamples = [
    {
      title: 'GET /api/users',
      description: 'Fetch all users',
      method: 'GET',
      code: `// app/api/users/route.ts
export async function GET() {
  const users = await db.user.findMany()
  return Response.json(users)
}`,
    },
    {
      title: 'POST /api/users',
      description: 'Create a new user',
      method: 'POST',
      code: `// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  const user = await db.user.create({ data: body })
  return Response.json(user)
}`,
    },
  ]

  const integrationGuides = [
    {
      icon: DatabaseIcon,
      title: 'Database Setup',
      description: 'PostgreSQL, MongoDB, or SQLite integration',
      technologies: ['Prisma', 'Drizzle', 'Mongoose'],
      code: `// Install Prisma
npm install prisma @prisma/client
npx prisma init

// Database URL in .env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"`,
    },
    {
      icon: KeyIcon,
      title: 'Authentication',
      description: 'User authentication and session management',
      technologies: ['NextAuth.js', 'Clerk', 'Auth0'],
      code: `// Install NextAuth.js
npm install next-auth
npm install @auth/prisma-adapter

// Configure in app/api/auth/[...nextauth]/route.ts`,
    },
    {
      icon: PaletteIcon,
      title: 'Styling Extensions',
      description: 'Additional UI libraries and animations',
      technologies: ['Framer Motion', 'React Spring', 'Lottie'],
      code: `// Add animations
npm install framer-motion

// Add icons
npm install @heroicons/react lucide-react`,
    },
  ]

  const deploymentOptions = [
    {
      platform: 'Vercel',
      description: 'Recommended for Next.js applications',
      features: ['Zero config', 'Automatic deployments', 'Edge functions'],
      link: 'https://vercel.com',
    },
    {
      platform: 'Netlify',
      description: 'Great for static sites and JAMstack',
      features: ['Form handling', 'Split testing', 'Analytics'],
      link: 'https://netlify.com',
    },
    {
      platform: 'Railway',
      description: 'Full-stack applications with databases',
      features: ['Database hosting', 'Environment variables', 'Monitoring'],
      link: 'https://railway.app',
    },
  ]

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Documentation' }]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <Badge variant='secondary' className='mb-4'>
                Documentation
              </Badge>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>
                Developer Guide
              </h1>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Complete documentation for extending and customizing your
                hackathon starter.
              </p>
            </div>

            <Tabs defaultValue='api' className='w-full'>
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='api'>API Routes</TabsTrigger>
                <TabsTrigger value='integrations'>Integrations</TabsTrigger>
                <TabsTrigger value='deployment'>Deployment</TabsTrigger>
                <TabsTrigger value='resources'>Resources</TabsTrigger>
              </TabsList>

              <TabsContent value='api' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>API Routes</CardTitle>
                    <CardDescription>
                      Examples of creating API endpoints in Next.js App Router
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-6'>
                      {apiExamples.map((example, index) => (
                        <div key={index} className='border rounded-lg p-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Badge
                              variant={
                                example.method === 'GET'
                                  ? 'secondary'
                                  : 'default'
                              }
                            >
                              {example.method}
                            </Badge>
                            <h4 className='font-medium'>{example.title}</h4>
                          </div>
                          <p className='text-sm text-muted-foreground mb-3'>
                            {example.description}
                          </p>
                          <pre className='bg-muted p-3 rounded text-sm overflow-x-auto'>
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>
                      Configure your application with environment variables
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className='bg-muted p-4 rounded-lg text-sm overflow-x-auto'>
                      {`# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# API Keys
OPENAI_API_KEY="sk-..."
STRIPE_SECRET_KEY="sk_test_..."`}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='integrations' className='space-y-6'>
                <div className='grid md:grid-cols-1 gap-6'>
                  {integrationGuides.map((guide, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className='flex items-center gap-3'>
                          <div className='bg-primary text-primary-foreground p-2 rounded-lg'>
                            <guide.icon className='h-5 w-5' />
                          </div>
                          <div>
                            <CardTitle>{guide.title}</CardTitle>
                            <CardDescription>
                              {guide.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-4'>
                          <div className='flex flex-wrap gap-2'>
                            {guide.technologies.map(tech => (
                              <Badge key={tech} variant='outline'>
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <pre className='bg-muted p-3 rounded text-sm overflow-x-auto'>
                            <code>{guide.code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='deployment' className='space-y-6'>
                <div className='grid md:grid-cols-1 gap-6'>
                  {deploymentOptions.map((option, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className='flex items-center justify-between'>
                          {option.platform}
                          <Button variant='outline' size='sm' asChild>
                            <a
                              href={option.link}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Deploy{' '}
                              <ExternalLinkIcon className='h-4 w-4 ml-1' />
                            </a>
                          </Button>
                        </CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2'>
                          {option.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className='flex items-center gap-2'
                            >
                              <div className='w-1.5 h-1.5 bg-primary rounded-full'></div>
                              <span className='text-sm'>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='resources' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>External Resources</CardTitle>
                    <CardDescription>
                      Helpful links and documentation for the technologies used
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid md:grid-cols-2 gap-4'>
                      {[
                        {
                          name: 'Next.js Documentation',
                          url: 'https://nextjs.org/docs',
                        },
                        {
                          name: 'shadcn/ui Components',
                          url: 'https://ui.shadcn.com',
                        },
                        {
                          name: 'Tailwind CSS',
                          url: 'https://tailwindcss.com/docs',
                        },
                        {
                          name: 'React Hook Form',
                          url: 'https://react-hook-form.com',
                        },
                        { name: 'Zod Validation', url: 'https://zod.dev' },
                        {
                          name: 'TypeScript Handbook',
                          url: 'https://www.typescriptlang.org/docs',
                        },
                        {
                          name: 'Vercel Platform',
                          url: 'https://vercel.com/docs',
                        },
                        { name: 'Lucide Icons', url: 'https://lucide.dev' },
                      ].map((resource, index) => (
                        <Button
                          key={index}
                          variant='outline'
                          asChild
                          className='justify-start'
                        >
                          <a
                            href={resource.url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <BookOpenIcon className='h-4 w-4 mr-2' />
                            {resource.name}
                            <ExternalLinkIcon className='h-3 w-3 ml-auto' />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Package Scripts</CardTitle>
                    <CardDescription>
                      Available npm scripts for development and deployment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      {[
                        {
                          script: 'npm run dev',
                          description: 'Start development server',
                        },
                        {
                          script: 'npm run build',
                          description: 'Build for production',
                        },
                        {
                          script: 'npm run start',
                          description: 'Start production server',
                        },
                        { script: 'npm run lint', description: 'Run ESLint' },
                        {
                          script: 'npm run lint:fix',
                          description: 'Fix ESLint errors',
                        },
                        {
                          script: 'npm run format',
                          description: 'Format code with Prettier',
                        },
                        {
                          script: 'npm run type-check',
                          description: 'Run TypeScript compiler',
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className='flex justify-between items-center p-3 border rounded'
                        >
                          <code className='text-sm font-mono'>
                            {item.script}
                          </code>
                          <span className='text-sm text-muted-foreground'>
                            {item.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
