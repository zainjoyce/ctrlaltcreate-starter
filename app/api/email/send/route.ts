/**
 * Email Sending API Route with Resend
 *
 * Send transactional emails using Resend's API.
 * Perfect for welcome emails, notifications, password resets, etc.
 *
 * Setup:
 * 1. Sign up for Resend at https://resend.com
 * 2. Create an API key in your dashboard
 * 3. Add domain and verify it (or use resend.dev for testing)
 * 4. Add to .env.local:
 *    RESEND_API_KEY=re_your_api_key
 *    RESEND_FROM_EMAIL=noreply@yourdomain.com (or onboarding@resend.dev for testing)
 *
 * Usage Example:
 *
 *   POST /api/email/send
 *   Body: {
 *     "to": "user@example.com",
 *     "subject": "Welcome!",
 *     "template": "welcome",
 *     "data": { "name": "John" }
 *   }
 *
 * For testing, use Resend's sandbox domain: onboarding@resend.dev
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Validation schema
const SendEmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  subject: z.string().min(1, 'Subject is required'),
  template: z.enum(['welcome', 'notification', 'reset-password', 'custom']),
  data: z.record(z.string(), z.any()).optional(),
  html: z.string().optional(), // For custom template
})

// Initialize Resend (will be checked in the handler)
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build')

/**
 * Email Templates
 *
 * Add your own email templates here. For production, consider using
 * React Email (https://react.email) for better email components.
 */
const templates = {
  welcome: (data: Record<string, unknown>) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background: #f9fafb; }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background: #4f46e5;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Platform! 🎉</h1>
            </div>
            <div class="content">
              <p>Hi ${data.name || 'there'},</p>
              <p>We're excited to have you on board! Thank you for joining our platform.</p>
              <p>To get started, explore our features and customize your experience.</p>
              <a href="${data.url || 'https://example.com'}" class="button">Get Started</a>
              <p>If you have any questions, feel free to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Welcome to Our Platform!\n\nHi ${data.name || 'there'},\n\nWe're excited to have you on board! Thank you for joining our platform.\n\nTo get started, visit: ${data.url || 'https://example.com'}\n\nIf you have any questions, feel free to reach out to our support team.`,
  }),

  notification: (data: Record<string, unknown>) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>${data.title || 'Notification'}</h2>
            <p>${data.message || 'You have a new notification.'}</p>
            ${data.actionUrl ? `<a href="${data.actionUrl}" style="display: inline-block; padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">View Details</a>` : ''}
          </div>
        </body>
      </html>
    `,
    text: `${data.title || 'Notification'}\n\n${data.message || 'You have a new notification.'}\n\n${data.actionUrl ? `View details: ${data.actionUrl}` : ''}`,
  }),

  'reset-password': (data: Record<string, unknown>) => ({
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Reset Your Password</h2>
            <p>Hi ${data.name || 'there'},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="${data.resetUrl}" style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
            <p>This link will expire in ${data.expiryHours || '24'} hours.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        </body>
      </html>
    `,
    text: `Reset Your Password\n\nHi ${data.name || 'there'},\n\nWe received a request to reset your password.\n\nReset your password here: ${data.resetUrl}\n\nThis link will expire in ${data.expiryHours || '24'} hours.\n\nIf you didn't request this, please ignore this email.`,
  }),
}

/**
 * POST - Send email
 */
export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured. Add RESEND_API_KEY to .env.local' },
        { status: 500 }
      )
    }

    const body = await request.json()

    // Validate input
    const validationResult = SendEmailSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { to, subject, template, data, html: customHtml } = validationResult.data

    // Get email content from template or custom HTML
    let emailContent: { html: string; text?: string }

    if (template === 'custom' && customHtml) {
      emailContent = { html: customHtml }
    } else if (template !== 'custom' && template in templates) {
      emailContent = templates[template](data || {})
    } else {
      return NextResponse.json(
        { error: 'Invalid template or missing custom HTML' },
        { status: 400 }
      )
    }

    // Send email using Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html: emailContent.html,
      text: emailContent.text,
    })

    if (!result.data) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        id: result.data.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      {
        error: 'Failed to send email',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET - Test endpoint to verify email service configuration
 */
export async function GET() {
  const isConfigured = !!process.env.RESEND_API_KEY

  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured
      ? 'Email service is configured and ready'
      : 'Email service not configured. Add RESEND_API_KEY to .env.local',
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  })
}