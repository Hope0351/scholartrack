# ScholarTrack Architecture Diagrams

This file renders in any Mermaid viewer (GitHub, VS Code, mermaid.live).

## 1. High-Level System Architecture

```mermaid
flowchart TB
    subgraph Client["Client (Browser)"]
        UI["Next.js 16 SPA<br/>10 views, state-driven<br/>Tailwind + shadcn/ui"]
        State["React State<br/>useState/useEffect/useMemo"]
        UI <--> State
    end

    subgraph Server["Next.js Server (Node.js runtime)"]
        Router["App Router<br/>/api/* endpoints"]

        subgraph AIRoutes["AI API Routes (z-ai-web-dev-sdk)"]
            Match["/api/ai/match<br/>Scholarship Matcher"]
            Essay["/api/ai/essay<br/>Essay Lab"]
            Elig["/api/ai/eligibility<br/>Eligibility Checker"]
            Rec["/api/ai/rec-letter<br/>Rec Letter Drafter"]
        end

        subgraph DataRoutes["Data API Routes"]
            Sch["/api/scholarships<br/>+ /:id + /:id/save"]
            Res["/api/resources"]
            Dash["/api/dashboard"]
            Apps["/api/applications<br/>POST/PATCH"]
            Prof["/api/profile<br/>PATCH"]
        end
    end

    subgraph DB["SQLite (Prisma 6)"]
        Schema["9 Models<br/>User, StudentProfile,<br/>Scholarship, Application,<br/>SavedScholarship, Essay,<br/>Document, Resource, Activity"]
    end

    subgraph External["External"]
        LLM["Z.ai LLM<br/>via z-ai-web-dev-sdk"]
        GitHub["GitHub API<br/>(repo push)"]
    end

    UI -->|fetch JSON| Router
    Router --> AIRoutes
    Router --> DataRoutes
    AIRoutes -->|chat.completions.create| LLM
    AIRoutes -->|read/write| Schema
    DataRoutes -->|Prisma Client| Schema
```

## 2. AI Scholarship Matcher — Request Flow

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (MatcherView)
    participant A as /api/ai/match
    participant DB as Prisma (SQLite)
    participant L as Z.ai LLM

    U->>F: Clicks "Run AI Match"
    F->>A: POST { profile, topN: 12 }
    A->>DB: SELECT * FROM scholarships
    DB-->>A: 24 scholarships
    A->>A: Compose system prompt<br/>(6-criterion rubric + JSON format)
    A->>A: Compose user prompt<br/>(profile + 24 scholarships compact)
    A->>L: chat.completions.create(messages, temp=0.2)
    L-->>A: JSON { matches: [...] }
    A->>A: Extract JSON (strip code fences)
    A->>A: Fallback to rule-based if parse fails
    A->>A: Attach full scholarship details
    A-->>F: { matches: [...], total, generatedAt }
    F->>F: Render ranked MatchCards<br/>with score, reasons, gaps
    F->>U: Toast: "Found 12 matches"
```

## 3. Essay Lab — Analysis Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as EssayView
    participant A as /api/ai/essay
    participant L as Z.ai LLM

    U->>F: Pastes essay (50+ words)
    U->>F: Sets type, target program, word limit
    F->>F: Live word count + over-limit warning
    U->>F: Clicks "Analyze with AI"
    F->>A: POST { title, content, type, ... }
    A->>A: Validate with Zod
    A->>L: System: "You are ScholarTrack's AI Essay Coach..."
    A->>L: User: essay draft + context
    A->>L: chat.completions.create(temp=0.3)
    L-->>A: JSON { score, summary, strengths, weaknesses, suggestions, rewrite }
    A->>A: JSON extraction (fence-strip)
    A-->>F: Full analysis + rewrite
    F->>U: Render score, strengths, weaknesses,<br/>category-tagged suggestions, rewrite
    F->>U: Toast: "Essay scored: X/100"
```

## 4. Data Model (ER Diagram)

```mermaid
erDiagram
    User ||--|| StudentProfile : has
    User ||--o{ Application : tracks
    User ||--o{ SavedScholarship : bookmarks
    User ||--o{ Essay : writes
    User ||--o{ Document : uploads
    User ||--o{ Activity : generates

    Scholarship ||--o{ Application : appears_in
    Scholarship ||--o{ SavedScholarship : saved_in

    Application ||--o{ Essay : has
    Application ||--o{ Document : has

    User {
        string id PK
        string email UK
        string name
        datetime createdAt
    }

    StudentProfile {
        string id PK
        string userId FK
        string country
        string educationLevel
        string fieldOfStudy
        float gpa
        string targetCountries
        string targetDegree
        string financialNeed
        string languages
        boolean onboardingComplete
    }

    Scholarship {
        string id PK
        string slug UK
        string title
        string provider
        string level
        string hostCountries
        string fieldsOfStudy
        string fundingType
        int amount
        datetime deadline
        string competitiveness
        boolean featured
    }

    Application {
        string id PK
        string userId FK
        string scholarshipId FK
        string status
        int progress
        int matchScore
        string matchReasons
        datetime appliedAt
    }

    Essay {
        string id PK
        string userId FK
        string applicationId FK
        string title
        string type
        string content
        int wordCount
        int aiScore
        string aiFeedback
        string aiRewrite
    }

    Document {
        string id PK
        string userId FK
        string applicationId FK
        string name
        string type
        string fileUrl
    }

    SavedScholarship {
        string id PK
        string userId FK
        string scholarshipId FK
    }

    Resource {
        string id PK
        string slug UK
        string title
        string category
        string type
        string content
    }

    Activity {
        string id PK
        string userId FK
        string type
        string description
        string metadata
    }
```

## 5. View State Machine

```mermaid
stateDiagram-v2
    [*] --> Landing
    Landing --> Dashboard : nav
    Landing --> Browse : nav
    Landing --> Matcher : CTA
    Landing --> EssayLab : feature card
    Landing --> RecLetter : feature card
    Dashboard --> Matcher : CTA
    Dashboard --> ScholarshipDetail : click application
    Dashboard --> Tracker : view all
    Browse --> ScholarshipDetail : click card
    ScholarshipDetail --> Eligibility : check button
    ScholarshipDetail --> Tracker : add to tracker
    Matcher --> ScholarshipDetail : click match title
    EssayLab --> [*] : analyze
    Eligibility --> ScholarshipDetail : back
    Tracker --> ScholarshipDetail : click application
```

## 6. AI Scoring Rubric (Matcher)

```mermaid
pie title Match Score Weights (6 criteria)
    "Eligibility (country, age, degree)" : 35
    "Academic fit (field, GPA)" : 25
    "Target alignment (host country, degree)" : 20
    "Financial need / funding match" : 10
    "Language readiness" : 5
    "Competitiveness vs profile strength" : 5
```
