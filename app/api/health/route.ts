/**
 * Health Check API Route
 *
 * A simple endpoint to verify your API is running correctly.
 * Useful for debugging, monitoring, and deployment verification.
 *
 * Usage:
 *   GET /api/health
 *
 * Response:
 *   {
 *     "status": "ok",
 *     "timestamp": "2024-01-01T00:00:00.000Z",
 *     "environment": "development"
 *   }
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // You can add additional health checks here:
    // - Database connectivity
    // - External service availability
    // - Cache status
    // etc.

    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown',
      },
      { status: 200 }
    )
  } catch (error) {
    // If any health checks fail, return error status
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}