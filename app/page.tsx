import { RocketIcon, ComponentIcon, PaletteIcon, ZapIcon, ClockIcon, BlocksIcon, ShieldCheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'

export default function HomePage() {
  const features = [
    {
      title: 'Next.js 15',
      description:
        'Latest version with App Router, React 19, and optimized performance',
      icon: RocketIcon,
      color: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'shadcn/ui',
      description: '19+ pre-configured components ready for rapid development',
      icon: ComponentIcon,
      color: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Tailwind CSS',
      description: 'Utility-first CSS with custom design tokens and dark mode',
      icon: PaletteIcon,
      color: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Developer Tools',
      description: 'ESLint, Prettier, TypeScript strict mode, and more',
      icon: ZapIcon,
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
  ]

  const quickStats = [
    { label: 'Setup Time', value: '< 2 min', icon: ClockIcon, color: 'text-blue-500' },
    { label: 'Components', value: '19+', icon: BlocksIcon, color: 'text-green-500' },
    { label: 'Bundle Size', value: 'Optimized', icon: ZapIcon, color: 'text-yellow-500' },
    { label: 'TypeScript', value: 'Strict', icon: ShieldCheckIcon, color: 'text-purple-500' },
  ]

  return (
    <SidebarInset>
      <MainNav title='Dashboard' />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8'>
            {/* Hero Section */}
            <div className='text-center mb-12'>
              <Badge variant='secondary' className='mb-4'>
                CTRL+ALT+CREATE Starter
              </Badge>
              <h1 className='text-4xl font-bold tracking-tight mb-4'>
                Ready, Set, Build!
              </h1>
              <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
                A production-ready Next.js 15 boilerplate designed for
                hackathons and rapid prototyping. Get from idea to deployed app
                in minutes, not hours.
              </p>
              <div className='flex gap-4 justify-center'>
                <Button size='lg' asChild>
                  <Link href='/getting-started'>
                    <RocketIcon className='w-4 h-4 mr-2' />
                    Start Building
                  </Link>
                </Button>
                <Button variant='outline' size='lg' asChild>
                  <Link href='/docs'>View Docs</Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
              {quickStats.map((stat, index) => (
                <Card key={index} className='relative overflow-hidden'>
                  <CardContent className='p-4 text-center'>
                    <div className={`mb-2 flex justify-center ${stat.color}`}>
                      <stat.icon className='w-6 h-6' />
                    </div>
                    <div className='text-2xl font-bold'>{stat.value}</div>
                    <div className='text-sm text-muted-foreground'>
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Grid */}
            <div className='grid md:grid-cols-2 gap-6 mb-12'>
              {features.map((feature, index) => (
                <Card key={index} className={`${feature.color} border-0`}>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>
                  Get up and running in less than 2 minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-start gap-3'>
                    <Badge variant='outline' className='min-w-6 h-6'>
                      1
                    </Badge>
                    <div className='flex-1 min-w-0'>
                      <div className='font-medium'>Clone & Install</div>
                      <div className='bg-muted px-2 py-1 rounded overflow-x-auto'>
                        <code className='text-sm whitespace-nowrap'>
                          git clone https://github.com/zainjoyce/ctrlaltcreate-starter.git
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Badge variant='outline' className='min-w-6 h-6'>
                      2
                    </Badge>
                    <div>
                      <div className='font-medium'>Start Development</div>
                      <code className='text-sm bg-muted px-2 py-1 rounded'>
                        npm run dev
                      </code>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <Badge variant='outline' className='min-w-6 h-6'>
                      3
                    </Badge>
                    <div>
                      <div className='font-medium'>Start Building</div>
                      <p className='text-sm text-muted-foreground'>
                        Everything is configured and ready to go!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
