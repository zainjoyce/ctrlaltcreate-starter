'use client'

import { useState } from 'react'
import { PlusIcon, DownloadIcon, SettingsIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'
import { toast } from 'sonner'

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const showToast = () => {
    toast.success('Component demo!', {
      description: 'This is a toast notification using Sonner.',
    })
  }

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Components' }]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>
                Component Showcase
              </h1>
              <p className='text-muted-foreground'>
                Explore all the pre-configured shadcn/ui components ready for
                your hackathon project.
              </p>
            </div>

            <Tabs defaultValue='buttons' className='w-full'>
              <TabsList className='grid w-full grid-cols-2 md:grid-cols-4 gap-1 mb-6'>
                <TabsTrigger value='buttons' className='text-xs md:text-sm'>Buttons & Actions</TabsTrigger>
                <TabsTrigger value='forms' className='text-xs md:text-sm'>Forms & Inputs</TabsTrigger>
                <TabsTrigger value='feedback' className='text-xs md:text-sm'>Feedback & Alerts</TabsTrigger>
                <TabsTrigger value='layout' className='text-xs md:text-sm'>Layout & Navigation</TabsTrigger>
              </TabsList>

              <TabsContent value='buttons' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>
                      Various button styles and states
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      <Button>Default</Button>
                      <Button variant='secondary'>Secondary</Button>
                      <Button variant='outline'>Outline</Button>
                      <Button variant='ghost'>Ghost</Button>
                      <Button variant='link'>Link</Button>
                      <Button variant='destructive'>Destructive</Button>
                    </div>
                    <Separator className='my-4' />
                    <div className='flex flex-wrap gap-2'>
                      <Button size='sm'>Small</Button>
                      <Button size='default'>Default</Button>
                      <Button size='lg'>Large</Button>
                      <Button size='icon'>
                        <PlusIcon className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>
                      Status indicators and labels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      <Badge>Default</Badge>
                      <Badge variant='secondary'>Secondary</Badge>
                      <Badge variant='outline'>Outline</Badge>
                      <Badge variant='destructive'>Destructive</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dropdown Menu</CardTitle>
                    <CardDescription>
                      Action menus and option selectors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline'>
                          <SettingsIcon className='h-4 w-4 mr-2' />
                          Options
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <DownloadIcon className='h-4 w-4 mr-2' />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant='destructive'>
                          <TrashIcon className='h-4 w-4 mr-2' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='forms' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Form Inputs</CardTitle>
                    <CardDescription>
                      Input fields, labels, and form controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='message'>Message</Label>
                      <Textarea
                        id='message'
                        placeholder='Type your message here...'
                        value={textareaValue}
                        onChange={e => setTextareaValue(e.target.value)}
                      />
                    </div>

                    <Button>Submit Form</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='feedback' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>
                      Important notifications and messages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <Alert>
                      <AlertTitle>Heads up!</AlertTitle>
                      <AlertDescription>
                        You can add components to your app using the cli.
                      </AlertDescription>
                    </Alert>

                    <Alert variant='destructive'>
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Your session has expired. Please log in again.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Toast Notifications</CardTitle>
                    <CardDescription>
                      Temporary notifications using Sonner
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={showToast}>Show Toast</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dialog</CardTitle>
                    <CardDescription>
                      Modal dialogs and confirmations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='outline'>Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant='outline'>Cancel</Button>
                          <Button>Continue</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='layout' className='space-y-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Cards</CardTitle>
                    <CardDescription>
                      Content containers with header, body, and footer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <Card>
                        <CardHeader>
                          <CardTitle>Card Title</CardTitle>
                          <CardDescription>
                            Card description goes here
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card content area with some example text.</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Another Card</CardTitle>
                          <CardDescription>
                            With different content
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            Each card can contain different types of content.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Separators</CardTitle>
                    <CardDescription>
                      Visual dividers for content sections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <p>Content above separator</p>
                      <Separator />
                      <p>Content below separator</p>
                      <div className='flex space-x-4'>
                        <p>Left content</p>
                        <Separator orientation='vertical' className='h-4' />
                        <p>Right content</p>
                      </div>
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
