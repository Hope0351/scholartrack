import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

const DEMO_EMAIL = 'demo@scholartrack.africa'

const ProfileUpdateSchema = z.object({
  fullName: z.string().optional(),
  bio: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  educationLevel: z.string().optional(),
  currentSchool: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  gpa: z.number().min(0).max(4).optional().nullable(),
  graduationYear: z.number().min(1980).max(2030).optional().nullable(),
  targetCountries: z.array(z.string()).optional(),
  targetDegree: z.string().optional(),
  targetField: z.string().optional(),
  financialNeed: z.string().optional(),
  budget: z.number().optional().nullable(),
  languages: z.array(z.string()).optional(),
})

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const parsed = ProfileUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 })
  }
  const update = parsed.data

  const user = await db.user.findUnique({ where: { email: DEMO_EMAIL } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  // Serialize arrays (SQLite doesn't support lists)
  const data: any = { ...update }
  if (update.targetCountries) data.targetCountries = JSON.stringify(update.targetCountries)
  if (update.languages) data.languages = JSON.stringify(update.languages)

  const profile = await db.studentProfile.upsert({
    where: { userId: user.id },
    update: data,
    create: {
      userId: user.id,
      ...data,
    },
  })

  return NextResponse.json({ profile })
}
