import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const maxDuration = 60

const MatchRequestSchema = z.object({
  profile: z.object({
    fullName: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    educationLevel: z.string().optional().nullable(),
    fieldOfStudy: z.string().optional().nullable(),
    gpa: z.number().optional().nullable(),
    graduationYear: z.number().optional().nullable(),
    targetCountries: z.array(z.string()).default([]),
    targetDegree: z.string().optional().nullable(),
    targetField: z.string().optional().nullable(),
    financialNeed: z.string().optional().nullable(),
    budget: z.number().optional().nullable(),
    languages: z.array(z.string()).default([]),
    bio: z.string().optional().nullable(),
  }),
  topN: z.number().min(1).max(50).default(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = MatchRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { profile, topN } = parsed.data

    // Pull all scholarships
    const scholarships = await db.scholarship.findMany({
      orderBy: { featured: 'desc' },
    })

    if (scholarships.length === 0) {
      return NextResponse.json({ matches: [] })
    }

    // Compose a compact representation of scholarships for the LLM
    const scholarshipCompact = scholarships.map((s, i) => ({
      id: s.id,
      i,
      title: s.title,
      provider: s.provider,
      level: s.level,
      fundedBy: s.fundedBy,
      hostCountries: s.hostCountries,
      eligibleCountries: s.eligibleCountries,
      fieldsOfStudy: s.fieldsOfStudy,
      fundingType: s.fundingType,
      amount: s.amount,
      competitiveness: s.competitiveness,
      deadline: s.deadline,
      eligibility: s.eligibility,
    }))

    const systemPrompt = `You are ScholarTrack AI, an expert scholarship matching engine for African students.
You analyze a student's profile against a database of scholarships and produce ranked, defensible match scores.

SCORING RUBRIC (0-100):
- 90-100: Outstanding fit (most criteria align exactly; student exceeds minimums)
- 75-89:  Strong fit (most criteria align; minor gaps)
- 60-74:  Moderate fit (some criteria align; addressable gaps)
- 40-59:  Weak fit (multiple criteria misalign)
- 0-39:   Not eligible or major mismatches

CRITERIA WEIGHTS:
- Eligibility (country, age, degree level): 35%
- Academic fit (field of study, GPA): 25%
- Target alignment (host country, target degree): 20%
- Financial need / funding match: 10%
- Language readiness: 5%
- Competitiveness vs profile strength: 5%

OUTPUT FORMAT:
You MUST return a JSON object with this exact shape — no preamble, no markdown:
{
  "matches": [
    {
      "scholarshipId": "ck...",
      "score": 87,
      "reasons": ["Specific reason 1", "Specific reason 2", ...],
      "gaps": ["Specific gap 1", ...],
      "recommendation": "One-line actionable next step"
    }
  ]
}

Rules:
- Return at most ${topN} matches, sorted by score descending
- Only include matches with score >= 40
- Reasons must be specific (cite the student's field vs scholarship field, etc.)
- Gaps must be concrete (e.g., "Needs TOEFL 80+, current score unknown")
- Recommendation should be one actionable sentence
- Never invent scholarships not in the input
- If profile is sparse, score conservatively and note gaps`

    const userPrompt = `STUDENT PROFILE:
${JSON.stringify(profile, null, 2)}

SCHOLARSHIP DATABASE (${scholarships.length} entries):
${JSON.stringify(scholarshipCompact, null, 2)}

Return the top ${topN} matches as JSON per the system instructions.`

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
    })

    const raw = completion.choices?.[0]?.message?.content ?? ''

    // Extract JSON from response (handles code-fenced or plain)
    let jsonText = raw
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (fenceMatch) jsonText = fenceMatch[1]
    const firstBrace = jsonText.indexOf('{')
    const lastBrace = jsonText.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1)
    }

    let aiResult: { matches: any[] }
    try {
      aiResult = JSON.parse(jsonText)
    } catch {
      // Fallback: rule-based match scoring
      aiResult = ruleBasedMatch(profile, scholarships, topN)
    }

    // Attach full scholarship details for client convenience
    const matchesWithDetails = (aiResult.matches || [])
      .filter((m: any) => scholarships.find((s) => s.id === m.scholarshipId))
      .map((m: any) => {
        const s = scholarships.find((s) => s.id === m.scholarshipId)!
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
          score: Math.max(0, Math.min(100, Math.round(m.score ?? 0))),
          reasons: Array.isArray(m.reasons) ? m.reasons.slice(0, 5) : [],
          gaps: Array.isArray(m.gaps) ? m.gaps.slice(0, 5) : [],
          recommendation: typeof m.recommendation === 'string' ? m.recommendation : '',
        }
      })

    return NextResponse.json({
      matches: matchesWithDetails,
      total: matchesWithDetails.length,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[AI Match] error:', err)
    return NextResponse.json(
      { error: 'Matcher failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}

// Fallback: deterministic rule-based matcher if LLM fails
function ruleBasedMatch(profile: any, scholarships: any[], topN: number) {
  const matches = scholarships.map((s) => {
    let score = 50
    const reasons: string[] = []
    const gaps: string[] = []

    // Eligible country (rough heuristic)
    if (s.eligibleCountries && profile.country) {
      const ec = JSON.parse(s.eligibleCountries || '[]')
      if (
        ec.length === 0 ||
        ec.some((c: string) =>
          c.toLowerCase().includes('world') ||
          c.toLowerCase().includes(profile.country.toLowerCase()) ||
          (c.toLowerCase().includes('africa') && ['ethiopia', 'kenya', 'nigeria', 'ghana', 'south africa', 'uganda', 'tanzania', 'rwanda', 'senegal', 'egypt', 'morocco', 'cameroon', 'zimbabwe', 'mozambique'].includes(profile.country.toLowerCase()))
        )
      ) {
        score += 15
        reasons.push(`Eligible for ${profile.country} applicants`)
      } else {
        score -= 25
        gaps.push(`Country eligibility unclear for ${profile.country}`)
      }
    }

    // Field of study
    if (profile.fieldOfStudy && s.fieldsOfStudy) {
      const fields = JSON.parse(s.fieldsOfStudy || '[]')
      if (fields.some((f: string) => f.toLowerCase() === 'any' || f.toLowerCase().includes(profile.fieldOfStudy.toLowerCase()))) {
        score += 15
        reasons.push(`${profile.fieldOfStudy} aligns with scholarship fields`)
      }
    }

    // Target degree
    if (profile.targetDegree && s.level) {
      if (s.level === 'any' || s.level === profile.targetDegree) {
        score += 10
        reasons.push(`Degree level match (${profile.targetDegree})`)
      } else {
        score -= 10
        gaps.push(`Scholarship is for ${s.level}; student seeks ${profile.targetDegree}`)
      }
    }

    // Target country
    if (profile.targetCountries?.length && s.hostCountries) {
      const hosts = JSON.parse(s.hostCountries || '[]')
      const overlap = hosts.filter((h: string) => profile.targetCountries.includes(h))
      if (overlap.length) {
        score += 10
        reasons.push(`Host country ${overlap.join(', ')} is in your target list`)
      }
    }

    // GPA
    if (profile.gpa && profile.gpa >= 3.5) {
      score += 5
      reasons.push(`Strong GPA (${profile.gpa}/4.0)`)
    }

    // Financial need
    if (profile.financialNeed === 'high' && s.fundingType === 'full') {
      score += 5
      reasons.push(`Full funding matches your high financial need`)
    }

    score = Math.max(0, Math.min(100, Math.round(score)))
    return { scholarshipId: s.id, score, reasons, gaps, recommendation: gaps.length ? 'Address gaps before applying' : 'Strong fit — start your application' }
  })
  matches.sort((a, b) => b.score - a.score)
  return { matches: matches.slice(0, topN).filter((m) => m.score >= 40) }
}
