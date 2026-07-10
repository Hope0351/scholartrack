import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const featured = searchParams.get('featured') === 'true'

  const where: any = {}
  if (category && category !== 'all') where.category = category
  if (featured) where.featured = true

  const resources = await db.resource.findMany({
    where,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })

  return NextResponse.json({ resources, total: resources.length })
}
