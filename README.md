# OnlyPeer 🎓👥

> **Tinder for group work at ITB — swipe on groups, talk first, then join.**

[![Hackathon](https://img.shields.io/badge/Hackathon-GDG%20ITB%20Hackathon-blue.svg)](https://github.com)
[![Case](https://img.shields.io/badge/Track-Case%201%3A%20Smarter%20Campus%20%26%20Learning-success.svg)](docs/OnlyPeer-PRD.pdf)
[![Stack](https://img.shields.io/badge/Frontend-Next.js%20%7C%20TailwindCSS-black.svg)](https://nextjs.org/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20(Python)-009688.svg)](https://fastapi.tiangolo.com/)
[![Database](https://img.shields.io/badge/Database-Supabase%20%28PostgreSQL%20%2B%20pgvector%29-3ECF8E.svg)](https://supabase.com/)
[![AI](https://img.shields.io/badge/AI-Gemini%20API-4285F4.svg)](https://ai.google.dev/)

---

## 📌 Executive Summary

**OnlyPeer** is a campus-tailored matchmaking web application designed specifically for **Institut Teknologi Bandung (ITB)** students. It solves the perennial friction of finding trustworthy, compatible, and committed team members for academic coursework, competitions/hackathons, campus committees, and student initiatives.

By blending the intuitive mechanic of **card swiping** with **Gemini AI-powered candidate/group matching** and **mandatory pre-join conversations**, OnlyPeer ensures that team formation is deliberate, fast, and merit-aligned—eliminating the "first-come, first-regret" curse of student group work.

---

## 🚩 The Problem & Evidence

Students looking for group members at ITB currently face three structural pain points:

1. **Information Noise**: Posts in class WhatsApp or LINE groups get rapidly buried. They lack structured information about skills, track records, target grades, or availability.
2. **First-Come Arbitrary Matching**: Students accept whoever replies first. Discrepancies only surface after project kickoff (e.g., one aiming for an A and working 15 hrs/week vs. one wanting a bare pass).
3. **The "Free-Rider" Tax**: Uneven commitment and mismatched skills lead to team conflict, lowered GPAs, and burnout for the hardest-working members.

### Hackathon Alignment
Addresses **Case 1: Smarter Campus and Learning** (*"Difficulty finding suitable study partners"*). While the primary demo focuses on course group assignments, the platform seamlessly handles competitions, event committees, and study circles.

---

## 💡 Solution Overview & Core Differentiators

OnlyPeer reimagines group formation through a **three-step verified funnel: Swipe ➡️ Chat ➡️ Commit**.

```
[ Seeker ] ──( Browse AI-Ranked Feed )──> [ Swipe Right ] ──> [ Join Request ]
                                                                     │
[ Leader ] <──( Receives Profile + AI Fit Summary )──────────────────┘
    │
    ▼
[ 1-on-1 Pre-Join Chat ] ──> [ Leader Decides: Approve / Reject ]
                                    │
                                    └─── Approved: Seeker joins & slot closes!
```

### 🔑 Key Design Principles
* **ITB-Exclusive & Trusted**: Sign-up strictly restricted to verified `@*.itb.ac.id` student emails with one-time codes (OTP).
* **One-Way Swipe Flow**: Only seekers swipe on open group cards. Group leaders never browse or swipe seekers blindly, preventing double-matching and unsolicited spam.
* **Talk Before Commit**: No automated instant joins. A real-time 1-on-1 chat allows both sides to evaluate chemistry, skill level, and schedule alignment before the leader approves.
* **Single Authority**: Only the group leader possesses approve/reject authority for each request.
* **Privacy & Consent First**: Sensitive assets such as resumes/CVs are kept in private cloud storage with expiring signed links (10 min TTL) accessible solely to relevant group leaders and confirmed team members.

---

## 🤖 Gemini AI Capabilities & Safeguards

OnlyPeer leverages the **Gemini API** as an intelligent matchmaker that augments—but never replaces—human judgment:

| Feature | Persona | Description | Priority |
| :--- | :--- | :--- | :---: |
| **Ranked Feed (AI-01)** | Seeker | Personalizes card ordering based on vector similarity between seeker profile (major, courses, skills, hours) and group requirements. | **Must** |
| **"Why This Group" (AI-02)** | Seeker | Generates concise, 1-line rationales on each card (e.g., *"Needs a backend dev; you listed Python; same course"*). | **Must** |
| **Fit Summary (AI-03)** | Leader | Summarizes candidate qualifications against group criteria, highlighting match points, gaps, and 2 suggested interview questions. | **Must** |
| **Ask the Agent (AI-04)** | Seeker | Natural language conversational search (e.g., *"Find a group for Algorithms strong in Python, free weekday evenings"*). | Should |
| **Chat Starters (AI-05)** | Both | Generates targeted icebreaker questions on grade goals, skills, and availability upon opening chat. | Could |

### 🛡️ Guardrails & Fallbacks
* **Rule-Based Fallback**: If Gemini API latency exceeds 5 seconds or encounters rate limits, the feed instantly falls back to deterministic rule scoring (skill and course overlap, newest first).
* **Decoupled Reliability**: The core flow (Swipe $\rightarrow$ Request $\rightarrow$ Chat $\rightarrow$ Approve) functions 100% reliably even with AI services toggled off.
* **Explicit User Consent**: CV text is only ingested into Gemini embeddings if the student explicitly opts in during upload.
* **AI Output Transparency**: All model evaluations are explicitly badged as *Suggestions*.

---

## 🛠️ System Architecture & Tech Stack

```
 ┌────────────────────────────────────────────────────────┐
 │                      Web Client                        │
 │           Next.js (React) + Tailwind CSS               │
 │           Mobile-First, Responsive PWA                 │
 └──────────────┬───────────────────────────┬─────────────┘
                │ Direct Auth               │ HTTPS / WS
                ▼                           ▼
     ┌──────────────────────┐    ┌───────────────────────────────────┐
     │    Supabase Auth     │    │            Backend API            │
     │ ITB Email OTP (Auth) │    │      FastAPI (Python, async)      │
     └──────────────────────┘    │  REST API + WebSocket Chat Server │
                                 │  Permissions, States, AI Fallback │
                                 └─┬──────────────┬──────────────┬───┘
                                   │              │              │
                   ┌───────────────┘              │              └───────────────┐
                   ▼                              ▼                              ▼
    ┌─────────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────────┐
    │     Supabase PostgreSQL     │  │   Supabase Storage      │  │         Gemini API          │
    │  - Relational Schema        │  │  - Private Bucket       │  │  - Embeddings (Similarity)  │
    │  - pgvector (Embeddings)    │  │  - 10-Min Signed Links  │  │  - Scoring & Fit Summaries  │
    └─────────────────────────────┘  └─────────────────────────┘  │  - Function / Tool Calling  │
                                                                  └─────────────────────────────┘
```

### Component Stack
* **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS, Lucide Icons, Framer Motion (swipe card animations). Hosted on **Vercel**.
* **Backend API**: Python 3.11+, FastAPI, Uvicorn, SQLAlchemy / SQLModel, WebSockets. Hosted on **Google Cloud Run**.
* **Database & Storage**: PostgreSQL 15+ with `pgvector` extension and Supabase Storage for encrypted resume PDFs.
* **Authentication**: Supabase Auth (passwordless email one-time password restricted to `@*.itb.ac.id`).
* **AI / Vector Store**: Google Gemini API (`text-embedding-004` & `gemini-1.5-flash` / `gemini-2.0-flash`).
* **Notifications**: WebSockets for live in-app updates; Resend for transactional email notifications.

---

## 🗄️ Database Schema

The relational schema is anchored on `join_requests`, orchestrating the interaction between seekers and group leaders:

| Table | Primary Responsibilities |
| :--- | :--- |
| `users` | ITB email, full name, major, academic year, short bio, LinkedIn URL, CV file path, embedding vector. |
| `user_courses` | Course codes completed or currently taken by the user (e.g., `IF2210`, `KU1001`). |
| `user_skills` | Technical and soft skills mapped to users (standardized tags + custom skills). |
| `groups` | Leader ID, category (`course`, `competition`, `event`, `social`), title, description, course code, target size, target grade, weekly commitment, status (`open`, `paused`, `full`, `closed`), embedding vector. |
| `group_skills_needed` | Target skill tags required by the group. |
| `group_members` | Active group rosters with member roles (`leader`, `member`) and joined timestamp. |
| `swipes` | Unique record of seeker swipes (`seeker_id`, `group_id`, `direction: left|right`, `created_at`). |
| `join_requests` | State-machine pipeline: `pending` $\rightarrow$ `chatting` $\rightarrow$ `approved` \| `rejected` \| `withdrawn`. |
| `messages` | Real-time chat messages linked to specific `join_requests`. |
| `notifications` | In-app notification queue (`new_request`, `chat_opened`, `message`, `approved`, `rejected`). |
| `reports` | Moderation queue for user/group abuse or policy violations. |
| `ai_recommendations` | Cached feed recommendations and fit explanations per seeker. |

---

## 🔌 Core API Endpoints

### Authentication & Profiles
* `GET /me` — Retrieve signed-in student profile, courses, and skills.
* `PUT /me` — Update profile, upload CV PDF, and refresh profile embedding.

### Groups & Feed
* `GET /feed?course=&category=&major=` — Fetch prioritized group cards for current seeker.
* `POST /groups` — Create a new group listing with required criteria and tags.
* `GET /groups/{id}` — Fetch public details of a group.
* `PATCH /groups/{id}` — Update group details, pause listing, or close group.
* `POST /swipes` — Record left/right swipe (right swipe automatically triggers a `join_request`).

### Requests & Decisions
* `GET /requests` — List incoming requests (for leaders) and outgoing requests (for seekers).
* `POST /requests/{id}/open-chat` — Transition request to `chatting` status.
* `POST /requests/{id}/approve` — Approve candidate into group (idempotent; triggers listing auto-close if full).
* `POST /requests/{id}/reject` — Reject request (permanently removes group from seeker's feed).
* `POST /requests/{id}/withdraw` — Seeker cancels pending or active request.
* `GET /requests/{id}/fit-summary` — Fetch Gemini-generated candidate compatibility report.

### Real-Time Chat & Agent
* `WS /chats/{request_id}` — Bi-directional WebSocket stream for 1-on-1 leader-seeker discussion.
* `GET /notifications` — Fetch user notification feed.
* `POST /agent/ask` — Natural language search interface powered by Gemini tool-calling.

---

## 📂 Project Structure

```bash
itb_hackathon/
├── docs/
│   └── OnlyPeer-PRD.pdf             # Comprehensive Product Requirements Document
├── frontend/                        # Next.js frontend application
│   ├── src/
│   │   ├── app/                     # App Router pages (/feed, /groups, /chat, /profile)
│   │   ├── components/              # SwipeCard, ChatWindow, Navbar, FilterSheet
│   │   ├── hooks/                   # useSwipe, useWebSocketChat, useAuth
│   │   └── lib/                     # Supabase client, API client, types
│   ├── public/                      # Static assets & brand graphics
│   ├── package.json
│   └── tailwind.config.ts
├── backend/                         # FastAPI Python backend service
│   ├── app/
│   │   ├── api/                     # REST routers (auth, feed, groups, requests, chat)
│   │   ├── core/                    # Security, ITB domain validator, config
│   │   ├── models/                  # SQLModel / SQLAlchemy database models
│   │   ├── services/
│   │   │   ├── ai_service.py        # Gemini API integration (embeddings, ranking, fit summary)
│   │   │   ├── chat_service.py      # WebSocket connection manager
│   │   │   └── storage_service.py   # Presigned private CV storage handler
│   │   └── main.py                  # FastAPI application entrypoint
│   ├── tests/                       # Pytest suite (state changes, auth permissions)
│   ├── requirements.txt
│   └── Dockerfile
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** 18+ and **pnpm** / **npm**
* **Python** 3.11+
* **Supabase** account (or local Supabase CLI instance)
* **Google Gemini API Key** ([Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/itb_hackathon.git
cd itb_hackathon
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
GEMINI_API_KEY=your-gemini-api-key
ALLOWED_EMAIL_DOMAIN=itb.ac.id
FRONTEND_URL=http://localhost:3000
```

Start the backend development server:
```bash
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file in `frontend/`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

Run the Next.js development client:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📅 Roadmap & Milestones

| Milestone | Deliverable | Status |
| :--- | :--- | :---: |
| **M1** | Auth with ITB email OTP verification & profile management | 🟡 In Progress |
| **M2** | Group creation, edit, course tagging, and closure rules | ⚪ Backlog |
| **M3** | Swipeable card feed with category/course filters & skip rules | ⚪ Backlog |
| **M4** | Join request lifecycle & in-app notification center | ⚪ Backlog |
| **M5** | Real-time WebSocket 1-on-1 chat with Approve/Reject actions | ⚪ Backlog |
| **M6** | Seed data generation & semifinal video end-to-end demo script | ⚪ Backlog |
| **M7** | Gemini AI embedding integration for ranked feed & "Why this group" | ⚪ Backlog |
| **M8** | Gemini AI candidate fit summaries & interview starter generation | ⚪ Backlog |
| **M9** | Usability verification, accessibility review (WCAG AA), bug fixes | ⚪ Backlog |
| **M10** | "Ask the agent" natural language search & polish for Final Day | ⚪ Backlog |

---

## 👥 Team & Roles

* **Product & Pitch**: User research, survey baseline, pitch deck & proposal video, demo scripting.
* **Frontend Engineer**: Mobile-first swipe UI, responsive group directory, chat interface, accessibility.
* **Backend Engineer**: FastAPI endpoints, Supabase Auth integration, WebSocket chat server, security & tests.
* **AI / ML Engineer**: Gemini API integration, prompt tuning, vector search with `pgvector`, fail-safe fallbacks.
* **UI/UX Designer**: User journey mapping, interactive Figma design system, usability testing.

---

## 📄 License & Reference Documents

* **Product Requirements Document**: [OnlyPeer-PRD.pdf](docs/OnlyPeer-PRD.pdf)
* Developed for **GDG ITB Hackathon 2026**.
