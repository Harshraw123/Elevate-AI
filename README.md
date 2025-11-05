Elevate AI — Intelligent Career Growth Platform

Elevate AI is a modern SaaS platform that empowers professionals with AI-driven career tools. It helps users generate standout resumes and cover letters, build personalized roadmaps, and get interactive coaching via chat and voice — all optimized for performance and a smooth UX.


Overview

Elevate AI provides an integrated suite of AI modules to simplify every stage of professional growth. Whether you are preparing for your first job or advancing your career, Elevate AI delivers tailored support through natural language understanding and smart content generation.


Key Features

1) AI Resume Builder
- Generate ATS-friendly resumes from structured inputs or extracted text
- Multiple templates and PDF export
- Resume analysis with scores, strengths/weaknesses, and improvement tips

2) AI Cover Letter Generator
- Job-aware, concise, professionally formatted letters
- Tone customization and resume-context alignment

3) AI Career Coach (Chat + Voice)
- Real-time conversational guidance on careers, interviews, and skills
- Voice-enabled via Vapi widget

4) AI Career Roadmap
- Step-by-step upskilling plan with milestones and recommended resources


Tech Stack

- Frontend: Next.js 15, React 18, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, Inngest for background/agent orchestration
- AI: Gemini models via @inngest/agent-kit
- DB/ORM: PostgreSQL (Neon), Drizzle ORM
- Voice: Vapi Web SDK
- Deployment: Vercel


Architecture (High-Level)

- App Router with colocated UI and API routes under `app/`
- AI agents composed with `@inngest/agent-kit` in `inngest/function.ts`
- API endpoints for agents and workflows under `app/api/*`
- Drizzle schema and DB config in `configs/`
- Shared UI components under `components/ui`


Getting Started

Prerequisites
- Node.js 18+
- A PostgreSQL database (Neon recommended)
- Gemini API key
- (Optional) Vapi key for voice capabilities

Install
```
npm install
```

Environment Variables
Create a `.env.local` at the project root and add the following:
```
# AI
GEMINI_API_KEY=your_gemini_key

# Voice (optional; used on client for the Vapi widget)
NEXT_PUBLIC_VAPI_KEY=your_vapi_public_key

# Database (Neon serverless connection)
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=postgres://user:password@host/db?sslmode=require
```
Note: Do not commit real secrets. Keep keys out of client-exposed variables unless absolutely required. Server-only secrets should not be prefixed with `NEXT_PUBLIC_`.

Run
```
npm run dev
```
App runs at `http://localhost:3000`.

Build & Start
```
npm run build
npm start
```

Scripts
- `dev`: Start Next.js in development
- `build`: Build for production
- `start`: Run production server
- `lint`: Run ESLint


Core Modules & Paths

- Dashboard and tools UI: `app/(routes)/dashboard`, `app/(routes)/ai-tools/*`
- Agents and workflows: `inngest/function.ts`
- API routes:
  - `app/api/ai-carrer-chat-agent/route.tsx`
  - `app/api/ai-cover-letter-agent/route.tsx`
  - `app/api/ai-experience-summery/route.ts`
  - `app/api/ai-resume-agent/route.ts`
  - `app/api/ai-resume-summery/route.ts`
  - `app/api/ai-roadmap-agent/route.tsx`
  - `app/api/history/route.ts`
  - `app/api/save-conversation/route.ts`
  - `app/api/save-transcript/route.ts`


AI Models & Agents

- Gemini models configured via `@inngest/agent-kit` in `inngest/function.ts`
- `GEMINI_API_KEY` is required at runtime
- Agents include: Career Coach, Resume Summary/Bullet Points, Resume Analyzer, Cover Letter, Roadmap Generator


Database

- Drizzle ORM with Neon PostgreSQL
- Connection string read from `NEXT_PUBLIC_NEON_DB_CONNECTION_STRING`
- Schema under `configs/schema.ts`; DB config in `configs/db.tsx`


Security & Keys

- Keep `GEMINI_API_KEY` server-side (do not expose publicly)
- Only use `NEXT_PUBLIC_*` for values that must be readable by the browser
- Never commit `.env*` files


Performance & DX

- See `PERFORMANCE_OPTIMIZATION.md` and `TTFB_OPTIMIZATION.md` for guidance
- Includes lazy-loading, skeletons, and TTFB monitors in `app/_components/*`


License

Proprietary — all rights reserved unless explicitly stated otherwise.
