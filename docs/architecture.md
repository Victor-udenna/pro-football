# Frontend Architecture

## Overview

ProFootball Live Match Center is built using **Next.js 16 App Router**.

The app currently has two routes — a match list (`/`) and a match detail
page (`/matches/[id]`) — so the structure favors a small, flat layout over
a multi-feature module system. As the app grows past a couple of routes,
revisit whether a feature-first split earns its keep.

The primary goals of this architecture are:

- Scalability
- Maintainability
- Separation of concerns
- Reusability
- Performance

---

# Core Principles

## 1. Shared Components

UI components live under `components/`, grouped by the part of the product
they serve rather than by a feature module:

```text
components/
    ui/            shadcn/base-ui primitives (Button, Badge, Card, Dialog, ...)
    layout/         Site-wide chrome (SiteHeader)
    matches/        Match list + match card
    match-detail/    Match detail page sections
    chat/           Live match chat
    providers/       App-wide context providers
    state/          Shared loading / error / empty states
```

`components/ui/` holds generic, business-agnostic primitives. Everything
else in `components/` is specific to this product's domain (matches, chat)
but shared across more than one route or component tree.

---

## 2. Thin Routes

Pages inside the App Router stay minimal — they compose components and
delegate everything else.

```tsx
export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
      <MatchList />
    </div>
  );
}
```

---

## 3. Server First

By default, pages and layouts are Server Components (`RootLayout`, and the
route files themselves). Client Components (`"use client"`) are introduced
only when necessary, such as:

- Socket connections (`SocketProvider`, `use-socket`, `use-live-scores`)
- User interaction (chat input, username dialog)
- Local component state

---

## 4. Separation of State

Server state and client/UI state are treated differently.

**Server state** — fetched via `services/api.ts` and cached with
**TanStack Query** (`QueryProvider`, `use-matches`, `use-match`).

**Real-time state** — pushed over a Socket.IO connection
(`services/socket.ts`, `SocketProvider`) and merged into query cache or
local state by hooks like `use-live-scores` and `use-match-live-updates`.

**Local/UI state** — component-level `useState` (e.g. chat input value,
username dialog). There is no global client store in use today.

---

# High-Level Folder Structure

```text
src/
├── app/            Routes, layouts, loading UI
├── components/      UI, grouped as described above
├── hooks/          Reusable hooks shared across components
├── lib/            Framework-agnostic helpers (e.g. cn())
├── services/        API client and socket client
├── types/          Shared TypeScript types
└── utils/          Config, formatting, and small domain helpers
```

Refer to `folder-structure.md` for details on each directory.

---

# Design Philosophy

Architecture decisions should favor:

- Readability over cleverness
- Simplicity over abstraction
- Composition over inheritance
- Reuse over duplication

Don't introduce a directory (or a dependency already in `package.json`,
like Zustand or React Hook Form) until there's an actual use for it in the
app — an empty `stores/` folder or an unused form library is a decision the
docs shouldn't imply has already been made.
