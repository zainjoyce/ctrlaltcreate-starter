import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'

export default function StylingPage() {
  const colorPalette = [
    { name: 'Primary', value: 'bg-primary', text: 'text-primary-foreground' },
    {
      name: 'Secondary',
      value: 'bg-secondary',
      text: 'text-secondary-foreground',
    },
    { name: 'Accent', value: 'bg-accent', text: 'text-accent-foreground' },
    { name: 'Muted', value: 'bg-muted', text: 'text-muted-foreground' },
    {
      name: 'Destructive',
      value: 'bg-destructive',
      text: 'text-destructive-foreground',
    },
  ]

  const typographyExamples = [
    {
      element: 'h1',
      class: 'text-4xl font-bold tracking-tight',
      text: 'Heading 1',
    },
    {
      element: 'h2',
      class: 'text-3xl font-semibold tracking-tight',
      text: 'Heading 2',
    },
    {
      element: 'h3',
      class: 'text-2xl font-semibold tracking-tight',
      text: 'Heading 3',
    },
    {
      element: 'h4',
      class: 'text-xl font-semibold tracking-tight',
      text: 'Heading 4',
    },
    {
      element: 'p',
      class: 'text-base leading-7',
      text: 'Body text with comfortable line height for easy reading.',
    },
    {
      element: 'small',
      class: 'text-sm text-muted-foreground',
      text: 'Small text for secondary information',
    },
  ]

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Styling' }]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>
                Design System
              </h1>
              <p className='text-muted-foreground'>
                Explore the Tailwind CSS design tokens and typography system
                used throughout the starter.
              </p>
            </div>

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
                <CardDescription>
                  Semantic color tokens that adapt to light and dark themes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                  {colorPalette.map(color => (
                    <div key={color.name} className='space-y-2'>
                      <div
                        className={`${color.value} ${color.text} h-20 rounded-lg flex items-center justify-center font-medium`}
                      >
                        {color.name}
                      </div>
                      <div className='text-sm text-center'>
                        <code className='bg-muted px-2 py-1 rounded text-xs'>
                          {color.value}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Consistent text styles using Tailwind utility classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {typographyExamples.map((example, index) => (
                    <div key={index} className='space-y-2'>
                      <div className={example.class}>{example.text}</div>
                      <code className='text-xs bg-muted px-2 py-1 rounded'>
                        {example.class}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spacing */}
            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>
                  Consistent spacing using Tailwind&apos;s spacing scale
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[1, 2, 4, 6, 8, 12, 16, 20, 24].map(space => (
                    <div key={space} className='flex items-center gap-4'>
                      <div
                        className={`bg-primary h-4 rounded`}
                        style={{ width: `${space * 4}px` }}
                      ></div>
                      <code className='text-sm'>
                        p-{space} ({space * 4}px)
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Border Radius */}
            <Card>
              <CardHeader>
                <CardTitle>Border Radius</CardTitle>
                <CardDescription>
                  Consistent rounded corners throughout the design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {[
                    'rounded-none',
                    'rounded-sm',
                    'rounded-md',
                    'rounded-lg',
                    'rounded-xl',
                    'rounded-2xl',
                    'rounded-3xl',
                    'rounded-full',
                  ].map(radius => (
                    <div key={radius} className='text-center space-y-2'>
                      <div
                        className={`bg-primary h-16 w-16 mx-auto ${radius}`}
                      ></div>
                      <code className='text-xs bg-muted px-2 py-1 rounded'>
                        {radius}
                      </code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            <Card>
              <CardHeader>
                <CardTitle>Customization</CardTitle>
                <CardDescription>
                  How to customize the design system for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium mb-2'>Theme Colors</h4>
                    <p className='text-sm text-muted-foreground mb-2'>
                      Edit the CSS variables in{' '}
                      <code className='bg-muted px-1 rounded'>
                        app/globals.css
                      </code>
                      :
                    </p>
                    <pre className='bg-muted p-4 rounded-lg text-sm overflow-x-auto'>
                      {`:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* Add your custom colors */
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className='font-medium mb-2'>Adding New Components</h4>
                    <p className='text-sm text-muted-foreground mb-2'>
                      Use the shadcn/ui CLI to add more components:
                    </p>
                    <code className='bg-muted px-2 py-1 rounded text-sm'>
                      npx shadcn@latest add [component-name]
                    </code>
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
