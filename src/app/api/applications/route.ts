import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

const DEMO_EMAIL = 'demo@scholartrack.africa'

const CreateApplicationSchema = z.object({
  scholarshipId: z.string(),
  status: z.enum([
    'interested', 'researching', 'preparing', 'submitted',
    'interview', 'offered', 'rejected', 'withdrawn',
  ]).default('interested'),
  notes: z.string().optional(),
})

// POST — create application (or update if exists)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = CreateApplicationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }
  const { scholarshipId, status, notes } = parsed.data

  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const scholarship = await db.scholarship.findUnique({ where: { id: scholarshipId } })
  if (!scholarship) return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })

  const existing = await db.application.findUnique({
    where: { userId_scholarshipId: { userId: user.id, scholarshipId } },
  })

  if (existing) {
    const updated = await db.application.update({
      where: { id: existing.id },
      data: { status, notes: notes ?? existing.notes },
    })
    return NextResponse.json({ application: updated, created: false })
  }

  const application = await db.application.create({
    data: {
      userId: user.id,
      scholarshipId,
      status,
      notes,
    },
  })

  await db.activity.create({
    data: {
      userId: user.id,
      type: 'application_created',
      description: `Added ${scholarship.title} to tracker as "${status}"`,
      metadata: JSON.stringify({ applicationId: application.id, scholarshipId }),
    },
  })

  return NextResponse.json({ application, created: true })
}

// PATCH — update status/progress
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { applicationId, status, progress, notes } = body

  if (!applicationId) return NextResponse.json({ error: 'applicationId required' }, { status: 400 })

  const update: any = {}
  if (status) update.status = status
  if (typeof progress === 'number') update.progress = Math.max(0, Math.min(100, progress))
  if (typeof notes === 'string') update.notes = notes
  if (status === 'submitted') update.appliedAt = new Date()
  if (status === 'offered' || status === 'rejected') update.decisionAt = new Date()

  const application = await db.application.update({ where: { id: applicationId }, data: update })
  return NextResponse.json({ application })
}
