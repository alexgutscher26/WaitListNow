import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const runtime = 'nodejs' // Ensure Node.js runtime

export async function GET() {
  try {
    // Simple query to test the connection
    const users = await db.user.findMany({
      take: 1,
      select: { id: true }
    })
    
    return NextResponse.json({ 
      success: true, 
      users,
      message: 'Database connection successful!'
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
      },
      { status: 500 }
    )
  }
}
