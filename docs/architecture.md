# Frontend Architecture

Next.js 16 App Router. Two routes today — match list (`/`) and match detail
(`/matches/[id]`) — so the structure stays flat rather than feature-modularized.
Revisit if that changes.

## Principles

- **Shared components** — `components/` splits into `ui/` (generic primitives),
  `layout/` (page chrome), `shared/` (domain code, grouped by what it serves:
  `matches/`, `match-detail/`, `chat/`, `providers/`, `state/`).
- **Thin routes** — pages compose components, nothing else.
- **Server first** — Server Components by default; `"use client"` only for
  sockets, interaction, or local state.
- **Separated state** — server state via TanStack Query (`use-matches`,
  `use-match`); real-time via Socket.IO merged into the query cache
  (`use-live-scores`, `use-match-live-updates`); local UI state via `useState`.
  No global client store.

## Folder structure

```
src/
├── app/          Routes, layouts, loading UI
├── components/    ui/, layout/, shared/ — see folder-structure.md
├── hooks/        Shared hooks
├── lib/          cn() and other framework-agnostic helpers
├── services/      API + socket clients
├── types/        Shared TypeScript types
└── utils/        Config, formatting, domain helpers
```

## Philosophy

Readability over cleverness, simplicity over abstraction, reuse over
duplication. Don't add a directory, or wire up an installed-but-unused
dependency (Zustand, React Hook Form), before there's real code that needs it.
