import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import ZAI from 'z-ai-web-dev-sdk'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const maxDuration = 60

const EligibilitySchema = z.object({
  scholarshipId: z.string(),
  profile: z.object({
    fullName: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    educationLevel: z.string().optional().nullable(),
    fieldOfStudy: z.string().optional().nullable(),
    gpa: z.number().optional().nullable(),
    graduationYear: z.number().optional().nullable(),
    targetDegree: z.string().optional().nullable(),
    languages: z.array(z.string()).default([]),
    workExperience: z.string().optional().nullable(),
    testScores: z.string().optional().nullable(),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = EligibilitySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { scholarshipId, profile } = parsed.data

    const scholarship = await db.scholarship.findUnique({
      where: { id: scholarshipId },
    })
    if (!scholarship) {
      return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
    }

    const systemPrompt = `You are an expert scholarship eligibility analyst for African students.
Analyze the student's profile against the scholarship's eligibility criteria.

OUTPUT FORMAT (JSON only):
{
  "eligible": "yes" | "likely" | "uncertain" | "no",
  "confidence": <number 0-100>,
  "checks": [
    {
      "criterion": "<name of criterion>",
      "status": "pass" | "fail" | "warning" | "unknown",
      "detail": "<specific explanation>"
    }
  ],
  "missing": ["<required item the student doesn't have>"],
  "recommendations": ["<actionable next step>"],
  "summary": "<2-3 sentence overall verdict>"
}

Status definitions:
- pass: student clearly meets criterion
- fail: student clearly does NOT meet criterion
- warning: student may meet it but with caveats
- unknown: insufficient information to determine

Be precise and evidence-based. Cite the scholarship's actual requirements.`

    const userPrompt = `SCHOLARSHIP:
${JSON.stringify(
  {
    title: scholarship.title,
    provider: scholarship.provider,
    eligibility: scholarship.eligibility,
    benefits: scholarship.benefits,
    level: scholarship.level,
    fundedBy: scholarship.fundedBy,
    hostCountries: scholarship.hostCountries,
    eligibleCountries: scholarship.eligibleCountries,
    fieldsOfStudy: scholarship.fieldsOfStudy,
    deadline: scholarship.deadline,
  },
  null,
  2
)}

STUDENT PROFILE:
${JSON.stringify(profile, null, 2)}`

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
    })

    const raw = completion.choices?.[0]?.message?.content ?? ''

    let jsonText = raw
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (fenceMatch) jsonText = fenceMatch[1]
    const firstBrace = jsonText.indexOf('{')
    const lastBrace = jsonText.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1) {
      jsonText = jsonText.slice(firstBrace, lastBrace + 1)
    }

    let result: any
    try {
      result = JSON.parse(jsonText)
    } catch {
      return NextResponse.json(
        {
          eligible: 'uncertain',
          confidence: 0,
          checks: [],
          missing: [],
          recommendations: ['Unable to parse AI response — please try again.'],
          summary: 'Analysis failed.',
          raw,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      ...result,
      scholarshipTitle: scholarship.title,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[AI Eligibility] error:', err)
    return NextResponse.json(
      { error: 'Eligibility check failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
