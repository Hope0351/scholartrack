/**
 * ScholarTrack utility helpers
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// shadcn/ui cn helper (class merge)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Safe JSON parse for Prisma stringified fields (tags, coverage, etc.)
export function parseJSON<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

// Days until a deadline (negative if past)
export function daysUntil(date: Date | string | null | undefined): number | null {
  if (!date) return null
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = d.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Format USD amounts (k/M)
export function formatMoney(usd: number | null | undefined): string {
  if (!usd) return '—'
  if (usd >= 1_000_000) return `$${(usd / 1_000_000).toFixed(1)}M`
  if (usd >= 1_000) return `$${(usd / 1_000).toFixed(0)}K`
  return `$${usd}`
}

// Format date for display
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'Rolling / Varies'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Color for match score (0-100)
export function scoreColor(score: number): string {
  if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200'
  if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200'
  if (score >= 50) return 'text-orange-600 bg-orange-50 border-orange-200'
  return 'text-rose-600 bg-rose-50 border-rose-200'
}

// Color for application status
export function statusColor(status: string): string {
  const map: Record<string, string> = {
    interested: 'bg-slate-100 text-slate-700 border-slate-200',
    researching: 'bg-sky-50 text-sky-700 border-sky-200',
    preparing: 'bg-amber-50 text-amber-700 border-amber-200',
    submitted: 'bg-violet-50 text-violet-700 border-violet-200',
    interview: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    offered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    withdrawn: 'bg-slate-100 text-slate-500 border-slate-200',
  }
  return map[status] || 'bg-slate-100 text-slate-700 border-slate-200'
}

// Competitiveness badge
export function competitivenessColor(level: string | null | undefined): string {
  if (!level) return 'bg-slate-100 text-slate-600'
  const map: Record<string, string> = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-orange-100 text-orange-700',
    very_high: 'bg-rose-100 text-rose-700',
  }
  return map[level] || 'bg-slate-100 text-slate-600'
}

// Funding type label
export function fundingTypeLabel(t: string): string {
  const map: Record<string, string> = {
    full: 'Full Funding',
    partial: 'Partial Funding',
    tuition_only: 'Tuition Only',
    stipend: 'Stipend Only',
  }
  return map[t] || t
}

// Level label
export function levelLabel(l: string): string {
  const map: Record<string, string> = {
    bachelors: "Bachelor's",
    masters: "Master's",
    phd: 'PhD',
    postdoc: 'Postdoc',
    research: 'Research / Fellowship',
    any: 'Any Level',
  }
  return map[l] || l
}
