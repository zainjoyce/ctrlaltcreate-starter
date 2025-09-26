'use client'

import * as React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface MainNavProps {
  title?: string
  breadcrumbs?: Array<{
    title: string
    href?: string
  }>
}

export function MainNav({ title, breadcrumbs }: MainNavProps) {
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.title}>
              <BreadcrumbItem className='hidden md:block'>
                {breadcrumb.href ? (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.title}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator className='hidden md:block' />
              )}
            </React.Fragment>
          ))}
          {title && !breadcrumbs && (
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
