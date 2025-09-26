'use client'

import { useState } from 'react'
import { MoonIcon, SunIcon, MonitorIcon, BellIcon, UserIcon, ShieldIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SidebarInset } from '@/components/ui/sidebar'
import { MainNav } from '@/components/layout/main-nav'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState({
    name: 'Hackathon Participant',
    email: 'participant@ctrlaltcreate.live',
    bio: 'Building amazing things at CTRL+ALT+CREATE!'
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true
  })

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!')
  }

  const themeOptions = [
    { value: 'light', label: 'Light', icon: SunIcon, description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', icon: MoonIcon, description: 'Easy on the eyes' },
    { value: 'system', label: 'System', icon: MonitorIcon, description: 'Follow system preference' }
  ]

  return (
    <SidebarInset>
      <MainNav
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Settings' }
        ]}
      />
      <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
        <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
          <div className='container mx-auto px-4 py-8 space-y-8'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold tracking-tight mb-2'>Settings</h1>
              <p className='text-muted-foreground'>
                Customize your hackathon starter experience
              </p>
            </div>

            <div className='grid lg:grid-cols-2 gap-8'>
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <UserIcon className='h-5 w-5' />
                    Profile
                  </CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      id='name'
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='bio'>Bio</Label>
                    <Textarea
                      id='bio'
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className='w-full'>
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <SunIcon className='h-5 w-5' />
                    Appearance
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred theme and appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    {themeOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          theme === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        <div className='flex items-center gap-3'>
                          <option.icon className='h-5 w-5' />
                          <div className='flex-1'>
                            <div className='flex items-center gap-2'>
                              <span className='font-medium'>{option.label}</span>
                              {theme === option.value && (
                                <Badge variant='secondary' className='text-xs'>Active</Badge>
                              )}
                            </div>
                            <p className='text-sm text-muted-foreground mt-1'>
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <BellIcon className='h-5 w-5' />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive updates and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <Label htmlFor='email-notifications'>Email Notifications</Label>
                        <p className='text-sm text-muted-foreground'>
                          Receive updates via email
                        </p>
                      </div>
                      <Button
                        variant={notifications.email ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                      >
                        {notifications.email ? 'On' : 'Off'}
                      </Button>
                    </div>

                    <Separator />

                    <div className='flex items-center justify-between'>
                      <div>
                        <Label htmlFor='push-notifications'>Push Notifications</Label>
                        <p className='text-sm text-muted-foreground'>
                          Receive browser notifications
                        </p>
                      </div>
                      <Button
                        variant={notifications.push ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                      >
                        {notifications.push ? 'On' : 'Off'}
                      </Button>
                    </div>

                    <Separator />

                    <div className='flex items-center justify-between'>
                      <div>
                        <Label htmlFor='update-notifications'>Product Updates</Label>
                        <p className='text-sm text-muted-foreground'>
                          Get notified about new features
                        </p>
                      </div>
                      <Button
                        variant={notifications.updates ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setNotifications(prev => ({ ...prev, updates: !prev.updates }))}
                      >
                        {notifications.updates ? 'On' : 'Off'}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className='w-full'>
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <ShieldIcon className='h-5 w-5' />
                    Privacy & Security
                  </CardTitle>
                  <CardDescription>
                    Manage your privacy and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <Alert>
                    <ShieldIcon className='h-4 w-4' />
                    <AlertDescription>
                      This is a demo settings page. In a real application, you would implement
                      proper authentication and data persistence.
                    </AlertDescription>
                  </Alert>

                  <div className='space-y-3'>
                    <Button variant='outline' className='w-full justify-start'>
                      Change Password
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      Two-Factor Authentication
                    </Button>
                    <Button variant='outline' className='w-full justify-start'>
                      Download Your Data
                    </Button>
                    <Button variant='destructive' className='w-full justify-start'>
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Development Info */}
            <Card>
              <CardHeader>
                <CardTitle>Development Information</CardTitle>
                <CardDescription>
                  Technical details about this starter template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold'>Next.js</div>
                    <div className='text-sm text-muted-foreground'>15.5.4</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold'>React</div>
                    <div className='text-sm text-muted-foreground'>19.1.0</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold'>TypeScript</div>
                    <div className='text-sm text-muted-foreground'>5.0+</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold'>Components</div>
                    <div className='text-sm text-muted-foreground'>17+</div>
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