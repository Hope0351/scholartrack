import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

const DEMO_EMAIL = 'demo@scholartrack.africa'

// POST /api/scholarships/[id]/save — toggle save
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const scholarship = await db.scholarship.findUnique({ where: { id } })
  if (!scholarship) return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })

  const existing = await db.savedScholarship.findUnique({
    where: { userId_scholarshipId: { userId: user.id, scholarshipId: id } },
  })

  if (existing) {
    await db.savedScholarship.delete({ where: { id: existing.id } })
    await db.activity.create({
      data: {
        userId: user.id,
        type: 'unsaved_scholarship',
        description: `Removed ${scholarship.title} from saved`,
        metadata: JSON.stringify({ scholarshipId: id }),
      },
    })
    return NextResponse.json({ saved: false })
  } else {
    await db.savedScholarship.create({ data: { userId: user.id, scholarshipId: id } })
    await db.activity.create({
      data: {
        userId: user.id,
        type: 'saved_scholarship',
        description: `Saved ${scholarship.title}`,
        metadata: JSON.stringify({ scholarshipId: id }),
      },
    })
    return NextResponse.json({ saved: true })
  }
}

// GET /api/scholarships/[id]/save — check saved status
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ saved: false })

  const existing = await db.savedScholarship.findUnique({
    where: { userId_scholarshipId: { userId: user.id, scholarshipId: id } },
  })
  return NextResponse.json({ saved: !!existing })
}
