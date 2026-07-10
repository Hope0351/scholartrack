import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

const DEMO_EMAIL = 'demo@scholartrack.africa'

// GET reminders + auto-generate from deadlines
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const unreadOnly = searchParams.get('unread') === 'true'

  const user = await db.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      applications: { include: { scholarship: true } },
      savedScholarships: { include: { scholarship: true } },
      profile: true,
    },
  })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Auto-generate reminders based on upcoming deadlines
  const now = new Date()
  const future30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const allTrackedScholarships = [
    ...user.applications.map((a) => ({ scholarship: a.scholarship, status: a.status })),
    ...user.savedScholarships.map((s) => ({ scholarship: s.scholarship, status: 'saved' })),
  ]

  // Generate reminders for deadlines within 30 days
  for (const { scholarship, status } of allTrackedScholarships) {
    if (!scholarship.deadline) continue
    const deadline = new Date(scholarship.deadline)
    if (deadline < now || deadline > future30) continue

    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let type = 'deadline_7d'
    let priority = 'medium'
    if (daysLeft <= 1) { type = 'deadline_1d'; priority = 'urgent' }
    else if (daysLeft <= 3) { type = 'deadline_3d'; priority = 'high' }
    else if (daysLeft <= 7) { type = 'deadline_7d'; priority = 'high' }
    else if (daysLeft <= 14) { type = 'deadline_14d'; priority = 'medium' }
    else { type = 'deadline_30d'; priority = 'low' }

    // Check if a reminder of this type already exists
    const existing = await db.reminder.findFirst({
      where: { userId: user.id, scholarshipId: scholarship.id, type },
    })
    if (existing) continue

    await db.reminder.create({
      data: {
        userId: user.id,
        scholarshipId: scholarship.id,
        title: `${scholarship.title} — ${daysLeft} days left`,
        message: `Deadline for ${scholarship.title} (${scholarship.provider}) is in ${daysLeft} days. ${status === 'saved' ? 'Consider starting your application.' : 'Continue preparing your application.'}`,
        type,
        priority,
        dueDate: deadline,
      },
    })
  }

  // Profile completion reminder
  if (user.profile) {
    const p = user.profile
    const fields = [p.fullName, p.country, p.fieldOfStudy, p.gpa, p.targetCountries, p.financialNeed, p.languages, p.bio]
    const filled = fields.filter((f) => f !== null && f !== undefined && f !== '').length
    const completion = Math.round((filled / fields.length) * 100)
    if (completion < 100) {
      const existing = await db.reminder.findFirst({
        where: { userId: user.id, type: 'incomplete_profile', read: false },
      })
      if (!existing) {
        await db.reminder.create({
          data: {
            userId: user.id,
            title: 'Complete your profile',
            message: `Your profile is ${completion}% complete. Complete it for better AI match scores.`,
            type: 'incomplete_profile',
            priority: 'medium',
          },
        })
      }
    }
  }

  // Fetch all reminders
  const where: any = { userId: user.id }
  if (unreadOnly) where.read = false

  const reminders = await db.reminder.findMany({
    where,
    orderBy: [
      { priority: 'desc' },
      { dueDate: 'asc' },
      { createdAt: 'desc' },
    ],
    take: 50,
  })

  return NextResponse.json({
    reminders,
    total: reminders.length,
    unread: reminders.filter((r) => !r.read).length,
  })
}

// PATCH — mark as read
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { reminderId, markAllRead } = body

  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  if (markAllRead) {
    await db.reminder.updateMany({
      where: { userId: user.id, read: false },
      data: { read: true, readAt: new Date() },
    })
    return NextResponse.json({ success: true, markedAllRead: true })
  }

  if (!reminderId) return NextResponse.json({ error: 'reminderId required' }, { status: 400 })

  const reminder = await db.reminder.update({
    where: { id: reminderId },
    data: { read: true, readAt: new Date() },
  })
  return NextResponse.json({ reminder })
}

// DELETE
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const reminderId = searchParams.get('reminderId')
  if (!reminderId) return NextResponse.json({ error: 'reminderId required' }, { status: 400 })

  await db.reminder.delete({ where: { id: reminderId } })
  return NextResponse.json({ success: true })
}
