import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import ZAI from 'z-ai-web-dev-sdk'

export const runtime = 'nodejs'
export const maxDuration = 60

const InterviewSchema = z.object({
  action: z.enum(['start', 'answer']),
  scholarshipTitle: z.string().optional(),
  scholarshipProvider: z.string().optional(),
  programName: z.string().optional(),
  targetUniversity: z.string().optional(),
  studentProfile: z.object({
    fullName: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    fieldOfStudy: z.string().optional().nullable(),
    educationLevel: z.string().optional().nullable(),
    targetDegree: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
  }).optional(),
  // For 'answer' action:
  conversation: z.array(z.object({
    role: z.enum(['interviewer', 'student']),
    content: z.string(),
  })).default([]),
  studentAnswer: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = InterviewSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { action, scholarshipTitle, scholarshipProvider, programName, targetUniversity, studentProfile, conversation, studentAnswer } = parsed.data

    const zai = await ZAI.create()

    if (action === 'start') {
      // Generate opening question + interview plan
      const systemPrompt = `You are an experienced scholarship interview panelist for prestigious international programs (Chevening, Fulbright, Rhodes, Mastercard Foundation, etc.). You conduct realistic, rigorous mock interviews.

Your job: open the interview with a realistic first question that a top scholarship panel would ask. Make it specific to the student's background and the target scholarship.

OUTPUT FORMAT (JSON only, no markdown, no preamble):
{
  "greeting": "<2-3 sentence warm professional greeting>",
  "openingQuestion": "<the first interview question — specific, challenging, realistic>",
  "questionCategory": "personal_background|academic|leadership|scholarship_fit|current_affairs|future_vision|behavioral",
  "interviewPlan": [
    "<topic 1 you plan to cover>",
    "<topic 2>",
    "<topic 3>",
    "<topic 4>",
    "<topic 5>"
  ],
  "tips": ["<tip for this question>", "<tip 2>"]
}

Be rigorous but encouraging. The question should make the student think — not a softball.`
      const userPrompt = `SCHOLARSHIP: ${scholarshipTitle || 'General international scholarship'}
${scholarshipProvider ? `PROVIDER: ${scholarshipProvider}` : ''}
${programName ? `PROGRAM: ${programName}` : ''}
${targetUniversity ? `UNIVERSITY: ${targetUniversity}` : ''}

STUDENT PROFILE:
${JSON.stringify(studentProfile || {}, null, 2)}

Open the mock interview. Generate the first question.`

      const completion = await zai.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
      })
      const raw = completion.choices?.[0]?.message?.content ?? ''
      const jsonText = extractJson(raw)
      try {
        const result = JSON.parse(jsonText)
        return NextResponse.json({ ...result, action: 'start', generatedAt: new Date().toISOString() })
      } catch {
        return NextResponse.json({ error: 'Failed to parse', raw }, { status: 502 })
      }
    }

    // action === 'answer'
    if (!studentAnswer) {
      return NextResponse.json({ error: 'studentAnswer required for answer action' }, { status: 400 })
    }

    const systemPrompt = `You are an experienced scholarship interview panelist. The student just answered your question. Your job:

1. Give brief, honest feedback on their answer (2-3 sentences — what worked, what didn't)
2. Score the answer 0-100 (rigor: 90+ = outstanding, 75+ = strong, 60+ = solid, <60 = needs work)
3. Ask the NEXT follow-up question that a real panel would ask

OUTPUT FORMAT (JSON only):
{
  "feedback": "<2-3 sentence honest feedback>",
  "score": <number 0-100>,
  "scoreLabel": "<Outstanding|Strong|Solid|Needs Work>",
  "strengths": ["<specific strength>"],
  "improvements": ["<specific improvement>"],
  "nextQuestion": "<the next interview question>",
  "questionCategory": "<category>",
  "isFinal": <boolean — true if interview should end after this>,
  "finalSummary": "<only if isFinal=true: overall interview assessment>"
}

Rules:
- Don't be overly generous — top scholarships reject 95% of applicants
- Push the student with harder follow-ups when they give vague answers
- After 5-6 questions, set isFinal=true and give a comprehensive summary
- The summary should cover: communication, intellectual depth, leadership, fit, overall readiness`
      const conversationText = conversation.map((c) => `${c.role.toUpperCase()}: ${c.content}`).join('\n\n')
      const userPrompt = `INTERVIEW CONTEXT:
Scholarship: ${scholarshipTitle || 'General'}
Student profile: ${JSON.stringify(studentProfile || {}, null, 2)}

CONVERSATION SO FAR:
${conversationText}

STUDENT'S LATEST ANSWER:
"""
${studentAnswer}
"""

Respond with feedback + next question per the system instructions.`

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
    })
    const raw = completion.choices?.[0]?.message?.content ?? ''
    const jsonText = extractJson(raw)
    try {
      const result = JSON.parse(jsonText)
      return NextResponse.json({ ...result, action: 'answer', generatedAt: new Date().toISOString() })
    } catch {
      return NextResponse.json({ error: 'Failed to parse', raw }, { status: 502 })
    }
  } catch (err: any) {
    console.error('[AI Interview] error:', err)
    return NextResponse.json(
      { error: 'Interview failed', message: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}

function extractJson(raw: string): string {
  let text = raw
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fence) text = fence[1]
  const first = text.indexOf('{')
  const last = text.lastIndexOf('}')
  if (first !== -1 && last !== -1) text = text.slice(first, last + 1)
  return text
}
