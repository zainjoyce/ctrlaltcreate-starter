import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CTRL+ALT+CREATE Starter',
  description:
    'A modern Next.js 15 boilerplate for rapid prototyping and hackathons',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  authors: [{ name: 'Zain Joyce', url: 'https://github.com/zainjoyce' }],
  creator: 'Zain Joyce',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/zainjoyce/ctrlaltcreate-starter',
    title: 'CTRL+ALT+CREATE Starter',
    description:
      'A modern Next.js 15 boilerplate for rapid prototyping and hackathons',
    siteName: 'CTRL+ALT+CREATE Starter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CTRL+ALT+CREATE Starter',
    description:
      'A modern Next.js 15 boilerplate for rapid prototyping and hackathons',
    creator: '@zainjoyce',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
