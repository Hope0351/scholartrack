import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import ZAI from 'z-ai-web-dev-sdk'

export const runtime = 'nodejs'
export const maxDuration = 60

const EssaySchema = z.object({
  title: z.string(),
  prompt: z.string().optional(),
  type: z.string().default('sop'),
  content: z.string().min(50, 'Essay must be at least 50 characters'),
  targetProgram: z.string().optional(),
  targetUniversity: z.string().optional(),
  wordLimit: z.number().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = EssaySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const essay = parsed.data

    const wordCount = essay.content.trim().split(/\s+/).filter(Boolean).length

    const systemPrompt = `You are ScholarTrack's AI Essay Coach, a world-class advisor for African students applying to international scholarships and graduate programs.

You have deep knowledge of what admissions committees at top universities (Ivy League, Oxbridge, Stanford, MIT, LSE, ETH, etc.) and major scholarships (Chevening, Fulbright, Rhodes, Mastercard Foundation, DAAD) look for in essays.

Your job: analyze an essay draft and give specific, actionable, professional feedback.

OUTPUT FORMAT (JSON only, no markdown, no preamble):
{
  "score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", ...],
  "weaknesses": ["<specific weakness 1>", "<specific weakness 2>", ...],
  "suggestions": [
    {
      "category": "structure|evidence|specificity|tone|grammar|fit|impact",
      "issue": "<what to fix>",
      "fix": "<how to fix it, with a concrete example>"
    }
  ],
  "rewrite": "<full revised essay incorporating all fixes — same voice, improved structure and specificity>",
  "wordCount": ${wordCount},
  "wordCountNote": "<comment on word count vs. limit if applicable>"
}

Scoring rubric:
- 90-100: Outstanding — would impress any admissions committee
- 75-89: Strong — competitive with minor revisions
- 60-74: Solid foundation, needs significant revision
- 40-59: Weak — major issues across multiple dimensions
- 0-39: Major rewrite needed

Be honest but constructive. Identify the 3-5 highest-impact improvements. The rewrite should preserve the student's authentic voice while elevating the structure, specificity, and impact.`

    const userPrompt = `ESSAY DETAILS:
- Title: ${essay.title}
- Type: ${essay.type}
- Target program: ${essay.targetProgram || 'Not specified'}
- Target university: ${essay.targetUniversity || 'Not specified'}
- Original prompt: ${essay.prompt || 'Not provided'}
- Word limit: ${essay.wordLimit || 'Not specified'}
- Current word count: ${wordCount}

ESSAY DRAFT:
"""
${essay.content}
"""

Provide your analysis as JSON per the system instructions.`

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
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
          error: 'Failed to parse AI response',
          raw,
          score: 0,
          summary: 'Unable to analyze essay. Please try again.',
          strengths: [],
          weaknesses: [],
          suggestions: [],
          rewrite: '',
          wordCount,
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      ...result,
      wordCount,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[AI Essay] error:', err)
    return NextResponse.json(
      { error: 'Essay analysis failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
