import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase().trim() || ''
  const level = searchParams.get('level')
  const fundingType = searchParams.get('fundingType')
  const country = searchParams.get('country')
  const featured = searchParams.get('featured') === 'true'
  const limit = Math.min(100, Number(searchParams.get('limit') || 100))

  const where: any = {}
  if (level && level !== 'all') where.level = level
  if (fundingType && fundingType !== 'all') where.fundingType = fundingType
  if (featured) where.featured = true
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { provider: { contains: q } },
      { description: { contains: q } },
      { fieldsOfStudy: { contains: q } },
    ]
  }
  if (country) {
    // SQLite doesn't support array operators well, use LIKE
    where.hostCountries = { contains: country }
  }

  const scholarships = await db.scholarship.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { deadline: 'asc' }],
    take: limit,
  })

  return NextResponse.json({
    scholarships,
    total: scholarships.length,
  })
}
