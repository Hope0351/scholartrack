'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, Search, Sparkles, FileText, FolderOpen, BookOpen,
  LayoutDashboard, Award, Bell, ChevronRight, X, Menu, Loader2,
  Target, Calendar, TrendingUp, Heart, ArrowRight, CheckCircle2, GitCompare,
  AlertCircle, Lightbulb, Star, Clock, MapPin, DollarSign, Users,
  Bot, PenLine, FileCheck, Globe, ChevronLeft, Bookmark, BookmarkCheck,
  ExternalLink, Filter, RefreshCw, Plus, Edit3, Download, ThumbsUp,
  ThumbsDown, Zap, Shield, Rocket, Brain, MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  Sheet as MobileSheet,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  PieChart as RechartsPieChart, Pie as RechartsPie, Cell as RechartsCell,
  BarChart as RechartsBarChart, Bar as RechartsBar,
  XAxis as RechartsXAxis, YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  parseJSON, daysUntil, formatMoney, formatDate, scoreColor, statusColor,
  competitivenessColor, fundingTypeLabel, levelLabel,
} from '@/lib/utils'

// ============================================================
// Types
// ============================================================
type View = 'landing' | 'dashboard' | 'browse' | 'scholarship' | 'matcher' | 'essay' | 'tracker' | 'documents' | 'resources' | 'eligibility' | 'recletter' | 'interview' | 'compare' | 'calendar' | 'analytics' | 'profile'

type Profile = {
  id: string
  fullName: string | null
  country: string | null
  city: string | null
  educationLevel: string | null
  currentSchool: string | null
  fieldOfStudy: string | null
  gpa: number | null
  graduationYear: number | null
  targetCountries: string | null
  targetDegree: string | null
  targetField: string | null
  financialNeed: string | null
  budget: number | null
  languages: string | null
  bio: string | null
  onboardingComplete: boolean
}

type Scholarship = {
  id: string
  slug: string
  title: string
  provider: string
  description: string
  eligibility: string
  benefits: string
  applicationUrl: string
  level: string
  fundedBy: string | null
  hostCountries: string
  eligibleCountries: string | null
  fieldsOfStudy: string
  fundingType: string
  coverage: string | null
  amount: number | null
  duration: string | null
  deadline: string | null
  deadlineType: string | null
  competitiveness: string | null
  tags: string | null
  featured: boolean
}

type Resource = {
  id: string
  slug: string
  title: string
  category: string
  type: string
  summary: string
  content: string
  readMinutes: number | null
  tags: string | null
  featured: boolean
}

type Application = {
  id: string
  status: string
  progress: number
  notes: string | null
  matchScore: number | null
  matchReasons: string | null
  scholarship: Scholarship
}

type Match = {
  scholarship: {
    id: string
    slug: string
    title: string
    provider: string
    level: string
    fundedBy: string | null
    hostCountries: string
    fieldsOfStudy: string
    fundingType: string
    amount: number | null
    deadline: string | null
    competitiveness: string | null
    applicationUrl: string
  }
  score: number
  reasons: string[]
  gaps: string[]
  recommendation: string
}

// ============================================================
// MAIN APP
// ============================================================
export default function Home() {
  const [view, setView] = useState<View>('landing')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)

  const navigate = (v: View, scholarship?: Scholarship) => {
    setView(v)
    if (scholarship) setSelectedScholarship(scholarship)
    setMobileNavOpen(false)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <TopNav view={view} navigate={navigate} onMobileMenu={() => setMobileNavOpen(true)} />
      <MobileNavSheet
        open={mobileNavOpen}
        onOpenChange={setMobileNavOpen}
        view={view}
        navigate={navigate}
      />
      <AnimatePresence mode="wait">
        <motion.main
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {view === 'landing' && <LandingView navigate={navigate} />}
          {view === 'dashboard' && <DashboardView navigate={navigate} />}
          {view === 'browse' && <BrowseView navigate={navigate} />}
          {view === 'scholarship' && selectedScholarship && (
            <ScholarshipDetailView
              scholarship={selectedScholarship}
              navigate={navigate}
            />
          )}
          {view === 'matcher' && <MatcherView navigate={navigate} />}
          {view === 'essay' && <EssayView />}
          {view === 'tracker' && <TrackerView navigate={navigate} />}
          {view === 'documents' && <DocumentsView />}
          {view === 'resources' && <ResourcesView />}
          {view === 'eligibility' && selectedScholarship && (
            <EligibilityView scholarship={selectedScholarship} navigate={navigate} />
          )}
          {view === 'recletter' && <RecLetterView />}
          {view === 'interview' && <InterviewView />}
          {view === 'compare' && <CompareView navigate={navigate} />}
          {view === 'calendar' && <CalendarView navigate={navigate} />}
          {view === 'analytics' && <AnalyticsView navigate={navigate} />}
          {view === 'profile' && <ProfileView navigate={navigate} />}
        </motion.main>
      </AnimatePresence>
      <Footer navigate={navigate} />
    </div>
  )
}

// ============================================================
// TOP NAV
// ============================================================
function TopNav({
  view, navigate, onMobileMenu,
}: { view: View; navigate: (v: View, s?: Scholarship) => void; onMobileMenu: () => void }) {
  const navItems: { v: View; label: string; icon: any }[] = [
    { v: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { v: 'browse', label: 'Scholarships', icon: Award },
    { v: 'matcher', label: 'AI Matcher', icon: Sparkles },
    { v: 'essay', label: 'Essay Lab', icon: PenLine },
    { v: 'interview', label: 'Mock Interview', icon: MessageSquare },
    { v: 'compare', label: 'Compare', icon: GitCompare },
    { v: 'tracker', label: 'Tracker', icon: Target },
    { v: 'calendar', label: 'Calendar', icon: Calendar },
    { v: 'analytics', label: 'Analytics', icon: TrendingUp },
    { v: 'documents', label: 'Documents', icon: FolderOpen },
    { v: 'resources', label: 'Resources', icon: BookOpen },
    { v: 'recletter', label: 'Rec Letters', icon: Bot },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md dark:bg-stone-900/90 dark:border-stone-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('landing')} className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 shadow-sm">
            <GraduationCap className="absolute inset-0 m-auto h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-base font-bold tracking-tight text-stone-900">ScholarTrack</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-amber-700">Africa</span>
          </div>
        </button>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = view === item.v
            return (
              <button
                key={item.v}
                onClick={() => navigate(item.v)}
                title={item.label}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            size="sm"
            onClick={() => navigate('matcher')}
            className="hidden bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm hover:from-amber-700 hover:to-orange-700 sm:flex"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Find My Match
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={onMobileMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

// ============================================================
// MOBILE NAV SHEET
// ============================================================
function MobileNavSheet({
  open, onOpenChange, view, navigate,
}: { open: boolean; onOpenChange: (o: boolean) => void; view: View; navigate: (v: View, s?: Scholarship) => void }) {
  const navItems: { v: View; label: string; icon: any }[] = [
    { v: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { v: 'browse', label: 'Browse Scholarships', icon: Award },
    { v: 'matcher', label: 'AI Matcher', icon: Sparkles },
    { v: 'essay', label: 'Essay Lab', icon: PenLine },
    { v: 'interview', label: 'AI Mock Interview', icon: MessageSquare },
    { v: 'compare', label: 'Compare Scholarships', icon: GitCompare },
    { v: 'tracker', label: 'Application Tracker', icon: Target },
    { v: 'calendar', label: 'Deadline Calendar', icon: Calendar },
    { v: 'analytics', label: 'Analytics', icon: TrendingUp },
    { v: 'documents', label: 'Document Vault', icon: FolderOpen },
    { v: 'resources', label: 'Resources Library', icon: BookOpen },
    { v: 'recletter', label: 'Rec Letter Drafter', icon: Bot },
  ]
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="relative h-7 w-7 overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600">
              <GraduationCap className="absolute inset-0 m-auto h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            ScholarTrack
          </SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = view === item.v
            return (
              <button
                key={item.v}
                onClick={() => navigate(item.v)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

// ============================================================
// LANDING VIEW
// ============================================================
function LandingView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [stats, setStats] = useState<{ scholarships: number; resources: number } | null>(null)
  const [featured, setFeatured] = useState<Scholarship[]>([])

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => {
        setStats({ scholarships: d.stats.totalScholarships, resources: d.stats.totalResources })
        setFeatured(d.featured)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-500 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-rose-500 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium text-amber-200">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Scholarship Platform for African Students
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your path to{' '}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  world-class education
                </span>{' '}
                starts here.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
                ScholarTrack curates {stats?.scholarships ?? 24}+ international scholarships, uses AI to match your profile
                to the right opportunities, and guides you through every step — from essay to interview.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate('matcher')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:from-amber-600 hover:to-orange-600"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find My Scholarships
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('browse')}
                  className="border-stone-600 bg-stone-900/40 text-white hover:bg-stone-800 hover:text-white"
                >
                  Browse All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="mt-12 flex flex-wrap gap-6 text-sm text-stone-400">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" /> Verified scholarships
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-amber-400" /> AI eligibility check
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-rose-400" /> 15+ countries
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto max-w-md">
                {/* Floating cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -left-8 top-8 z-20 w-64 rounded-2xl border border-stone-700 bg-stone-800/95 p-4 shadow-2xl backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-xs font-medium text-stone-300">AI Match Score</div>
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white">87%</div>
                  <div className="text-xs text-emerald-400">+ Chevening Scholarship</div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-700">
                    <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -right-4 top-40 z-20 w-56 rounded-2xl border border-stone-700 bg-stone-800/95 p-4 shadow-2xl backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <PenLine className="h-4 w-4 text-rose-400" />
                    <div className="text-xs font-medium text-stone-300">Essay Coach</div>
                  </div>
                  <p className="mt-2 text-xs text-stone-400">
                    "Strengthen your opening with a specific project..."
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-amber-400">
                    <Zap className="h-3 w-3" /> 5 suggestions ready
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 left-4 z-20 w-60 rounded-2xl border border-stone-700 bg-stone-800/95 p-4 shadow-2xl backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <div className="text-xs font-medium text-stone-300">Deadline Alert</div>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white">Rhodes Scholarship</div>
                  <div className="text-xs text-rose-400">22 days remaining</div>
                </motion.div>

                {/* Background card */}
                <div className="aspect-[3/4] w-full rounded-3xl border border-stone-700 bg-gradient-to-br from-stone-800 to-stone-900 p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600" />
                        <div>
                          <div className="text-sm font-semibold text-white">ScholarTrack</div>
                          <div className="text-[10px] text-stone-400">Dashboard</div>
                        </div>
                      </div>
                      <Bell className="h-4 w-4 text-stone-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-stone-800 p-3">
                        <div className="text-[10px] text-stone-500">Applications</div>
                        <div className="text-xl font-bold text-white">7</div>
                      </div>
                      <div className="rounded-xl bg-stone-800 p-3">
                        <div className="text-[10px] text-stone-500">Saved</div>
                        <div className="text-xl font-bold text-white">12</div>
                      </div>
                      <div className="rounded-xl bg-stone-800 p-3">
                        <div className="text-[10px] text-stone-500">Essays</div>
                        <div className="text-xl font-bold text-white">3</div>
                      </div>
                      <div className="rounded-xl bg-stone-800 p-3">
                        <div className="text-[10px] text-stone-500">Avg Match</div>
                        <div className="text-xl font-bold text-emerald-400">82%</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-lg bg-stone-800/60 p-3">
                          <div className="flex items-center justify-between">
                            <div className="h-3 w-2/3 rounded bg-stone-700" />
                            <div className="h-5 w-12 rounded-full bg-emerald-500/20" />
                          </div>
                          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-700">
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400" style={{ width: `${60 + i * 10}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-2 gap-6 border-t border-stone-700/50 pt-10 sm:grid-cols-4">
            {[
              { label: 'Scholarships', value: stats?.scholarships ?? '—', icon: Award },
              { label: 'Host Countries', value: '15+', icon: Globe },
              { label: 'Resources', value: stats?.resources ?? '—', icon: BookOpen },
              { label: 'AI Tools', value: '4', icon: Bot },
            ].map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <s.icon className="mb-2 h-5 w-5 text-amber-400" />
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-stone-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4 border-amber-300 bg-amber-50 text-amber-800">
            Everything you need
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            One platform. Complete scholarship workflow.
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            From discovery to submission — powered by AI, grounded in real opportunities.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: 'AI Scholarship Matcher',
              desc: 'Our engine analyzes your profile — academic background, target countries, financial need — and ranks scholarships by eligibility fit with detailed reasoning.',
              color: 'from-amber-500 to-orange-600',
              onClick: () => navigate('matcher'),
            },
            {
              icon: PenLine,
              title: 'AI Essay Lab',
              desc: 'Submit your SOP or personal statement. Get instant scoring, specific feedback, structural suggestions, and a rewritten version that preserves your voice.',
              color: 'from-rose-500 to-pink-600',
              onClick: () => navigate('essay'),
            },
            {
              icon: FileCheck,
              title: 'Eligibility Checker',
              desc: 'Before you spend 20 hours on an application, know if you qualify. Our AI checks your profile against each criterion and flags gaps.',
              color: 'from-emerald-500 to-teal-600',
              onClick: () => navigate('browse'),
            },
            {
              icon: Target,
              title: 'Application Tracker',
              desc: 'Track status, deadlines, documents, and notes for every application. Visual progress bars and deadline countdowns keep you on schedule.',
              color: 'from-violet-500 to-purple-600',
              onClick: () => navigate('tracker'),
            },
            {
              icon: BookOpen,
              title: 'Resources Library',
              desc: 'In-depth guides on essays, recommendations, TOEFL/IELTS, visas, interviews, and finances — written specifically for African applicants.',
              color: 'from-sky-500 to-blue-600',
              onClick: () => navigate('resources'),
            },
            {
              icon: Bot,
              title: 'AI Recommendation Letter',
              desc: 'Draft professional, evidence-based recommendation letters from key points. Recommenders can edit and sign — saves everyone time.',
              color: 'from-stone-600 to-stone-800',
              onClick: () => navigate('recletter'),
            },
          ].map((f) => (
            <Card
              key={f.title}
              className="group cursor-pointer overflow-hidden border-stone-200 transition-all hover:border-stone-300 hover:shadow-lg"
              onClick={f.onClick}
            >
              <CardHeader>
                <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-sm`}>
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription className="text-stone-600">{f.desc}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <span className="inline-flex items-center text-sm font-medium text-amber-700 group-hover:text-amber-800">
                  Open
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FEATURED SCHOLARSHIPS */}
      {featured.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-stone-900">Featured Scholarships</h2>
                <p className="mt-2 text-stone-600">Top-tier programs actively recruiting African students.</p>
              </div>
              <Button variant="outline" onClick={() => navigate('browse')}>
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.slice(0, 6).map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} onClick={() => navigate('scholarship', s)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Brain className="mx-auto mb-6 h-12 w-12" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop searching. Start matching.
          </h2>
          <p className="mt-4 text-lg text-amber-50">
            Let our AI analyze your profile and surface the opportunities you actually have a shot at.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('matcher')}
            className="mt-8 bg-white text-amber-700 shadow-xl hover:bg-stone-50"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Run AI Match
          </Button>
        </div>
      </section>
    </div>
  )
}

// ============================================================
// SCHOLARSHIP CARD
// ============================================================
function ScholarshipCard({
  scholarship: s, onClick, compact,
}: { scholarship: Scholarship; onClick: () => void; compact?: boolean }) {
  const hosts = parseJSON<string[]>(s.hostCountries, [])
  const fields = parseJSON<string[]>(s.fieldsOfStudy, [])
  const days = daysUntil(s.deadline)
  const coverage = parseJSON<string[]>(s.coverage, [])

  return (
    <Card
      onClick={onClick}
      className="group flex cursor-pointer flex-col overflow-hidden border-stone-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <Badge className={competitivenessColor(s.competitiveness)}>
                {s.competitiveness?.replace('_', ' ') || 'standard'}
              </Badge>
              <Badge variant="outline" className="border-stone-300 text-stone-600">
                {levelLabel(s.level)}
              </Badge>
              {s.featured && (
                <Badge className="bg-amber-100 text-amber-800">
                  <Star className="mr-1 h-3 w-3" /> Featured
                </Badge>
              )}
            </div>
            <CardTitle className="text-base leading-tight group-hover:text-amber-800">
              {s.title}
            </CardTitle>
            <div className="mt-1 text-xs text-stone-500">{s.provider}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className={compact ? 'line-clamp-2 text-xs text-stone-600' : 'line-clamp-3 text-sm text-stone-600'}>
          {s.description}
        </p>
        <div className="mt-3 space-y-1.5 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-stone-400" />
            <span>{hosts.slice(0, 3).join(', ') || 'Worldwide'}{hosts.length > 3 ? ` +${hosts.length - 3}` : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-3.5 w-3.5 text-stone-400" />
            <span>
              {fundingTypeLabel(s.fundingType)}
              {s.amount ? ` · ${formatMoney(s.amount)}/yr` : ''}
            </span>
          </div>
          {days !== null && (
            <div className="flex items-center gap-2">
              <Calendar className={`h-3.5 w-3.5 ${days < 30 ? 'text-rose-500' : 'text-stone-400'}`} />
              <span className={days < 30 ? 'font-medium text-rose-600' : ''}>
                {days > 0 ? `${days} days left` : 'Deadline passed'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t border-stone-100 bg-stone-50/50 pt-3">
        <Button variant="ghost" size="sm" className="ml-auto text-amber-700 hover:bg-amber-50 hover:text-amber-800">
          View details <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// ============================================================
// DASHBOARD VIEW
// ============================================================
function DashboardView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState />

  const { user, stats, applications, savedScholarships, upcomingDeadlines, featured, activities } = data

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Welcome back, {user.profile?.fullName?.split(' ')[0] || 'Scholar'} 
          </h1>
          <p className="mt-1 text-stone-600">
            {user.profile?.fieldOfStudy} at {user.profile?.currentSchool} · {user.profile?.country}
          </p>
        </div>
        <Button onClick={() => navigate('matcher')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700">
          <Sparkles className="mr-2 h-4 w-4" /> Run AI Match
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        <StatCard label="Profile" value={`${stats.profileCompletion}%`} icon={Users} color="text-amber-600 bg-amber-50" sub="complete" />
        <StatCard label="Applications" value={stats.totalApplications} icon={Target} color="text-violet-600 bg-violet-50" sub="in progress" />
        <StatCard label="Saved" value={stats.totalSaved} icon={Bookmark} color="text-rose-600 bg-rose-50" sub="scholarships" />
        <StatCard label="Essays" value={stats.totalEssays} icon={PenLine} color="text-emerald-600 bg-emerald-50" sub="in lab" />
      </div>

      {/* Profile completion banner */}
      {stats.profileCompletion < 100 && (
        <Card className="mt-6 border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-900">Complete your profile for better AI matches</div>
              <div className="text-xs text-amber-700">Profiles with full academic + financial details get 35% more accurate match scores.</div>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 bg-white text-amber-800 hover:bg-amber-100" onClick={() => navigate('profile')}>
              Complete now
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Applications in progress */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Applications</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('tracker')}>
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications?.length === 0 ? (
                <EmptyState
                  icon={Target}
                  title="No applications yet"
                  desc="Browse scholarships and start tracking your first application."
                  action={<Button onClick={() => navigate('browse')} size="sm" className="mt-3">Browse Scholarships</Button>}
                />
              ) : (
                applications?.map((app: Application) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 rounded-lg border border-stone-200 p-3 transition-colors hover:bg-stone-50"
                  >
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => navigate('scholarship', app.scholarship)}
                        className="block truncate text-left text-sm font-medium text-stone-900 hover:text-amber-700"
                      >
                        {app.scholarship.title}
                      </button>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs ${statusColor(app.status)}`}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-stone-500">{app.scholarship.provider}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-2">
                        {app.matchScore && (
                          <div className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${scoreColor(app.matchScore)}`}>
                            {app.matchScore}% match
                          </div>
                        )}
                        <div className="w-20">
                          <Progress value={app.progress} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-500" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingDeadlines?.length === 0 ? (
                <p className="text-sm text-stone-500">No deadlines in the next 60 days.</p>
              ) : (
                <div className="space-y-2">
                  {upcomingDeadlines?.slice(0, 5).map((s: Scholarship) => {
                    const d = daysUntil(s.deadline)
                    return (
                      <button
                        key={s.id}
                        onClick={() => navigate('scholarship', s)}
                        className="flex w-full items-center justify-between rounded-lg border border-stone-200 p-3 text-left hover:bg-stone-50"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-stone-900">{s.title}</div>
                          <div className="text-xs text-stone-500">{s.provider}</div>
                        </div>
                        <div className="ml-3 flex-shrink-0 text-right">
                          <div className={`text-sm font-semibold ${d! < 14 ? 'text-rose-600' : 'text-stone-700'}`}>
                            {d} days
                          </div>
                          <div className="text-xs text-stone-500">{formatDate(s.deadline)}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Recent activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities?.slice(0, 6).map((a: any) => (
                  <div key={a.id} className="flex gap-3">
                    <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    <div className="flex-1">
                      <div className="text-sm text-stone-700">{a.description}</div>
                      <div className="text-xs text-stone-500">{formatDate(a.createdAt)}</div>
                    </div>
                  </div>
                ))}
                {activities?.length === 0 && (
                  <p className="text-sm text-stone-500">No recent activity.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recommended */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-amber-600" />
                Recommended Next
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-stone-700" onClick={() => navigate('matcher')}>
                <Sparkles className="mr-2 h-4 w-4 text-amber-600" /> Run AI Matcher
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-stone-700" onClick={() => navigate('essay')}>
                <PenLine className="mr-2 h-4 w-4 text-rose-600" /> Draft your SOP
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-stone-700" onClick={() => navigate('resources')}>
                <BookOpen className="mr-2 h-4 w-4 text-sky-600" /> Read visa guides
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured scholarships */}
      {featured?.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-stone-900">Featured for you</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((s: Scholarship) => (
              <ScholarshipCard key={s.id} scholarship={s} onClick={() => navigate('scholarship', s)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  label, value, icon: Icon, color, sub,
}: { label: string; value: any; icon: any; color: string; sub: string }) {
  return (
    <Card className="border-stone-200">
      <CardContent className="py-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">{value}</div>
            <div className="text-xs text-stone-500">{label} {sub}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({
  icon: Icon, title, desc, action,
}: { icon: any; title: string; desc: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Icon className="mb-3 h-8 w-8 text-stone-300" />
      <div className="text-sm font-medium text-stone-700">{title}</div>
      <div className="mt-1 text-xs text-stone-500">{desc}</div>
      {action}
    </div>
  )
}

function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <p className="text-sm text-stone-500">{label}</p>
      </div>
    </div>
  )
}

// Skeleton grid for browse view
function BrowseSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-stone-200">
          <CardHeader>
            <div className="flex gap-1.5">
              <div className="h-5 w-16 animate-pulse rounded-full bg-stone-200" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-stone-200" />
            </div>
            <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-stone-100" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-stone-100" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-stone-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-stone-100" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-2.5 w-1/3 animate-pulse rounded bg-stone-100" />
              <div className="h-2.5 w-2/5 animate-pulse rounded bg-stone-100" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Dashboard skeleton
function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between">
        <div className="space-y-2">
          <div className="h-7 w-64 animate-pulse rounded bg-stone-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-stone-100" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-lg bg-stone-200" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-stone-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-stone-200" />
                <div className="space-y-1.5">
                  <div className="h-6 w-12 animate-pulse rounded bg-stone-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-stone-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card><CardContent className="py-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-stone-100" />
            ))}
          </CardContent></Card>
        </div>
        <Card><CardContent className="py-6 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-stone-100" />
          ))}
        </CardContent></Card>
      </div>
    </div>
  )
}

// ============================================================
// BROWSE VIEW
// ============================================================
function BrowseView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ q: '', level: 'all', fundingType: 'all' })
  const [sortBy, setSortBy] = useState<'deadline' | 'amount' | 'title'>('deadline')

  const fetchScholarships = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.q) params.set('q', filters.q)
    if (filters.level !== 'all') params.set('level', filters.level)
    if (filters.fundingType !== 'all') params.set('fundingType', filters.fundingType)
    fetch(`/api/scholarships?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setScholarships(d.scholarships))
      .finally(() => setLoading(false))
  }, [filters])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchScholarships() }, [fetchScholarships])

  const sorted = useMemo(() => {
    const arr = [...scholarships]
    if (sortBy === 'deadline') {
      arr.sort((a, b) => {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      })
    } else if (sortBy === 'amount') {
      arr.sort((a, b) => (b.amount ?? 0) - (a.amount ?? 0))
    } else {
      arr.sort((a, b) => a.title.localeCompare(b.title))
    }
    return arr
  }, [scholarships, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Scholarship Database</h1>
        <p className="mt-1 text-stone-600">{scholarships.length} verified opportunities for African students.</p>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-stone-200">
        <CardContent className="py-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Search scholarships..."
                  value={filters.q}
                  onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filters.level} onValueChange={(v) => setFilters({ ...filters, level: v })}>
              <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="bachelors">Bachelor's</SelectItem>
                <SelectItem value="masters">Master's</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="any">Any Level</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.fundingType} onValueChange={(v) => setFilters({ ...filters, fundingType: v })}>
              <SelectTrigger><SelectValue placeholder="Funding" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Funding</SelectItem>
                <SelectItem value="full">Full Funding</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="tuition_only">Tuition Only</SelectItem>
                <SelectItem value="stipend">Stipend</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline (soonest)</SelectItem>
                <SelectItem value="amount">Amount (highest)</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <BrowseSkeleton />
      ) : sorted.length === 0 ? (
        <Card><CardContent className="py-12">
          <EmptyState icon={Award} title="No scholarships found" desc="Try adjusting your filters." />
        </CardContent></Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} onClick={() => navigate('scholarship', s)} />
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
// SCHOLARSHIP DETAIL VIEW
// ============================================================
function ScholarshipDetailView({
  scholarship: s, navigate,
}: { scholarship: Scholarship; navigate: (v: View, s?: Scholarship) => void }) {
  const { toast } = useToast()
  const hosts = parseJSON<string[]>(s.hostCountries, [])
  const fields = parseJSON<string[]>(s.fieldsOfStudy, [])
  const coverage = parseJSON<string[]>(s.coverage, [])
  const tags = parseJSON<string[]>(s.tags, [])
  const eligibleCountries = parseJSON<string[]>(s.eligibleCountries, [])
  const days = daysUntil(s.deadline)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [addedToTracker, setAddedToTracker] = useState(false)

  useEffect(() => {
    fetch(`/api/scholarships/${s.id}/save`)
      .then((r) => r.json())
      .then((d) => setSaved(d.saved))
      .catch(() => {})
  }, [s.id])

  const toggleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/scholarships/${s.id}/save`, { method: 'POST' })
      const data = await res.json()
      setSaved(data.saved)
      toast({
        title: data.saved ? 'Scholarship saved' : 'Scholarship removed',
        description: data.saved
          ? `${s.title} added to your saved list.`
          : `${s.title} removed from your saved list.`,
      })
    } catch {
      toast({ title: 'Failed to update', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const addToTracker = async () => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scholarshipId: s.id, status: 'interested' }),
      })
      const data = await res.json()
      setAddedToTracker(true)
      toast({
        title: data.created ? 'Added to tracker' : 'Already in tracker',
        description: data.created
          ? `${s.title} added as "interested". Open tracker to update progress.`
          : `This scholarship is already in your tracker.`,
      })
    } catch {
      toast({ title: 'Failed to add to tracker', variant: 'destructive' })
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('browse')}
        className="mb-4 inline-flex items-center text-sm text-stone-500 hover:text-stone-700"
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to scholarships
      </button>

      {/* Header */}
      <Card className="overflow-hidden border-stone-200">
        <div className="bg-gradient-to-br from-stone-900 to-amber-950 p-6 text-white sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={competitivenessColor(s.competitiveness)}>
              {s.competitiveness?.replace('_', ' ') || 'standard'} competition
            </Badge>
            <Badge variant="outline" className="border-stone-600 text-stone-200">{levelLabel(s.level)}</Badge>
            {s.featured && <Badge className="bg-amber-400 text-amber-950"><Star className="mr-1 h-3 w-3" /> Featured</Badge>}
          </div>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{s.title}</h1>
          <p className="mt-1 text-stone-300">{s.provider}{s.fundedBy && ` · Funded by ${s.fundedBy}`}</p>

          {days !== null && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm">
              <Calendar className={`h-4 w-4 ${days! < 30 ? 'text-rose-300' : 'text-amber-300'}`} />
              <span>
                {days > 0 ? (
                  <>Deadline in <span className="font-semibold">{days} days</span> ({formatDate(s.deadline)})</>
                ) : 'Deadline passed'}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
            >
              <a href={s.applicationUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Apply on official site
              </a>
            </Button>
            <Button variant="outline" onClick={() => navigate('eligibility', s)}>
              <FileCheck className="mr-2 h-4 w-4" /> Check eligibility with AI
            </Button>
            <Button
              variant="outline"
              onClick={addToTracker}
              disabled={addedToTracker}
            >
              <Target className="mr-2 h-4 w-4" />
              {addedToTracker ? 'In tracker' : 'Add to tracker'}
            </Button>
            <Button
              variant={saved ? 'default' : 'outline'}
              onClick={toggleSave}
              disabled={saving}
              className={saved ? 'bg-rose-600 text-white hover:bg-rose-700' : ''}
            >
              {saved ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm leading-relaxed text-stone-700">{s.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Eligibility</CardTitle></CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm leading-relaxed text-stone-700">{s.eligibility}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Benefits & Coverage</CardTitle></CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm leading-relaxed text-stone-700">{s.benefits}</p>
              {coverage.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {coverage.map((c) => (
                    <Badge key={c} variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> {c}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Quick Facts</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-stone-500">Funding</span>
                <span className="font-medium text-stone-900 text-right">{fundingTypeLabel(s.fundingType)}</span>
              </div>
              {s.amount && (
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Amount</span>
                  <span className="font-medium text-stone-900 text-right">{formatMoney(s.amount)}/yr</span>
                </div>
              )}
              {s.duration && (
                <div className="flex justify-between gap-3">
                  <span className="text-stone-500">Duration</span>
                  <span className="font-medium text-stone-900 text-right">{s.duration}</span>
                </div>
              )}
              <Separator />
              <div>
                <div className="mb-1.5 text-stone-500">Host Countries</div>
                <div className="flex flex-wrap gap-1">
                  {hosts.map((h) => <Badge key={h} variant="secondary" className="text-xs">{h}</Badge>)}
                </div>
              </div>
              <div>
                <div className="mb-1.5 text-stone-500">Fields of Study</div>
                <div className="flex flex-wrap gap-1">
                  {fields.map((f) => <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>)}
                </div>
              </div>
              {eligibleCountries.length > 0 && (
                <div>
                  <div className="mb-1.5 text-stone-500">Eligible Countries</div>
                  <div className="flex flex-wrap gap-1">
                    {eligibleCountries.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                  </div>
                </div>
              )}
              {tags.length > 0 && (
                <div>
                  <div className="mb-1.5 text-stone-500">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {tags.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                <div>
                  <div className="text-sm font-medium text-amber-900">AI Tip</div>
                  <p className="mt-1 text-xs text-amber-800">
                    Use the Eligibility Checker before applying — it can save you 20+ hours on applications you wouldn't qualify for.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 border-amber-300 bg-white text-amber-800" onClick={() => navigate('eligibility', s)}>
                    Check eligibility
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// AI MATCHER VIEW
// ============================================================
function MatcherView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [matches, setMatches] = useState<Match[]>([])
  const [hasRun, setHasRun] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setProfile(d.user.profile))
      .catch(() => {})
  }, [])

  const runMatch = async () => {
    if (!profile) return
    setLoading(true)
    setMatches([])
    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            fullName: profile.fullName,
            country: profile.country,
            educationLevel: profile.educationLevel,
            fieldOfStudy: profile.fieldOfStudy,
            gpa: profile.gpa,
            graduationYear: profile.graduationYear,
            targetCountries: parseJSON(profile.targetCountries, []),
            targetDegree: profile.targetDegree,
            targetField: profile.targetField,
            financialNeed: profile.financialNeed,
            budget: profile.budget,
            languages: parseJSON(profile.languages, []),
            bio: profile.bio,
          },
          topN: 12,
        }),
      })
      const data = await response.json()
      setMatches(data.matches || [])
      setHasRun(true)
      toast({
        title: `Found ${(data.matches || []).length} matches`,
        description: (data.matches || []).length > 0
          ? `Top match: ${data.matches[0].scholarship.title} (${data.matches[0].score}% fit)`
          : 'Try completing more of your profile for better matches.',
      })
    } catch (e) {
      console.error(e)
      toast({ title: 'Match failed', description: 'Please try again.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge className="mb-3 bg-amber-100 text-amber-800">
          <Sparkles className="mr-1 h-3 w-3" /> AI-Powered
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Scholarship Matcher</h1>
        <p className="mt-1 text-stone-600">
          Our AI analyzes your profile against all scholarships in our database and ranks them by fit.
        </p>
      </div>

      {/* Profile summary card */}
      {profile && (
        <Card className="mb-6 border-stone-200 bg-gradient-to-br from-stone-50 to-amber-50/40">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span>Your Profile</span>
              <Badge variant="outline" className="border-amber-300 bg-white text-amber-700">
                {profile.fullName || 'Anonymous'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <ProfileField label="Country" value={profile.country} />
              <ProfileField label="Field" value={profile.fieldOfStudy} />
              <ProfileField label="GPA" value={profile.gpa?.toString()} />
              <ProfileField label="Target Degree" value={profile.targetDegree} />
              <ProfileField label="Target Countries" value={parseJSON(profile.targetCountries, []).join(', ')} />
              <ProfileField label="Financial Need" value={profile.financialNeed} />
              <ProfileField label="Languages" value={parseJSON(profile.languages, []).join(', ')} />
              <ProfileField label="Education Level" value={profile.educationLevel} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Run button */}
      <div className="mb-8 flex flex-col items-center justify-center gap-4 py-8">
        {!hasRun && !loading && (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <p className="mb-4 max-w-md text-sm text-stone-600">
              Click below to run the AI matcher. It will analyze {`{24}`} scholarships and return your top matches with scores and reasoning.
            </p>
          </div>
        )}
        <Button
          size="lg"
          onClick={runMatch}
          disabled={loading}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:from-amber-700 hover:to-orange-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" /> {hasRun ? 'Re-run Match' : 'Run AI Match'}
            </>
          )}
        </Button>
        {loading && (
          <p className="text-xs text-stone-500">This takes 10-20 seconds while the AI analyzes each scholarship.</p>
        )}
      </div>

      {/* Results */}
      {hasRun && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">
              {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
            </h2>
            <Badge variant="outline">Sorted by match score</Badge>
          </div>

          {matches.length === 0 ? (
            <Card><CardContent className="py-12">
              <EmptyState
                icon={AlertCircle}
                title="No strong matches"
                desc="Try completing more of your profile for better matches."
              />
            </CardContent></Card>
          ) : (
            matches.map((m, i) => <MatchCard key={i} match={m} navigate={navigate} />)
          )}
        </div>
      )}
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <div className="text-xs text-stone-500">{label}</div>
      <div className="mt-0.5 font-medium text-stone-900">{value || '—'}</div>
    </div>
  )
}

// Fetch a full scholarship by ID and navigate to detail
async function navigateToMatchScholarship(id: string, navigate: (v: View, s?: Scholarship) => void) {
  try {
    const res = await fetch(`/api/scholarships/${id}`)
    const data = await res.json()
    if (data.scholarship) navigate('scholarship', data.scholarship)
  } catch (e) {
    console.error('Failed to fetch scholarship', e)
  }
}

function MatchCard({ match: m, navigate }: { match: Match; navigate: (v: View, s?: Scholarship) => void }) {
  const [expanded, setExpanded] = useState(false)
  const days = daysUntil(m.scholarship.deadline)

  return (
    <Card className="overflow-hidden border-stone-200 transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Score circle */}
          <div className="flex-shrink-0">
            <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${scoreColor(m.score)}`}>
              <div className="text-center">
                <div className="text-xl font-bold leading-none">{m.score}</div>
                <div className="text-[10px] uppercase tracking-wider">match</div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <button
                onClick={() => navigateToMatchScholarship(m.scholarship.id, navigate)}
                className="text-left text-base font-semibold text-stone-900 hover:text-amber-700"
              >
                {m.scholarship.title}
              </button>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{levelLabel(m.scholarship.level)}</Badge>
                {days !== null && days > 0 && (
                  <Badge variant="outline" className={`text-xs ${days < 30 ? 'border-rose-200 text-rose-700' : ''}`}>
                    {days}d left
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-1 text-sm text-stone-500">
              {m.scholarship.provider} · {m.scholarship.fundedBy}
            </div>
            <p className="mt-2 text-sm font-medium text-stone-700">{m.recommendation}</p>

            {expanded && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    <ThumbsUp className="h-3.5 w-3.5" /> Why it fits
                  </div>
                  <ul className="space-y-1.5">
                    {m.reasons.map((r, i) => (
                      <li key={i} className="flex gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {m.gaps.length > 0 && (
                  <div>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
                      <AlertCircle className="h-3.5 w-3.5" /> Gaps to address
                    </div>
                    <ul className="space-y-1.5">
                      {m.gaps.map((g, i) => (
                        <li key={i} className="flex gap-2 text-xs text-stone-700">
                          <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide' : 'Details'}
            <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================================
// ESSAY LAB VIEW
// ============================================================
function EssayView() {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [content, setContent] = useState('')
  const [targetProgram, setTargetProgram] = useState('')
  const [targetUniversity, setTargetUniversity] = useState('')
  const [essayType, setEssayType] = useState('sop')
  const [wordLimit, setWordLimit] = useState<number | ''>(750)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0

  const analyze = async () => {
    if (wordCount < 50) {
      setError('Essay must be at least 50 words.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/ai/essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || 'Untitled essay',
          prompt,
          type: essayType,
          content,
          targetProgram,
          targetUniversity,
          wordLimit: wordLimit || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to analyze')
      setResult(data)
      toast({
        title: `Essay scored: ${data.score}/100`,
        description: data.score >= 75
          ? 'Strong essay — minor revisions needed.'
          : data.score >= 60
          ? 'Solid foundation — significant revision recommended.'
          : 'Major rewrite recommended. Review suggestions below.',
      })
    } catch (e: any) {
      setError(e.message || 'Failed to analyze essay')
      toast({ title: 'Analysis failed', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge className="mb-3 bg-rose-100 text-rose-800">
          <PenLine className="mr-1 h-3 w-3" /> AI Essay Coach
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Essay Lab</h1>
        <p className="mt-1 text-stone-600">
          Paste your essay draft. Get instant scoring, specific feedback, and an AI-improved rewrite that preserves your voice.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Essay Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. SOP for Stanford CS Master's" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={essayType} onValueChange={setEssayType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sop">Statement of Purpose</SelectItem>
                      <SelectItem value="personal_statement">Personal Statement</SelectItem>
                      <SelectItem value="diversity">Diversity Statement</SelectItem>
                      <SelectItem value="research">Research Statement</SelectItem>
                      <SelectItem value="scholarship_specific">Scholarship-specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="wordLimit">Word Limit</Label>
                  <Input
                    id="wordLimit"
                    type="number"
                    value={wordLimit}
                    onChange={(e) => setWordLimit(e.target.value ? Number(e.target.value) : '')}
                    placeholder="750"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="program">Target Program</Label>
                  <Input id="program" value={targetProgram} onChange={(e) => setTargetProgram(e.target.value)} placeholder="MSc Computer Science" />
                </div>
                <div>
                  <Label htmlFor="university">Target University</Label>
                  <Input id="university" value={targetUniversity} onChange={(e) => setTargetUniversity(e.target.value)} placeholder="Stanford" />
                </div>
              </div>
              <div>
                <Label htmlFor="prompt">Original Prompt (optional)</Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste the essay prompt from the application..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Your Draft</CardTitle>
                <Badge variant="outline" className={wordCount > (wordLimit || 9999) ? 'border-rose-300 text-rose-700' : 'border-stone-300'}>
                  {wordCount} {wordLimit ? `/ ${wordLimit}` : ''} words
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your essay draft here..."
                rows={14}
                className="resize-y font-serif"
              />
              {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
              <Button
                onClick={analyze}
                disabled={loading || wordCount < 50}
                className="mt-4 w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                ) : (
                  <><Sparkles className="mr-2 h-4 w-4" /> Analyze with AI</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {!result && !loading && (
            <Card className="border-dashed border-stone-300">
              <CardContent className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <PenLine className="mb-3 h-10 w-10 text-stone-300" />
                <p className="text-sm font-medium text-stone-600">Your AI analysis will appear here</p>
                <p className="mt-1 text-xs text-stone-400">Score, strengths, weaknesses, specific suggestions, and a rewrite.</p>
              </CardContent>
            </Card>
          )}
          {loading && (
            <Card><CardContent className="flex h-96 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
                <p className="text-sm text-stone-500">Reading your essay carefully...</p>
              </div>
            </CardContent></Card>
          )}
          {result && (
            <>
              <Card className="border-stone-200">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-stone-500">Overall Score</div>
                      <div className={`text-4xl font-bold ${result.score >= 75 ? 'text-emerald-600' : result.score >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {result.score}/100
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-stone-500">Word Count</div>
                      <div className="text-2xl font-bold text-stone-900">{result.wordCount}</div>
                      {result.wordCountNote && <div className="text-xs text-stone-500">{result.wordCountNote}</div>}
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-sm leading-relaxed text-stone-700">{result.summary}</p>
                </CardContent>
              </Card>

              {result.strengths?.length > 0 && (
                <Card className="border-emerald-200">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base text-emerald-800">
                    <ThumbsUp className="h-4 w-4" /> Strengths
                  </CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.strengths.map((s: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-stone-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.weaknesses?.length > 0 && (
                <Card className="border-amber-200">
                  <CardHeader><CardTitle className="flex items-center gap-2 text-base text-amber-800">
                    <AlertCircle className="h-4 w-4" /> Areas to Improve
                  </CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.weaknesses.map((s: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-stone-700">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.suggestions?.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-base">Specific Suggestions</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {result.suggestions.map((s: any, i: number) => (
                      <div key={i} className="rounded-lg border border-stone-200 p-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs capitalize">{s.category}</Badge>
                        </div>
                        <div className="mt-2 text-sm font-medium text-stone-900">{s.issue}</div>
                        <div className="mt-1 text-sm text-stone-600">{s.fix}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {result.rewrite && (
                <Card className="border-rose-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base text-rose-800">
                        <Sparkles className="h-4 w-4" /> AI-Improved Version
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(result.rewrite)
                        }}
                      >
                        <Download className="mr-1 h-3 w-3" /> Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-96 overflow-y-auto rounded-lg bg-stone-50 p-4 font-serif text-sm leading-relaxed text-stone-800 whitespace-pre-line">
                      {result.rewrite}
                    </div>
                    <p className="mt-2 text-xs text-stone-500">
                      Use this as inspiration — always rewrite in your own voice and never submit AI-generated text as-is.
                    </p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// TRACKER VIEW
// ============================================================
function TrackerView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    setLoading(true)
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false))
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { refresh() }, [refresh])

  if (loading) return <DashboardSkeleton />
  if (!data) return null

  const { applications } = data

  const statusOrder = ['interested', 'researching', 'preparing', 'submitted', 'interview', 'offered', 'rejected', 'withdrawn']
  const grouped = statusOrder.map((status) => ({
    status,
    items: applications.filter((a: Application) => a.status === status),
  })).filter((g: any) => g.items.length > 0)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Application Tracker</h1>
          <p className="mt-1 text-stone-600">{applications.length} applications across {grouped.length} stages.</p>
        </div>
        <Button onClick={() => navigate('browse')} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add Application
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {statusOrder.map((status) => {
          const count = applications.filter((a: Application) => a.status === status).length
          return (
            <Card key={status} className="border-stone-200">
              <CardContent className="py-3 text-center">
                <div className="text-2xl font-bold text-stone-900">{count}</div>
                <div className="text-xs capitalize text-stone-500">{status.replace('_', ' ')}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {applications.length === 0 ? (
        <Card><CardContent className="py-12">
          <EmptyState
            icon={Target}
            title="No applications yet"
            desc="Browse scholarships and add them to your tracker."
            action={<Button onClick={() => navigate('browse')} className="mt-3">Browse Scholarships</Button>}
          />
        </CardContent></Card>
      ) : (
        <div className="space-y-6">
          {grouped.map((g: any) => (
            <div key={g.status}>
              <div className="mb-3 flex items-center gap-2">
                <Badge className={statusColor(g.status)}>{g.status.replace('_', ' ')}</Badge>
                <span className="text-sm text-stone-500">{g.items.length} {g.items.length === 1 ? 'app' : 'apps'}</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((app: Application) => (
                  <Card key={app.id} className="border-stone-200">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => navigate('scholarship', app.scholarship)}
                        className="text-left text-sm font-semibold text-stone-900 hover:text-amber-700"
                      >
                        {app.scholarship.title}
                      </button>
                      <div className="text-xs text-stone-500">{app.scholarship.provider}</div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      {app.matchScore && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-500">Match score</span>
                          <Badge className={scoreColor(app.matchScore)}>{app.matchScore}%</Badge>
                        </div>
                      )}
                      <div>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-stone-500">Progress</span>
                          <span className="font-medium text-stone-700">{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-1.5" />
                      </div>
                      {app.notes && (
                        <p className="text-xs italic text-stone-500 line-clamp-2">{app.notes}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================
// DOCUMENTS VIEW
// ============================================================
function DocumentsView() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState label="Loading documents..." />
  if (!data) return null

  const { documents } = data

  const docTypes = [
    { type: 'cv', label: 'CV / Resume', icon: FileText, color: 'bg-amber-100 text-amber-700' },
    { type: 'transcript', label: 'Transcripts', icon: FileCheck, color: 'bg-emerald-100 text-emerald-700' },
    { type: 'recommendation', label: 'Recommendations', icon: Users, color: 'bg-violet-100 text-violet-700' },
    { type: 'passport', label: 'Passport / ID', icon: Shield, color: 'bg-sky-100 text-sky-700' },
    { type: 'test_score', label: 'Test Scores', icon: Award, color: 'bg-rose-100 text-rose-700' },
    { type: 'essay', label: 'Essays', icon: PenLine, color: 'bg-orange-100 text-orange-700' },
    { type: 'certificate', label: 'Certificates', icon: Award, color: 'bg-stone-100 text-stone-700' },
    { type: 'other', label: 'Other', icon: FolderOpen, color: 'bg-slate-100 text-slate-700' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Document Vault</h1>
        <p className="mt-1 text-stone-600">All your application documents in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {docTypes.map(({ type, label, icon: Icon, color }) => {
          const count = documents.filter((d: any) => d.type === type).length
          return (
            <Card key={type} className="border-stone-200">
              <CardContent className="py-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900">{label}</div>
                    <div className="text-xs text-stone-500">{count} {count === 1 ? 'document' : 'documents'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No documents yet"
              desc="Upload your CV, transcripts, recommendation letters, and other application materials."
            />
          ) : (
            <div className="space-y-2">
              {documents.map((d: any) => (
                <div key={d.id} className="flex items-center gap-3 rounded-lg border border-stone-200 p-3">
                  <FileText className="h-5 w-5 text-stone-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900">{d.name}</div>
                    <div className="text-xs text-stone-500 capitalize">{d.type.replace('_', ' ')}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">{formatDate(d.createdAt)}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// RESOURCES VIEW
// ============================================================
function ResourcesView() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState<Resource | null>(null)

  useEffect(() => {
    const params = category !== 'all' ? `?category=${category}` : ''
    fetch(`/api/resources${params}`)
      .then((r) => r.json())
      .then((d) => setResources(d.resources))
      .finally(() => setLoading(false))
  }, [category])

  const categories = [
    { value: 'all', label: 'All', icon: BookOpen },
    { value: 'essays', label: 'Essays', icon: PenLine },
    { value: 'recommendations', label: 'Recommendations', icon: Users },
    { value: 'tests', label: 'Tests', icon: Award },
    { value: 'visa', label: 'Visa', icon: Globe },
    { value: 'interviews', label: 'Interviews', icon: MessageSquare },
    { value: 'finances', label: 'Finances', icon: DollarSign },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Resources Library</h1>
        <p className="mt-1 text-stone-600">In-depth guides written for African applicants.</p>
      </div>

      {/* Category pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c.value
                ? 'border-amber-300 bg-amber-100 text-amber-800'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            <c.icon className="h-3.5 w-3.5" />
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState label="Loading resources..." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Card
              key={r.id}
              onClick={() => setSelected(r)}
              className="cursor-pointer border-stone-200 transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs capitalize">{r.category}</Badge>
                  {r.featured && <Badge className="bg-amber-100 text-amber-800 text-xs"><Star className="mr-1 h-3 w-3" /> Featured</Badge>}
                </div>
                <CardTitle className="text-base leading-tight">{r.title}</CardTitle>
                <CardDescription className="line-clamp-3">{r.summary}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 text-xs text-stone-500">
                <Clock className="mr-1 h-3 w-3" /> {r.readMinutes || 5} min read
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Resource detail dialog */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize">{selected?.category}</Badge>
              {selected?.readMinutes && <span className="text-xs text-stone-500">{selected.readMinutes} min read</span>}
            </div>
            <DialogTitle className="text-xl">{selected?.title}</DialogTitle>
            <DialogDescription>{selected?.summary}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="prose prose-sm prose-stone max-w-none">
              <MarkdownRenderer content={selected?.content || ''} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MarkdownRenderer({ content }: { content: string }) {
  // Lightweight markdown rendering
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let inList = false
  let listItems: string[] = []

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 pl-5 text-sm text-stone-700">
          {listItems.map((item, i) => <li key={i} className="list-disc">{item}</li>)}
        </ul>
      )
      listItems = []
      inList = false
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('# ')) {
      flushList()
      elements.push(<h1 key={i} className="mb-3 mt-4 text-2xl font-bold text-stone-900">{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      flushList()
      elements.push(<h2 key={i} className="mb-2 mt-4 text-xl font-bold text-stone-900">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(<h3 key={i} className="mb-2 mt-3 text-lg font-semibold text-stone-900">{line.slice(4)}</h3>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      inList = true
      listItems.push(line.slice(2))
    } else if (line.trim().startsWith('|')) {
      flushList()
      // table
      elements.push(<div key={i} className="my-3 overflow-x-auto"><table className="w-full border-collapse text-xs"><tbody>
        {line.split('\n').map((row, ri) => {
          const cells = row.split('|').filter((c) => c.trim()).map((c) => c.trim())
          if (cells.every((c) => /^-+$/.test(c))) return null
          return <tr key={ri} className="border-b border-stone-200">{cells.map((c, ci) => <td key={ci} className="border border-stone-200 px-2 py-1">{c}</td>)}</tr>
        })}
      </tbody></table></div>)
    } else if (line.startsWith('```')) {
      flushList()
      // skip fence
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(<p key={i} className="my-2 text-sm leading-relaxed text-stone-700">{line}</p>)
    }
  })
  flushList()
  return <>{elements}</>
}

// ============================================================
// ELIGIBILITY VIEW (AI-powered)
// ============================================================
function EligibilityView({
  scholarship: s, navigate,
}: { scholarship: Scholarship; navigate: (v: View, s?: Scholarship) => void }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkEligibility = async () => {
    setLoading(true)
    setResult(null)
    try {
      const profileRes = await fetch('/api/dashboard')
      const { user } = await profileRes.json()
      const p = user.profile
      const res = await fetch('/api/ai/eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scholarshipId: s.id,
          profile: {
            fullName: p.fullName,
            country: p.country,
            educationLevel: p.educationLevel,
            fieldOfStudy: p.fieldOfStudy,
            gpa: p.gpa,
            graduationYear: p.graduationYear,
            targetDegree: p.targetDegree,
            languages: parseJSON(p.languages, []),
          },
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('scholarship', s)}
        className="mb-4 inline-flex items-center text-sm text-stone-500 hover:text-stone-700"
      >
        <ChevronLeft className="mr-1 h-4 w-4" /> Back to {s.title}
      </button>

      <Badge className="mb-3 bg-emerald-100 text-emerald-800">
        <FileCheck className="mr-1 h-3 w-3" /> AI Eligibility Check
      </Badge>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
        Can you apply to {s.title}?
      </h1>
      <p className="mt-1 text-stone-600">Our AI analyzes your profile against this scholarship's eligibility criteria.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">{s.title}</CardTitle>
          <CardDescription>{s.provider}</CardDescription>
        </CardHeader>
        <CardContent>
          {!result && !loading && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <p className="mb-4 max-w-md text-sm text-stone-600">
                Click below to run the AI eligibility check. We'll analyze your profile against {s.title}'s requirements.
              </p>
              <Button onClick={checkEligibility} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700">
                <FileCheck className="mr-2 h-4 w-4" /> Check My Eligibility
              </Button>
            </div>
          )}
          {loading && (
            <div className="flex h-48 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                <p className="text-sm text-stone-500">Analyzing eligibility criteria...</p>
              </div>
            </div>
          )}
          {result && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-stone-500">Verdict</div>
                  <div className={`text-2xl font-bold capitalize ${
                    result.eligible === 'yes' ? 'text-emerald-600' :
                    result.eligible === 'likely' ? 'text-emerald-600' :
                    result.eligible === 'uncertain' ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {result.eligible}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-stone-500">Confidence</div>
                  <div className="text-2xl font-bold text-stone-900">{result.confidence}%</div>
                </div>
              </div>
              <p className="text-sm text-stone-700">{result.summary}</p>

              {result.checks?.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-stone-900">Criterion-by-criterion analysis</div>
                  {result.checks.map((c: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-stone-200 p-3">
                      {c.status === 'pass' && <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />}
                      {c.status === 'fail' && <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-500" />}
                      {c.status === 'warning' && <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />}
                      {c.status === 'unknown' && <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-stone-400" />}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-stone-900">{c.criterion}</div>
                        <div className="text-xs text-stone-600">{c.detail}</div>
                      </div>
                      <Badge variant="outline" className={`text-xs capitalize ${
                        c.status === 'pass' ? 'border-emerald-200 text-emerald-700' :
                        c.status === 'fail' ? 'border-rose-200 text-rose-700' :
                        c.status === 'warning' ? 'border-amber-200 text-amber-700' :
                        'border-stone-200 text-stone-600'
                      }`}>{c.status}</Badge>
                    </div>
                  ))}
                </div>
              )}

              {result.missing?.length > 0 && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="pt-4">
                    <div className="text-sm font-semibold text-amber-900">Missing items</div>
                    <ul className="mt-2 space-y-1">
                      {result.missing.map((m: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-amber-800">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {result.recommendations?.length > 0 && (
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="pt-4">
                    <div className="text-sm font-semibold text-emerald-900">Next steps</div>
                    <ul className="mt-2 space-y-1.5">
                      {result.recommendations.map((r: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm text-emerald-800">
                          <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Button variant="outline" onClick={checkEligibility} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Re-run check
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// RECOMMENDATION LETTER VIEW
// ============================================================
function RecLetterView() {
  const { toast } = useToast()
  const [form, setForm] = useState({
    studentName: '',
    recommenderName: '',
    recommenderTitle: '',
    recommenderInstitution: '',
    relationship: '',
    programName: '',
    programUniversity: '',
    keyPoints: [''] as string[],
    specificExamples: [''] as string[],
    tone: 'academic' as 'academic' | 'professional' | 'warm' | 'formal',
    length: 'standard' as 'concise' | 'standard' | 'detailed',
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ letter: string; wordCount: number } | null>(null)
  const [error, setError] = useState('')

  const updateKeyPoint = (i: number, v: string) => {
    const next = [...form.keyPoints]
    next[i] = v
    setForm({ ...form, keyPoints: next })
  }
  const addKeyPoint = () => setForm({ ...form, keyPoints: [...form.keyPoints, ''] })
  const updateExample = (i: number, v: string) => {
    const next = [...form.specificExamples]
    next[i] = v
    setForm({ ...form, specificExamples: next })
  }
  const addExample = () => setForm({ ...form, specificExamples: [...form.specificExamples, ''] })

  const generate = async () => {
    if (!form.studentName || !form.recommenderName || form.keyPoints.filter((k) => k.trim()).length < 2) {
      setError('Please fill at least student name, recommender name, and 2 key points.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/ai/rec-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          keyPoints: form.keyPoints.filter((k) => k.trim()),
          specificExamples: form.specificExamples.filter((e) => e.trim()),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate')
      setResult(data)
      toast({
        title: 'Letter drafted',
        description: `${data.wordCount} words generated. Have your recommender review and edit on letterhead.`,
      })
    } catch (e: any) {
      setError(e.message)
      toast({ title: 'Generation failed', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge className="mb-3 bg-stone-200 text-stone-800">
          <Bot className="mr-1 h-3 w-3" /> AI Tool
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">Recommendation Letter Drafter</h1>
        <p className="mt-1 text-stone-600">
          Generate a draft letter your recommender can edit and sign. Saves them time, gives you control over what's emphasized.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Letter Details</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Student Name</Label>
                <Input value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Abdi Megersa" />
              </div>
              <div>
                <Label>Recommender Name</Label>
                <Input value={form.recommenderName} onChange={(e) => setForm({ ...form, recommenderName: e.target.value })} placeholder="Dr. Sara Tadesse" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Recommender Title</Label>
                <Input value={form.recommenderTitle} onChange={(e) => setForm({ ...form, recommenderTitle: e.target.value })} placeholder="Professor of Computer Science" />
              </div>
              <div>
                <Label>Institution</Label>
                <Input value={form.recommenderInstitution} onChange={(e) => setForm({ ...form, recommenderInstitution: e.target.value })} placeholder="Addis Ababa University" />
              </div>
            </div>
            <div>
              <Label>Relationship to Student</Label>
              <Input value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} placeholder="Professor in 3 courses + senior thesis advisor" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Program</Label>
                <Input value={form.programName} onChange={(e) => setForm({ ...form, programName: e.target.value })} placeholder="MSc Computer Science" />
              </div>
              <div>
                <Label>University</Label>
                <Input value={form.programUniversity} onChange={(e) => setForm({ ...form, programUniversity: e.target.value })} placeholder="Stanford" />
              </div>
            </div>

            <div>
              <Label>Key Points (min 2)</Label>
              <div className="space-y-2">
                {form.keyPoints.map((kp, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={kp}
                      onChange={(e) => updateKeyPoint(i, e.target.value)}
                      placeholder={`Key point ${i + 1}`}
                    />
                    {i === form.keyPoints.length - 1 && (
                      <Button type="button" size="icon" variant="outline" onClick={addKeyPoint}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Specific Examples (optional but recommended)</Label>
              <div className="space-y-2">
                {form.specificExamples.map((ex, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      value={ex}
                      onChange={(e) => updateExample(i, e.target.value)}
                      placeholder={`Example ${i + 1}`}
                    />
                    {i === form.specificExamples.length - 1 && (
                      <Button type="button" size="icon" variant="outline" onClick={addExample}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tone</Label>
                <Select value={form.tone} onValueChange={(v: any) => setForm({ ...form, tone: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Length</Label>
                <Select value={form.length} onValueChange={(v: any) => setForm({ ...form, length: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise (300-400w)</SelectItem>
                    <SelectItem value="standard">Standard (500-700w)</SelectItem>
                    <SelectItem value="detailed">Detailed (800-1000w)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}

            <Button
              onClick={generate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-stone-700 to-stone-900 text-white hover:from-stone-800 hover:to-stone-950"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Drafting letter...</>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> Generate Letter Draft</>
              )}
            </Button>
          </CardContent>
        </Card>

        <div>
          {!result && !loading && (
            <Card className="border-dashed border-stone-300">
              <CardContent className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <Bot className="mb-3 h-10 w-10 text-stone-300" />
                <p className="text-sm font-medium text-stone-600">Your letter draft will appear here</p>
              </CardContent>
            </Card>
          )}
          {loading && (
            <Card><CardContent className="flex h-96 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-stone-500" />
                <p className="text-sm text-stone-500">Drafting your letter...</p>
              </div>
            </CardContent></Card>
          )}
          {result && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Draft Letter ({result.wordCount} words)</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigator.clipboard.writeText(result.letter)}
                  >
                    <Download className="mr-1 h-3 w-3" /> Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-[600px] overflow-y-auto rounded-lg bg-stone-50 p-4 font-serif text-sm leading-relaxed text-stone-800 whitespace-pre-line">
                  {result.letter}
                </div>
                <p className="mt-3 text-xs text-stone-500">
                  Have your recommender review, edit, and sign on institutional letterhead. Never submit AI-generated letters without their review.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// v2: AI MOCK INTERVIEW VIEW
// ============================================================
function InterviewView() {
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [scholarshipTitle, setScholarshipTitle] = useState('Chevening Scholarships (UK)')
  const [scholarshipProvider, setScholarshipProvider] = useState('UK FCDO')
  const [programName, setProgramName] = useState('')
  const [targetUniversity, setTargetUniversity] = useState('')
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState<{ role: 'interviewer' | 'student'; content: string }[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [interviewPlan, setInterviewPlan] = useState<string[]>([])
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [scores, setScores] = useState<number[]>([])

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => setProfile(d.user.profile))
      .catch(() => {})
  }, [])

  const startInterview = async () => {
    setLoading(true)
    setStarted(true)
    setConversation([])
    setFeedback(null)
    setScores([])
    setInterviewComplete(false)
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          scholarshipTitle,
          scholarshipProvider,
          programName,
          targetUniversity,
          studentProfile: profile ? {
            fullName: profile.fullName,
            country: profile.country,
            fieldOfStudy: profile.fieldOfStudy,
            educationLevel: profile.educationLevel,
            targetDegree: profile.targetDegree,
            bio: profile.bio,
          } : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to start')
      if (!data.greeting || !data.openingQuestion) {
        throw new Error('Invalid response from AI')
      }
      setConversation([{ role: 'interviewer', content: `${data.greeting}\n\n${data.openingQuestion}` }])
      setInterviewPlan(data.interviewPlan || [])
      toast({ title: 'Interview started', description: data.questionCategory })
    } catch (e: any) {
      console.error('[Interview] start failed:', e)
      toast({ title: 'Failed to start', description: e.message, variant: 'destructive' })
      // Keep started=true so user can see the error context, don't reset
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) return
    setLoading(true)
    const newConversation = [...conversation, { role: 'student' as const, content: currentAnswer }]
    setConversation(newConversation)
    const studentAnswer = currentAnswer
    setCurrentAnswer('')
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'answer',
          scholarshipTitle,
          studentProfile: profile ? {
            fullName: profile.fullName,
            country: profile.country,
            fieldOfStudy: profile.fieldOfStudy,
          } : undefined,
          conversation: newConversation,
          studentAnswer,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setFeedback(data)
      if (typeof data.score === 'number') setScores((s) => [...s, data.score])
      if (data.isFinal) {
        setInterviewComplete(true)
        setConversation([...newConversation, { role: 'interviewer', content: data.finalSummary || data.nextQuestion || 'Interview complete.' }])
        toast({ title: 'Interview complete', description: `Average score: ${Math.round([...scores, data.score].reduce((a, b) => a + b, 0) / [...scores, data.score].length)}/100` })
      } else {
        setConversation([...newConversation, { role: 'interviewer', content: data.nextQuestion }])
      }
    } catch (e: any) {
      toast({ title: 'Failed', description: e.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Badge className="mb-3 bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-200">
          <MessageSquare className="mr-1 h-3 w-3" /> AI Mock Interview
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">Mock Scholarship Interview</h1>
        <p className="mt-1 text-stone-600 dark:text-stone-400">
          Practice with an AI panelist trained on top scholarship interview patterns (Chevening, Fulbright, Rhodes, etc.). Get real-time feedback and a final readiness score.
        </p>
      </div>

      {/* Setup */}
      {!started && (
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader><CardTitle className="text-base">Interview Setup</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label>Scholarship</Label>
                <Input value={scholarshipTitle} onChange={(e) => setScholarshipTitle(e.target.value)} placeholder="Chevening Scholarships" />
              </div>
              <div>
                <Label>Provider</Label>
                <Input value={scholarshipProvider} onChange={(e) => setScholarshipProvider(e.target.value)} placeholder="UK FCDO" />
              </div>
              <div>
                <Label>Program (optional)</Label>
                <Input value={programName} onChange={(e) => setProgramName(e.target.value)} placeholder="MSc Public Policy" />
              </div>
              <div>
                <Label>University (optional)</Label>
                <Input value={targetUniversity} onChange={(e) => setTargetUniversity(e.target.value)} placeholder="LSE" />
              </div>
            </div>
            <Button
              onClick={startInterview}
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
            >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting...</> : <><MessageSquare className="mr-2 h-4 w-4" /> Start Mock Interview</>}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conversation */}
      {started && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card className="border-stone-200 dark:border-stone-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Interview Transcript</CardTitle>
                  {scores.length > 0 && (
                    <Badge variant="outline">Avg: {avgScore}/100</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-[500px] pr-4">
                  <div className="space-y-4">
                    {conversation.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'student' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          msg.role === 'student'
                            ? 'bg-amber-100 text-stone-900 dark:bg-amber-900/40 dark:text-amber-50'
                            : 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100'
                        }`}>
                          <div className="mb-1 text-xs font-semibold uppercase opacity-60">
                            {msg.role === 'student' ? 'You' : 'Interviewer'}
                          </div>
                          <div className="whitespace-pre-line text-sm">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="rounded-2xl bg-stone-100 px-4 py-3 dark:bg-stone-800">
                          <Loader2 className="h-4 w-4 animate-spin text-stone-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Answer input */}
            {!interviewComplete && (
              <Card className="border-stone-200 dark:border-stone-800">
                <CardContent className="pt-4">
                  <Label>Your Answer</Label>
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer to the interviewer's question..."
                    rows={4}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submitAnswer()
                    }}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-stone-500">⌘+Enter to submit</p>
                    <Button
                      onClick={submitAnswer}
                      disabled={loading || !currentAnswer.trim()}
                      size="sm"
                      className="bg-violet-600 text-white hover:bg-violet-700"
                    >
                      {loading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : null}
                      Submit Answer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {interviewComplete && (
              <Card className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-violet-600" />
                    <div>
                      <div className="text-lg font-bold text-violet-900 dark:text-violet-100">Interview Complete</div>
                      <div className="text-sm text-violet-700 dark:text-violet-300">Average score: {avgScore}/100 across {scores.length} answers</div>
                    </div>
                  </div>
                  <Button onClick={startInterview} variant="outline" className="mt-3">
                    <RefreshCw className="mr-2 h-4 w-4" /> Restart Interview
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feedback sidebar */}
          <div className="space-y-4">
            {feedback && (
              <>
                <Card className="border-stone-200 dark:border-stone-800">
                  <CardHeader><CardTitle className="text-sm">Latest Feedback</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {typeof feedback.score === 'number' && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500">Score</span>
                        <Badge className={scoreColor(feedback.score)}>{feedback.score}/100</Badge>
                      </div>
                    )}
                    <p className="text-sm text-stone-700 dark:text-stone-300">{feedback.feedback}</p>
                    {feedback.strengths?.length > 0 && (
                      <div>
                        <div className="mb-1 text-xs font-semibold uppercase text-emerald-700">Strengths</div>
                        <ul className="space-y-1">
                          {feedback.strengths.map((s: string, i: number) => (
                            <li key={i} className="flex gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                              <CheckCircle2 className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-500" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {feedback.improvements?.length > 0 && (
                      <div>
                        <div className="mb-1 text-xs font-semibold uppercase text-amber-700">Improvements</div>
                        <ul className="space-y-1">
                          {feedback.improvements.map((s: string, i: number) => (
                            <li key={i} className="flex gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                              <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}

            {interviewPlan.length > 0 && (
              <Card className="border-stone-200 dark:border-stone-800">
                <CardHeader><CardTitle className="text-sm">Interview Plan</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {interviewPlan.map((t, i) => (
                      <li key={i} className="flex gap-2 text-xs text-stone-600 dark:text-stone-400">
                        <span className="font-mono text-stone-400">{i + 1}.</span>{t}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {scores.length > 0 && (
              <Card className="border-stone-200 dark:border-stone-800">
                <CardHeader><CardTitle className="text-sm">Score History</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex h-32 items-end gap-1.5">
                    {scores.map((s, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={`w-full rounded-t ${s >= 75 ? 'bg-emerald-500' : s >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ height: `${s}%` }}
                        />
                        <span className="text-[10px] text-stone-500">{s}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================
// v2: SCHOLARSHIP COMPARISON VIEW
// ============================================================
function CompareView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [selected, setSelected] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/scholarships')
      .then((r) => r.json())
      .then((d) => { setScholarships(d.scholarships); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const toggleSelect = (s: Scholarship) => {
    setSelected((prev) => {
      if (prev.find((x) => x.id === s.id)) return prev.filter((x) => x.id !== s.id)
      if (prev.length >= 3) return [prev[1], prev[2], s] // keep last 2 + new
      return [...prev, s]
    })
  }

  if (loading) return <LoadingState label="Loading scholarships..." />

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge className="mb-3 bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200">
          <GitCompare className="mr-1 h-3 w-3" /> Comparison Tool
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">Compare Scholarships</h1>
        <p className="mt-1 text-stone-600 dark:text-stone-400">Select up to 3 scholarships to compare side-by-side.</p>
      </div>

      {/* Selected count */}
      <div className="mb-4 flex items-center gap-3">
        <Badge variant="outline">{selected.length}/3 selected</Badge>
        {selected.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setSelected([])}>Clear all</Button>
        )}
      </div>

      {/* Comparison table */}
      {selected.length > 0 && (
        <Card className="mb-6 overflow-hidden border-stone-200 dark:border-stone-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
                    <th className="p-4 text-left font-medium text-stone-500 dark:text-stone-400 w-40">Attribute</th>
                    {selected.map((s) => (
                      <th key={s.id} className="p-4 text-left font-semibold text-stone-900 dark:text-stone-100 min-w-[200px]">
                        <button onClick={() => navigate('scholarship', s)} className="hover:text-amber-700 text-left">
                          {s.title}
                        </button>
                        <div className="text-xs font-normal text-stone-500">{s.provider}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Level', get: (s: Scholarship) => levelLabel(s.level) },
                    { label: 'Funding', get: (s: Scholarship) => fundingTypeLabel(s.fundingType) },
                    { label: 'Amount/yr', get: (s: Scholarship) => formatMoney(s.amount) },
                    { label: 'Host Countries', get: (s: Scholarship) => parseJSON<string[]>(s.hostCountries, []).join(', ') },
                    { label: 'Fields', get: (s: Scholarship) => parseJSON<string[]>(s.fieldsOfStudy, []).join(', ') },
                    { label: 'Duration', get: (s: Scholarship) => s.duration || '—' },
                    { label: 'Deadline', get: (s: Scholarship) => formatDate(s.deadline) },
                    { label: 'Days Left', get: (s: Scholarship) => {
                        const d = daysUntil(s.deadline)
                        return d !== null ? `${d} days` : '—'
                      } },
                    { label: 'Competitiveness', get: (s: Scholarship) => s.competitiveness?.replace('_', ' ') || '—' },
                    { label: 'Coverage', get: (s: Scholarship) => parseJSON<string[]>(s.coverage, []).join(', ') || '—' },
                    { label: 'Funded By', get: (s: Scholarship) => s.fundedBy || '—' },
                    { label: 'Eligible Countries', get: (s: Scholarship) => parseJSON<string[]>(s.eligibleCountries, []).join(', ') || 'Worldwide' },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-stone-100 dark:border-stone-800/50">
                      <td className="p-4 font-medium text-stone-500 dark:text-stone-400">{row.label}</td>
                      {selected.map((s) => (
                        <td key={s.id} className="p-4 text-stone-800 dark:text-stone-200">{row.get(s)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 font-medium text-stone-500">Action</td>
                    {selected.map((s) => (
                      <td key={s.id} className="p-4">
                        <Button size="sm" variant="outline" onClick={() => navigate('scholarship', s)}>
                          View Details <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Picker grid */}
      <h2 className="mb-4 text-lg font-bold text-stone-900 dark:text-stone-100">
        {selected.length === 0 ? 'Select scholarships to compare' : 'Add more (or remove)'}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((s) => {
          const isSelected = selected.find((x) => x.id === s.id)
          return (
            <Card
              key={s.id}
              onClick={() => toggleSelect(s)}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30 ring-2 ring-amber-400'
                  : 'border-stone-200 dark:border-stone-800 hover:border-amber-300'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm leading-tight">{s.title}</CardTitle>
                    <div className="mt-0.5 text-xs text-stone-500">{s.provider}</div>
                  </div>
                  {isSelected ? (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-600" />
                  ) : (
                    <Plus className="h-5 w-5 flex-shrink-0 text-stone-300" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">{levelLabel(s.level)}</Badge>
                  <Badge variant="outline" className="text-xs">{fundingTypeLabel(s.fundingType)}</Badge>
                  {s.amount && <Badge variant="outline" className="text-xs">{formatMoney(s.amount)}/yr</Badge>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// v2: CALENDAR VIEW (deadline calendar)
// ============================================================
function CalendarView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    fetch('/api/scholarships')
      .then((r) => r.json())
      .then((d) => { setScholarships(d.scholarships); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState label="Loading calendar..." />

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startWeekday = firstDay.getDay() // 0 = Sunday

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Scholarships with deadlines in this month
  const deadlinesThisMonth = scholarships.filter((s) => {
    if (!s.deadline) return false
    const d = new Date(s.deadline)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const getDeadlinesForDay = (day: number) => {
    return deadlinesThisMonth.filter((s) => {
      if (!s.deadline) return false
      return new Date(s.deadline).getDate() === day
    })
  }

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))
  const goToday = () => setCurrentMonth(new Date())

  const today = new Date()
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

  // Upcoming deadlines (next 90 days)
  const now = new Date()
  const future90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
  const upcoming = scholarships
    .filter((s) => s.deadline && new Date(s.deadline) >= now && new Date(s.deadline) <= future90)
    .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge className="mb-3 bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200">
          <Calendar className="mr-1 h-3 w-3" /> Deadline Calendar
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">Deadline Calendar</h1>
        <p className="mt-1 text-stone-600 dark:text-stone-400">Visual month view of all scholarship deadlines.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{monthName}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" onClick={goToday}>Today</Button>
                  <Button variant="ghost" size="sm" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-stone-500 py-2">{d}</div>
                ))}
              </div>
              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startWeekday }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayDeadlines = getDeadlinesForDay(day)
                  const today_ = isToday(day)
                  return (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg border p-1.5 overflow-hidden ${
                        today_
                          ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/30'
                          : 'border-stone-100 dark:border-stone-800'
                      }`}
                    >
                      <div className={`text-xs font-medium ${today_ ? 'text-amber-700 dark:text-amber-300' : 'text-stone-500'}`}>
                        {day}
                      </div>
                      <div className="mt-0.5 space-y-0.5">
                        {dayDeadlines.slice(0, 2).map((s) => (
                          <button
                            key={s.id}
                            onClick={() => navigate('scholarship', s)}
                            className="block w-full truncate rounded bg-rose-100 px-1 py-0.5 text-[10px] text-rose-700 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-200"
                            title={s.title}
                          >
                            {s.title}
                          </button>
                        ))}
                        {dayDeadlines.length > 2 && (
                          <div className="text-[10px] text-stone-400">+{dayDeadlines.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming list */}
        <div>
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-500" />
                Next 90 Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcoming.length === 0 ? (
                <p className="text-sm text-stone-500">No deadlines in the next 90 days.</p>
              ) : (
                <ScrollArea className="max-h-[500px] -mx-2 px-2">
                  <div className="space-y-2">
                    {upcoming.map((s) => {
                      const days = daysUntil(s.deadline)
                      return (
                        <button
                          key={s.id}
                          onClick={() => navigate('scholarship', s)}
                          className="w-full text-left rounded-lg border border-stone-200 dark:border-stone-800 p-3 hover:bg-stone-50 dark:hover:bg-stone-900/50"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-sm font-medium text-stone-900 dark:text-stone-100">{s.title}</div>
                              <div className="text-xs text-stone-500">{s.provider}</div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className={`text-sm font-bold ${days! < 14 ? 'text-rose-600' : 'text-stone-700 dark:text-stone-300'}`}>{days}d</div>
                              <div className="text-xs text-stone-500">{formatDate(s.deadline)}</div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// v2: ANALYTICS VIEW (charts)
// ============================================================
function AnalyticsView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const [data, setData] = useState<any>(null)
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard').then((r) => r.json()),
      fetch('/api/scholarships').then((r) => r.json()),
    ])
      .then(([d, s]) => { setData(d); setScholarships(s.scholarships) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingState label="Loading analytics..." />
  if (!data) return null

  const { applications, savedScholarships, essays, stats } = data

  // Compute status distribution
  const statusCounts: Record<string, number> = {}
  applications.forEach((a: Application) => {
    statusCounts[a.status] = (statusCounts[a.status] || 0) + 1
  })
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({ status: status.replace('_', ' '), count }))

  // Match score distribution (from applications)
  const matchScores = applications
    .filter((a: Application) => a.matchScore)
    .map((a: Application) => a.matchScore)

  // Scholarship database analytics
  const byFundingType: Record<string, number> = {}
  scholarships.forEach((s) => {
    byFundingType[s.fundingType] = (byFundingType[s.fundingType] || 0) + 1
  })
  const fundingData = Object.entries(byFundingType).map(([type, count]) => ({ type: fundingTypeLabel(type), count }))

  const byLevel: Record<string, number> = {}
  scholarships.forEach((s) => {
    byLevel[s.level] = (byLevel[s.level] || 0) + 1
  })
  const levelData = Object.entries(byLevel).map(([level, count]) => ({ level: levelLabel(level), count }))

  const byFundedBy: Record<string, number> = {}
  scholarships.forEach((s) => {
    if (s.fundedBy) byFundedBy[s.fundedBy] = (byFundedBy[s.fundedBy] || 0) + 1
  })
  const fundedByData = Object.entries(byFundedBy)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  // Deadline distribution by month
  const byMonth: Record<string, number> = {}
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  scholarships.forEach((s) => {
    if (s.deadline) {
      const m = new Date(s.deadline).getMonth()
      byMonth[monthNames[m]] = (byMonth[monthNames[m]] || 0) + 1
    }
  })
  const monthData = monthNames.map((m) => ({ month: m, count: byMonth[m] || 0 }))

  const CHART_COLORS = ['#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#EF4444']

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge className="mb-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
          <TrendingUp className="mr-1 h-3 w-3" /> Analytics
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">Analytics Dashboard</h1>
        <p className="mt-1 text-stone-600 dark:text-stone-400">Insights from your applications and the scholarship database.</p>
      </div>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Apps" value={stats.totalApplications} icon={Target} color="text-violet-600 bg-violet-50 dark:bg-violet-950/40" sub="in tracker" />
        <StatCard label="Avg Match" value={`${matchScores.length ? Math.round(matchScores.reduce((a: number, b: number) => a + b, 0) / matchScores.length) : 0}%`} icon={Sparkles} color="text-amber-600 bg-amber-50 dark:bg-amber-950/40" sub="across apps" />
        <StatCard label="Saved" value={stats.totalSaved} icon={Bookmark} color="text-rose-600 bg-rose-50 dark:bg-rose-950/40" sub="scholarships" />
        <StatCard label="Database" value={scholarships.length} icon={Award} color="text-sky-600 bg-sky-50 dark:bg-sky-950/40" sub="total scholarships" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application status pie */}
        {statusData.length > 0 && (
          <Card className="border-stone-200 dark:border-stone-800">
            <CardHeader><CardTitle className="text-base">Application Status Breakdown</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <RechartsPie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ status, count }: any) => `${status}: ${count}`}
                  >
                    {statusData.map((_, i) => (
                      <RechartsCell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </RechartsPie>
                  <RechartsTooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Funding type bar */}
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader><CardTitle className="text-base">Scholarships by Funding Type</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={fundingData}>
                <RechartsXAxis dataKey="type" tick={{ fontSize: 11 }} />
                <RechartsYAxis tick={{ fontSize: 11 }} />
                <RechartsTooltip />
                <RechartsBar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Level distribution */}
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader><CardTitle className="text-base">Scholarships by Education Level</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={levelData} layout="vertical">
                <RechartsXAxis type="number" tick={{ fontSize: 11 }} />
                <RechartsYAxis type="category" dataKey="level" tick={{ fontSize: 11 }} width={80} />
                <RechartsTooltip />
                <RechartsBar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deadline distribution by month */}
        <Card className="border-stone-200 dark:border-stone-800">
          <CardHeader><CardTitle className="text-base">Deadlines by Month</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBarChart data={monthData}>
                <RechartsXAxis dataKey="month" tick={{ fontSize: 11 }} />
                <RechartsYAxis tick={{ fontSize: 11 }} />
                <RechartsTooltip />
                <RechartsBar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funded-by country ranking */}
      <Card className="mt-6 border-stone-200 dark:border-stone-800">
        <CardHeader><CardTitle className="text-base">Top Funding Countries</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {fundedByData.map((c, i) => {
              const max = fundedByData[0].count
              return (
                <div key={c.country} className="flex items-center gap-3">
                  <div className="w-6 text-xs font-mono text-stone-400">#{i + 1}</div>
                  <div className="w-32 text-sm font-medium text-stone-900 dark:text-stone-100">{c.country}</div>
                  <div className="flex-1">
                    <div className="h-6 rounded bg-stone-100 dark:bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded transition-all"
                        style={{ width: `${(c.count / max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm font-bold text-stone-900 dark:text-stone-100">{c.count}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================
// v2: PROFILE EDITOR VIEW
// ============================================================
function ProfileView({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  const { toast } = useToast()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    bio: '',
    country: '',
    city: '',
    educationLevel: 'undergraduate',
    currentSchool: '',
    fieldOfStudy: '',
    gpa: '' as string | number,
    graduationYear: '' as string | number,
    targetCountries: '',
    targetDegree: 'masters',
    targetField: '',
    financialNeed: 'high',
    budget: '' as string | number,
    languages: '',
  })

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => {
        const p = d.user.profile
        setProfile(p)
        if (p) {
          setForm({
            fullName: p.fullName || '',
            bio: p.bio || '',
            country: p.country || '',
            city: p.city || '',
            educationLevel: p.educationLevel || 'undergraduate',
            currentSchool: p.currentSchool || '',
            fieldOfStudy: p.fieldOfStudy || '',
            gpa: p.gpa ?? '',
            graduationYear: p.graduationYear ?? '',
            targetCountries: parseJSON<string[]>(p.targetCountries, []).join(', '),
            targetDegree: p.targetDegree || 'masters',
            targetField: p.targetField || '',
            financialNeed: p.financialNeed || 'high',
            budget: p.budget ?? '',
            languages: parseJSON<string[]>(p.languages, []).join(', '),
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const payload = {
        fullName: form.fullName || undefined,
        bio: form.bio || undefined,
        country: form.country || undefined,
        city: form.city || undefined,
        educationLevel: form.educationLevel || undefined,
        currentSchool: form.currentSchool || undefined,
        fieldOfStudy: form.fieldOfStudy || undefined,
        gpa: form.gpa === '' ? null : Number(form.gpa),
        graduationYear: form.graduationYear === '' ? null : Number(form.graduationYear),
        targetCountries: form.targetCountries.split(',').map((s) => s.trim()).filter(Boolean),
        targetDegree: form.targetDegree || undefined,
        targetField: form.targetField || undefined,
        financialNeed: form.financialNeed || undefined,
        budget: form.budget === '' ? null : Number(form.budget),
        languages: form.languages.split(',').map((s) => s.trim()).filter(Boolean),
      }
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast({ title: 'Profile updated', description: 'Your changes have been saved.' })
    } catch (e: any) {
      toast({ title: 'Save failed', description: e.message, variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingState label="Loading profile..." />

  const completion = profile ? (() => {
    const fields = [form.fullName, form.country, form.city, form.educationLevel, form.currentSchool, form.fieldOfStudy, form.gpa, form.graduationYear, form.targetCountries, form.targetDegree, form.targetField, form.financialNeed, form.languages, form.bio]
    return Math.round(fields.filter((f) => f !== '' && f !== null && f !== undefined).length / fields.length * 100)
  })() : 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Badge className="mb-3 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
          <Edit3 className="mr-1 h-3 w-3" /> Profile Editor
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-3xl">Your Profile</h1>
        <p className="mt-1 text-stone-600 dark:text-stone-400">
          A complete profile gets 35% more accurate AI match scores. Currently {completion}% complete.
        </p>
        <Progress value={completion} className="mt-3 h-2" />
      </div>

      <Card className="border-stone-200 dark:border-stone-800">
        <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Full Name</Label>
              <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Abdi Megersa" />
            </div>
            <div>
              <Label>Country</Label>
              <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="Ethiopia" />
            </div>
            <div>
              <Label>City</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Addis Ababa" />
            </div>
            <div>
              <Label>Languages (comma-separated)</Label>
              <Input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} placeholder="Amharic, English" />
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Brief bio — your background, interests, what drives you..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-stone-200 dark:border-stone-800">
        <CardHeader><CardTitle className="text-base">Academic Background</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Education Level</Label>
              <Select value={form.educationLevel} onValueChange={(v) => setForm({ ...form, educationLevel: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="masters">Master's</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="postdoc">Postdoc</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Current School</Label>
              <Input value={form.currentSchool} onChange={(e) => setForm({ ...form, currentSchool: e.target.value })} placeholder="Addis Ababa University" />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input value={form.fieldOfStudy} onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })} placeholder="Computer Science" />
            </div>
            <div>
              <Label>GPA (4.0 scale)</Label>
              <Input type="number" step="0.1" min="0" max="4" value={form.gpa} onChange={(e) => setForm({ ...form, gpa: e.target.value })} placeholder="3.7" />
            </div>
            <div>
              <Label>Graduation Year</Label>
              <Input type="number" value={form.graduationYear} onChange={(e) => setForm({ ...form, graduationYear: e.target.value })} placeholder="2026" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-stone-200 dark:border-stone-800">
        <CardHeader><CardTitle className="text-base">Target Programs</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Target Degree</Label>
              <Select value={form.targetDegree} onValueChange={(v) => setForm({ ...form, targetDegree: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelor's</SelectItem>
                  <SelectItem value="masters">Master's</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="postdoc">Postdoc</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Target Field</Label>
              <Input value={form.targetField} onChange={(e) => setForm({ ...form, targetField: e.target.value })} placeholder="Computer Science" />
            </div>
            <div className="sm:col-span-2">
              <Label>Target Countries (comma-separated)</Label>
              <Input value={form.targetCountries} onChange={(e) => setForm({ ...form, targetCountries: e.target.value })} placeholder="USA, UK, Germany, Canada" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 border-stone-200 dark:border-stone-800">
        <CardHeader><CardTitle className="text-base">Financial Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Financial Need</Label>
              <Select value={form.financialNeed} onValueChange={(v) => setForm({ ...form, financialNeed: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low — can self-fund</SelectItem>
                  <SelectItem value="medium">Medium — partial aid needed</SelectItem>
                  <SelectItem value="high">High — mostly funded needed</SelectItem>
                  <SelectItem value="full">Full — 100% funding required</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Family Budget (USD/year)</Label>
              <Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="5000" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('dashboard')}>Cancel</Button>
        <Button
          onClick={save}
          disabled={saving}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700"
        >
          {saving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> Save Profile</>
          )}
        </Button>
      </div>
    </div>
  )
}

// ============================================================
// FOOTER
// ============================================================
function Footer({ navigate }: { navigate: (v: View, s?: Scholarship) => void }) {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600">
                <GraduationCap className="absolute inset-0 m-auto h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-stone-900">ScholarTrack Africa</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-stone-600">
              AI-powered scholarship discovery and application platform built for African students.
              Find your match. Write better essays. Track every deadline. Get funded.
            </p>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Platform</div>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('browse')} className="text-stone-600 hover:text-amber-700">Browse Scholarships</button></li>
              <li><button onClick={() => navigate('matcher')} className="text-stone-600 hover:text-amber-700">AI Matcher</button></li>
              <li><button onClick={() => navigate('essay')} className="text-stone-600 hover:text-amber-700">Essay Lab</button></li>
              <li><button onClick={() => navigate('tracker')} className="text-stone-600 hover:text-amber-700">Application Tracker</button></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Resources</div>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('resources')} className="text-stone-600 hover:text-amber-700">All Guides</button></li>
              <li><button onClick={() => navigate('resources')} className="text-stone-600 hover:text-amber-700">Essay Guides</button></li>
              <li><button onClick={() => navigate('resources')} className="text-stone-600 hover:text-amber-700">Visa Guides</button></li>
              <li><button onClick={() => navigate('resources')} className="text-stone-600 hover:text-amber-700">Interview Prep</button></li>
            </ul>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-500 sm:flex-row">
          <p>© 2026 ScholarTrack Africa. Built for African students, by African students.</p>
          <p>MIT License · Open Source</p>
        </div>
      </div>
    </footer>
  )
}
