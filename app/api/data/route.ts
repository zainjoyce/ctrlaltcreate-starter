/**
 * Data CRUD API Route with Supabase
 *
 * Full CRUD (Create, Read, Update, Delete) operations for your Supabase database.
 * This example uses a "posts" table, but you can adapt it to any table.
 *
 * Setup:
 * 1. Configure Supabase environment variables (see lib/supabase.ts)
 * 2. Create your table in Supabase dashboard or via SQL:
 *
 *    CREATE TABLE posts (
 *      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *      title TEXT NOT NULL,
 *      content TEXT NOT NULL,
 *      user_id UUID NOT NULL,
 *      created_at TIMESTAMPTZ DEFAULT NOW()
 *    );
 *
 * 3. Update the Database types in lib/supabase.ts to match your schema
 *
 * Usage Examples:
 *
 *   // Fetch all posts
 *   GET /api/data
 *
 *   // Fetch specific post
 *   GET /api/data?id=123e4567-e89b-12d3-a456-426614174000
 *
 *   // Create new post
 *   POST /api/data
 *   Body: { "title": "My Post", "content": "Hello", "user_id": "..." }
 *
 *   // Update post
 *   PUT /api/data
 *   Body: { "id": "...", "title": "Updated Title" }
 *
 *   // Delete post
 *   DELETE /api/data
 *   Body: { "id": "..." }
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, handleSupabaseError } from '@/lib/supabase'
import { z } from 'zod'

// Validation schemas
const CreatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  user_id: z.string().uuid('Invalid user ID format'),
})

const UpdatePostSchema = z.object({
  id: z.string().uuid('Invalid post ID format'),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
})

const DeletePostSchema = z.object({
  id: z.string().uuid('Invalid post ID format'),
})

/**
 * GET - Fetch posts from database
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    // Fetch single post by ID
    if (id) {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return NextResponse.json(
          { error: handleSupabaseError(error) },
          { status: 404 }
        )
      }

      return NextResponse.json({ data })
    }

    // Fetch all posts (with optional pagination)
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'

    const { data, error: fetchError, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)

    if (fetchError) {
      return NextResponse.json(
        { error: handleSupabaseError(fetchError) },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset),
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

/**
 * POST - Create new post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = CreatePostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()
    const { data, error: insertError } = await supabase
      .from('posts')
      .insert([validationResult.data])
      .select()
      .single()

    if (insertError) {
      return NextResponse.json(
        { error: handleSupabaseError(insertError) },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

/**
 * PUT - Update existing post
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = UpdatePostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { id, ...updates } = validationResult.data

    const supabase = createServerSupabaseClient()
    const { data, error: updateError } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: handleSupabaseError(updateError) },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

/**
 * DELETE - Remove post
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = DeletePostSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', validationResult.data.id)

    if (deleteError) {
      return NextResponse.json(
        { error: handleSupabaseError(deleteError) },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}