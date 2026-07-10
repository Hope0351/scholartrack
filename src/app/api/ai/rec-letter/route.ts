import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import ZAI from 'z-ai-web-dev-sdk'

export const runtime = 'nodejs'
export const maxDuration = 60

const RecLetterSchema = z.object({
  studentName: z.string(),
  recommenderName: z.string(),
  recommenderTitle: z.string(),
  recommenderInstitution: z.string(),
  relationship: z.string(), // e.g. "Professor of Computer Science, taught me in 3 courses"
  programName: z.string(),
  programUniversity: z.string(),
  keyPoints: z.array(z.string()).min(2, 'Add at least 2 key points'),
  specificExamples: z.array(z.string()).default([]),
  tone: z.enum(['academic', 'professional', 'warm', 'formal']).default('academic'),
  length: z.enum(['concise', 'standard', 'detailed']).default('standard'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RecLetterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const input = parsed.data

    const systemPrompt = `You are an expert at drafting recommendation letters that admissions committees and scholarship boards find compelling. You write in a credible recommender's voice — specific, evidence-based, and warm without being effusive.

Key principles:
- Open with a specific anecdote, not a generic claim
- Use concrete evidence (project names, outcomes, peer comparisons)
- Address both academic ability and personal character
- Keep within typical length norms (1-1.5 pages for "standard")
- Avoid cliche phrases ("It is with great pleasure", "top 1% of students I have taught")
- Match the requested tone (${input.tone}) and length (${input.length})`

    const userPrompt = `Draft a recommendation letter with these inputs:

STUDENT: ${input.studentName}
RECOMMENDER: ${input.recommenderName}, ${input.recommenderTitle} at ${input.recommenderInstitution}
RELATIONSHIP: ${input.relationship}
TARGET PROGRAM: ${input.programName} at ${input.programUniversity}

KEY POINTS TO COVER:
${input.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

SPECIFIC EXAMPLES TO REFERENCE:
${input_specific_examples(input.specificExamples)}

TONE: ${input.tone}
LENGTH: ${input.length} (concise=300-400 words, standard=500-700 words, detailed=800-1000 words)

FORMAT:
- Address as "To the Admissions Committee,"
- Sign off as the recommender (with placeholder for signature)
- Use proper letter structure
- Return ONLY the letter text, no JSON, no markdown headers, no preamble`

    function input_specific_examples(examples: string[]) {
      if (examples.length === 0) return '(No specific examples provided — infer plausible ones from the key points.)'
      return examples.map((e, i) => `${i + 1}. ${e}`).join('\n')
    }

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
    })

    const letter = completion.choices?.[0]?.message?.content ?? ''

    return NextResponse.json({
      letter: letter.trim(),
      wordCount: letter.trim().split(/\s+/).filter(Boolean).length,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[AI Rec Letter] error:', err)
    return NextResponse.json(
      { error: 'Letter generation failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
