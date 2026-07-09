# ScholarTrack Africa

> AI-powered scholarship discovery and application platform built for African students.

ScholarTrack helps African students find, evaluate, and apply to international scholarships using AI-driven matching, an essay lab, an eligibility checker, and a complete application tracker — all in one place.

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-6-indigo)
![AI](https://img.shields.io/badge/AI-z--ai--sdk-orange)

---

## ✨ Features

### AI-Powered Tools
- **Scholarship Matcher** — Analyzes your profile (country, field, GPA, target countries, financial need, languages) and ranks every scholarship in the database by fit, with score, reasons, gaps, and next-step recommendation for each.
- **Essay Lab** — Paste your SOP, personal statement, or research statement. Get instant score (0-100), strengths, weaknesses, category-tagged suggestions, and a rewritten version that preserves your voice.
- **Eligibility Checker** — Before you spend 20 hours on an application, run our AI check. Get a pass/fail/warning verdict per criterion, missing items, and specific next steps.
- **Recommendation Letter Drafter** — Generate a professional, evidence-based letter draft your recommender can edit and sign — saving them time and giving you control over emphasis.

### Scholarship Database
24 verified, real international scholarships actively recruiting African students, including:
- Mastercard Foundation Scholars Program
- Chevening Scholarships (UK)
- DAAD EPOS (Germany)
- Fulbright Foreign Student Program (USA)
- Mandela Washington Fellowship
- Rhodes Scholarship (Oxford)
- Schwarzman Scholars (Tsinghua)
- Knight-Hennessy Scholars (Stanford)
- Gates Cambridge Scholarship
- Clarendon Fund (Oxford)
- Australia Awards Africa
- Chinese Government Scholarship (CSC)
- Stipendium Hungaricum (Hungary)
- Türkiye Bursları
- Korean Government Scholarship (GKS)
- ICCR Africa Scholarship (India)
- African Leadership Academy
- ACCES Scholarship (Kenya)
- Yale Young African Scholars (YYAS)
- Russian Government Scholarship
- Singapore Government Scholarship
- Open Society Fellowships
- Joint Japan/World Bank Scholarship (JJ/WBGSP)
- Mandela-Rhodes Scholarship

### Application Workflow
- **Application Tracker** — Track status (interested → researching → preparing → submitted → interview → offered/rejected), progress %, notes, AI match score, and deadline countdowns.
- **Document Vault** — Categorize your CVs, transcripts, recommendation letters, passports, test scores, essays, and certificates.
- **Resources Library** — In-depth guides written specifically for African applicants covering:
  - Statement of Purpose writing
  - Recommendation letters strategy
  - TOEFL/IELTS preparation
  - F-1 student visa application (USA)
  - Scholarship interview preparation
  - Financial planning for international students

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Database | Prisma 6 ORM + SQLite (dev) |
| AI | z-ai-web-dev-sdk (LLM for matching, essays, eligibility, rec letters) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Validation | Zod |
| State | React hooks (useState, useEffect, useMemo) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- An `.env` file with:
  ```
  DATABASE_URL="file:./db/custom.db"
  ```

### Install & Run
```bash
bun install              # install dependencies
bun run db:push          # create database schema
bun run scripts/seed.ts  # seed 24 scholarships, 6 resources, demo user
bun run dev              # start dev server at http://localhost:3000
```

### Default Login
The app ships with a demo user already authenticated:
- Email: `demo@scholartrack.africa`
- Profile: Ethiopian CS undergraduate, GPA 3.7, targeting masters in USA/UK/Germany/Canada

---

## 📂 Project Structure

```
scholartrack/
├── prisma/
│   └── schema.prisma              # 9 models (User, Scholarship, Application, Essay, Document, Resource, etc.)
├── scripts/
│   └── seed.ts                    # Seeds 24 real scholarships + 6 in-depth resources
├── src/
│   ├── app/
│   │   ├── page.tsx               # Main SPA (10 views, ~1800 lines)
│   │   └── api/
│   │       ├── ai/
│   │       │   ├── match/         # AI Scholarship Matcher
│   │       │   ├── essay/         # AI Essay Lab
│   │       │   ├── eligibility/   # AI Eligibility Checker
│   │       │   └── rec-letter/    # AI Recommendation Letter Drafter
│   │       ├── scholarships/      # Browse/filter scholarships
│   │       ├── resources/         # Browse resources
│   │       └── dashboard/         # User dashboard aggregate
│   ├── lib/
│   │   ├── db.ts                  # Prisma client
│   │   └── utils.ts               # Helpers (parseJSON, scoreColor, statusColor, cn, etc.)
│   └── components/ui/             # shadcn/ui components
└── .env                           # DATABASE_URL
```

---

## 🧠 AI Architecture

All AI features use the `z-ai-web-dev-sdk` server-side. Each API route:

1. Validates input with Zod
2. Pulls relevant data from Prisma
3. Constructs a system prompt with role + scoring rubric + output format
4. Constructs a user prompt with profile + scholarship data
5. Calls the LLM (temperature 0.2-0.4 for analytical tasks)
6. Extracts JSON from the response (handles code-fenced or plain)
7. Falls back to rule-based logic if JSON parsing fails (for the matcher)

The matcher uses a 6-criterion weighted rubric:
- Eligibility (country, age, degree level): 35%
- Academic fit (field, GPA): 25%
- Target alignment (host country, degree): 20%
- Financial need / funding match: 10%
- Language readiness: 5%
- Competitiveness vs profile strength: 5%

---

## 🎨 Design

- **Color palette**: African-inspired — warm amber/orange/rose accents on stone-50 background
- **Typography**: System sans-serif with serif font for essay content
- **Layout**: Mobile-first responsive, sticky footer, accessible (semantic HTML, ARIA labels)
- **Animations**: Subtle Framer Motion transitions between views

---

## 📊 Database Schema

9 Prisma models:
- `User` + `StudentProfile` (1:1) — academic background, financial need, targets
- `Scholarship` — full metadata (level, funding, deadlines, competitiveness, tags)
- `Application` — per-user tracking with status, progress, AI match score
- `SavedScholarship` — bookmarks
- `Essay` — AI essay lab drafts with cached feedback
- `Document` — vault entries
- `Resource` — guides library
- `Activity` — audit log
- `Account` / `Session` — NextAuth scaffolding

---

## 🤝 Contributing

This is a portfolio project. Issues and PRs welcome.

## 📄 License

MIT © 2025-2026 Hope0351

---

**Built for African students, by African students.** 🌍
