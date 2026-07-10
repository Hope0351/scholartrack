import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const maxDuration = 60

const DEMO_EMAIL = 'demo@scholartrack.africa'

export async function GET() {
  try {
    const user = await db.user.findUnique({
      where: { email: DEMO_EMAIL },
      include: {
        profile: true,
        applications: { include: { scholarship: true } },
        savedScholarships: { include: { scholarship: true } },
      },
    })
    if (!user || !user.profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const profile = user.profile
    const appliedIds = new Set(user.applications.map((a) => a.scholarshipId))
    const savedIds = new Set(user.savedScholarships.map((s) => s.scholarshipId))
    const seenIds = new Set([...appliedIds, ...savedIds])

    // Get scholarships the user hasn't interacted with yet
    const candidates = await db.scholarship.findMany({
      where: { id: { notIn: Array.from(seenIds) } },
      take: 30,
    })

    if (candidates.length === 0) {
      return NextResponse.json({ recommendations: [], total: 0 })
    }

    // Use AI to rank candidates by relevance to the user's profile
    const zai = await ZAI.create()
    const systemPrompt = `You are a scholarship recommendation engine. Given a student's profile and a list of scholarships they haven't seen, rank the top 8 by how well they match the student's profile and goals.

OUTPUT FORMAT (JSON only, no markdown):
{
  "recommendations": [
    {
      "scholarshipId": "ck...",
      "reason": "<one sentence why this is a great fit>",
      "priority": "high" | "medium" | "low"
    }
  ]
}

Rules:
- Return at most 8 scholarships, sorted by relevance (best first)
- Prioritize scholarships that match the student's target degree, field, and countries
- Consider financial need alignment
- "high" priority = strong fit, "medium" = good fit, "low" = worth considering
- Never invent scholarships not in the input`

    const userPrompt = `STUDENT PROFILE:
${JSON.stringify({
  country: profile.country,
  fieldOfStudy: profile.fieldOfStudy,
  gpa: profile.gpa,
  educationLevel: profile.educationLevel,
  targetDegree: profile.targetDegree,
  targetCountries: profile.targetCountries,
  targetField: profile.targetField,
  financialNeed: profile.financialNeed,
  languages: profile.languages,
}, null, 2)}

SCHOLARSHIP CANDIDATES (${candidates.length}):
${JSON.stringify(candidates.map((s) => ({
  id: s.id,
  title: s.title,
  provider: s.provider,
  level: s.level,
  fundedBy: s.fundedBy,
  hostCountries: s.hostCountries,
  fieldsOfStudy: s.fieldsOfStudy,
  fundingType: s.fundingType,
  amount: s.amount,
  deadline: s.deadline,
  competitiveness: s.competitiveness,
})), null, 2)}`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
    })

    const raw = completion.choices?.[0]?.message?.content ?? ''
    let jsonText = raw
    const fence = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (fence) jsonText = fence[1]
    const first = jsonText.indexOf('{')
    const last = jsonText.lastIndexOf('}')
    if (first !== -1 && last !== -1) jsonText = jsonText.slice(first, last + 1)

    let result: { recommendations: any[] }
    try {
      result = JSON.parse(jsonText)
    } catch {
      // Fallback: simple rule-based ranking
      result = {
        recommendations: candidates.slice(0, 8).map((s) => ({
          scholarshipId: s.id,
          reason: `${s.provider} program for ${s.level} students`,
          priority: 'medium' as const,
        })),
      }
    }

    // Attach full scholarship details
    const recommendations = (result.recommendations || [])
      .filter((r: any) => candidates.find((s) => s.id === r.scholarshipId))
      .map((r: any) => {
        const s = candidates.find((s) => s.id === r.scholarshipId)!
        return {
          scholarship: {
            id: s.id,
            slug: s.slug,
            title: s.title,
            provider: s.provider,
            level: s.level,
            fundedBy: s.fundedBy,
            hostCountries: s.hostCountries,
            fieldsOfStudy: s.fieldsOfStudy,
            fundingType: s.fundingType,
            amount: s.amount,
            deadline: s.deadline,
            competitiveness: s.competitiveness,
            applicationUrl: s.applicationUrl,
          },
          reason: r.reason,
          priority: r.priority || 'medium',
        }
      })

    return NextResponse.json({
      recommendations,
      total: recommendations.length,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[AI Feed] error:', err)
    return NextResponse.json(
      { error: 'Feed generation failed', message: err?.message },
      { status: 500 }
    )
  }
}
