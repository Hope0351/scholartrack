import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

// Demo user (single-tenant for sandbox)
const DEMO_EMAIL = 'demo@scholartrack.africa'

export async function GET() {
  const user = await db.user.findUnique({
    where: { email: DEMO_EMAIL },
    include: {
      profile: true,
      applications: {
        include: { scholarship: true },
        orderBy: { updatedAt: 'desc' },
      },
      savedScholarships: {
        include: { scholarship: true },
        orderBy: { createdAt: 'desc' },
      },
      essays: {
        orderBy: { updatedAt: 'desc' },
      },
      documents: {
        orderBy: { createdAt: 'desc' },
      },
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Demo user not seeded' }, { status: 500 })
  }

  // Stats
  const allScholarships = await db.scholarship.count()
  const allResources = await db.resource.count()

  // Upcoming deadlines (next 60 days)
  const now = new Date()
  const future60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
  const upcomingDeadlines = await db.scholarship.findMany({
    where: { deadline: { gte: now, lte: future60 } },
    orderBy: { deadline: 'asc' },
    take: 5,
  })

  // Featured scholarships
  const featured = await db.scholarship.findMany({
    where: { featured: true },
    orderBy: { deadline: 'asc' },
    take: 6,
  })

  // Compute profile completion %
  let profileCompletion = 0
  if (user.profile) {
    const p = user.profile
    const fields = [
      p.fullName, p.country, p.city, p.educationLevel, p.currentSchool,
      p.fieldOfStudy, p.gpa, p.graduationYear, p.targetCountries, p.targetDegree,
      p.targetField, p.financialNeed, p.languages, p.bio,
    ]
    const filled = fields.filter((f) => f !== null && f !== undefined && f !== '').length
    profileCompletion = Math.round((filled / fields.length) * 100)
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    },
    stats: {
      totalScholarships: allScholarships,
      totalResources: allResources,
      totalApplications: user.applications.length,
      totalSaved: user.savedScholarships.length,
      totalEssays: user.essays.length,
      totalDocuments: user.documents.length,
      profileCompletion,
    },
    applications: user.applications,
    savedScholarships: user.savedScholarships,
    essays: user.essays,
    documents: user.documents,
    activities: user.activities,
    upcomingDeadlines,
    featured,
  })
}
