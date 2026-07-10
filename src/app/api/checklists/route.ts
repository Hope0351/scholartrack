import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

const DEMO_EMAIL = 'demo@scholartrack.africa'

const CreateChecklistSchema = z.object({
  scholarshipId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.enum(['documents', 'essays', 'tests', 'recommendations', 'forms', 'submission', 'other']).default('other'),
  dueDate: z.string().optional(),
})

// GET checklist for a scholarship
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const scholarshipId = searchParams.get('scholarshipId')

  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const where: any = { userId: user.id }
  if (scholarshipId) where.scholarshipId = scholarshipId

  const items = await db.checklistItem.findMany({
    where,
    orderBy: [{ completed: 'asc' }, { order: 'asc' }, { createdAt: 'asc' }],
  })

  // Group by category
  const grouped = items.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return NextResponse.json({ items, grouped, total: items.length, completed: items.filter((i) => i.completed).length })
}

// POST — create a checklist item
export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = CreateChecklistSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }
  const { scholarshipId, title, description, category, dueDate } = parsed.data

  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const scholarship = await db.scholarship.findUnique({ where: { id: scholarshipId } })
  if (!scholarship) return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })

  const item = await db.checklistItem.create({
    data: {
      userId: user.id,
      scholarshipId,
      title,
      description,
      category,
      dueDate: dueDate ? new Date(dueDate) : null,
    },
  })

  return NextResponse.json({ item })
}

// PATCH — toggle complete or update
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { itemId, completed, title, description, category, dueDate } = body

  if (!itemId) return NextResponse.json({ error: 'itemId required' }, { status: 400 })

  const update: any = {}
  if (typeof completed === 'boolean') {
    update.completed = completed
    update.completedAt = completed ? new Date() : null
  }
  if (title) update.title = title
  if (description !== undefined) update.description = description
  if (category) update.category = category
  if (dueDate !== undefined) update.dueDate = dueDate ? new Date(dueDate) : null

  const item = await db.checklistItem.update({ where: { id: itemId }, data: update })
  return NextResponse.json({ item })
}

// DELETE
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const itemId = searchParams.get('itemId')
  if (!itemId) return NextResponse.json({ error: 'itemId required' }, { status: 400 })

  await db.checklistItem.delete({ where: { id: itemId } })
  return NextResponse.json({ success: true })
}
