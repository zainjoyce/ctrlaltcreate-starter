'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'
import { toast } from 'sonner'

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(30, { message: 'Username must not be longer than 30 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email({ message: 'Must be a valid email.' }),
  bio: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function FormsPage() {
  const [simpleForm, setSimpleForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  })

  function onSubmit(data: ProfileFormValues) {
    toast.success('Profile updated!', {
      description: `Welcome, ${data.username}! Your profile has been updated.`,
    })
    console.log(data)
  }

  const handleSimpleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Form submitted!', {
      description: `Thank you, ${simpleForm.name}! We'll get back to you soon.`,
    })
    setSimpleForm({ name: '', email: '', message: '' })
  }

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[{ title: 'Home', href: '/' }, { title: 'Forms' }]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>
                Form Examples
              </h1>
              <p className='text-muted-foreground'>
                Demonstration of form handling with validation, including
                react-hook-form and Zod.
              </p>
            </div>

            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Simple Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Simple Contact Form</CardTitle>
                  <CardDescription>
                    A basic form using controlled components and React state.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSimpleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='simple-name'>Name</Label>
                      <Input
                        id='simple-name'
                        placeholder='Your name'
                        value={simpleForm.name}
                        onChange={e =>
                          setSimpleForm(prev => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='simple-email'>Email</Label>
                      <Input
                        id='simple-email'
                        type='email'
                        placeholder='your@email.com'
                        value={simpleForm.email}
                        onChange={e =>
                          setSimpleForm(prev => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='simple-message'>Message</Label>
                      <Textarea
                        id='simple-message'
                        placeholder='Your message...'
                        value={simpleForm.message}
                        onChange={e =>
                          setSimpleForm(prev => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <Button type='submit' className='w-full'>
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Advanced Form with Validation */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Form with Validation</CardTitle>
                  <CardDescription>
                    Using react-hook-form with Zod schema validation for robust
                    form handling.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder='johndoe' {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='john@example.com'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              We&apos;ll use this email to contact you.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='bio'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Tell us a little bit about yourself'
                                className='resize-none'
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can write up to 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type='submit' className='w-full'>
                        Update Profile
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Form Features */}
            <Card>
              <CardHeader>
                <CardTitle>Form Features Included</CardTitle>
                <CardDescription>
                  This boilerplate comes with everything you need for
                  production-ready forms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Validation</h4>
                    <p className='text-sm text-muted-foreground'>
                      Zod schema validation with TypeScript support for
                      type-safe forms.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Error Handling</h4>
                    <p className='text-sm text-muted-foreground'>
                      Automatic error display with proper accessibility and
                      styling.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Form State</h4>
                    <p className='text-sm text-muted-foreground'>
                      React Hook Form for efficient form state management and
                      performance.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Accessibility</h4>
                    <p className='text-sm text-muted-foreground'>
                      ARIA labels, proper focus management, and keyboard
                      navigation.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Responsive</h4>
                    <p className='text-sm text-muted-foreground'>
                      Mobile-first design that works perfectly on all device
                      sizes.
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Toast Notifications</h4>
                    <p className='text-sm text-muted-foreground'>
                      Success and error feedback using the Sonner toast library.
                    </p>
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
