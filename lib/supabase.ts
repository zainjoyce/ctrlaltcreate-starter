/**
 * Supabase Client Utilities
 *
 * This file provides helper functions to create Supabase clients for both
 * server-side and client-side operations.
 *
 * Setup Instructions:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Copy your project URL and keys from Settings > API
 * 3. Add to .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL=your-project-url
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
 *    SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for server-side only)
 */

import { createClient } from '@supabase/supabase-js'

// Type-safe environment variable access
const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key]
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value || ''
}

/**
 * Create a Supabase client for server-side operations (API routes, Server Components)
 *
 * Uses the service role key which bypasses Row Level Security (RLS).
 * Only use this in secure server environments - NEVER expose to the client.
 *
 * @returns Supabase client with full database access
 */
export function createServerSupabaseClient() {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  const supabaseServiceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY')

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Create a Supabase client for client-side operations (Client Components, browser)
 *
 * Uses the anonymous key which respects Row Level Security (RLS).
 * Safe to use in browser environments.
 *
 * @returns Supabase client with RLS-protected access
 */
export function createClientSupabaseClient() {
  const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  })
}

/**
 * Example Database Types
 *
 * Define your database schema types here for full type safety.
 * You can generate these automatically using the Supabase CLI:
 *
 *   npx supabase gen types typescript --project-id your-project-id > lib/database.types.ts
 *
 * Then import and use with your clients:
 *   import { Database } from '@/lib/database.types'
 *   const supabase = createClient<Database>(url, key)
 */

// Example table schema - replace with your own tables
export interface Database {
  public: {
    Tables: {
      // Example: users table
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
        }
      }
      // Example: posts table
      posts: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}

/**
 * Helper function to handle Supabase errors consistently
 */
export function handleSupabaseError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}