import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scholarship = await db.scholarship.findUnique({ where: { id } })
  if (!scholarship) {
    return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
  }
  // Increment view count (fire and forget)
  await db.scholarship.update({ where: { id }, data: { views: { increment: 1 } } }).catch(() => {})
  return NextResponse.json({ scholarship })
}
