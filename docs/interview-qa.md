### Interview Q&A: AI Career Coach Project

- **Project Overview**: Next.js App Router app providing AI chat, resume analysis, cover letter generation, learning roadmap, resume builder, and a voice coach.
- **Core Stack**: Next.js 15, TypeScript, Tailwind, Inngest, Gemini, Neon + Drizzle, ImageKit, Clerk, React Flow, Vapi SDK.

#### Architecture & Data Flow
- UI in `app/(routes)`; shared UI in `app/_components`, `components/ui`.
- Backend APIs in `app/api/*`; agents and workflows in `inngest/function.ts`.
- DB schema in `configs/schema.ts` using Drizzle; Neon connection in `configs/db.tsx`.

#### Features
- AI Chat: `AiCarrerChatAgent` via Gemini.
- Voice Coach: `VapiWidget` handles calls, transcripts, saves conversation.
- Resume Analyzer: Upload to ImageKit, analyze with Gemini 2.5, store JSON.
- Roadmap: Generate React-Flow-like JSON, persist via Inngest.
- Cover Letter: Build prompt and generate final letter text.
- Resume Builder: Forms + live preview.

#### Security & Env
- Secrets: `GEMINI_API_KEY`, `IMAGEKIT_*`, `NEXT_PUBLIC_NEON_DB_CONNECTION_STRING`, Clerk keys.
- Keep secrets in `.env`; only non-secret client values as `NEXT_PUBLIC_*`.

#### Common Q&A
- Why Inngest? Durable, observable steps and retries for AI workflows.
- Enforce JSON? Strict prompts; strip code fences; guarded JSON.parse.
- Large files? ImageKit storage, analyze text, persist JSON + URL.
- Non-blocking UI? Event-driven jobs + dialogs with loading.
- Sidebar bug fix? Properly grouped conditional.
- Next steps? Replace `<img>` with `next/image`, clean imports, add streaming.
