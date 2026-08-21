# Folder Structure

This document explains the purpose of each top-level directory within `src`.

## Naming Convention

The project follows the following naming conventions:

| Item             | Convention         |
| ---------------- | ------------------ |
| Files            | kebab-case         |
| Folders          | kebab-case         |
| React Components | PascalCase         |
| Hooks            | camelCase (`use*`) |
| Functions        | camelCase          |
| Variables        | camelCase          |
| Constants        | UPPER_SNAKE_CASE   |
| Types            | PascalCase         |

Examples:

```text
match-row.tsx
live-indicator.tsx
use-live-scores.ts

match-detail/
providers/

export function MatchCard() {}
export function useLiveScores() {}
```

---

## app/

Contains the Next.js App Router.

Responsibilities:

- Routes (`page.tsx`)
- Root layout
- Loading UI
- Global styles (`globals.css`)

Business logic should remain outside this directory.

---

## components/

```text
components/
    ui/            Generic primitives (shadcn/base-ui) — Button, Badge, Card, Dialog, Input, Avatar, ScrollArea, Separator
    layout/        Site-wide chrome — SiteHeader
    shared/         Everything else — reusable across more than one route
```

`components/ui/` stays business-agnostic — no component in there should know
what a "match" is. `components/layout/` is page chrome (headers, shells).
Everything domain-specific or cross-cutting lives under `components/shared/`,
grouped internally by what it serves rather than flattened:

```text
components/shared/
    matches/        Match list page components
    match-detail/   Match detail page components
    chat/          Live match chat
    providers/      App-wide React providers (QueryProvider, SocketProvider)
    state/         Shared loading / error / empty state components
    connection-status-badge.tsx
    theme-toggle.tsx
```

There is no `features/` directory — with two routes, a full feature-module
split would be overhead with nothing to isolate (see `architecture.md`).
`shared/` is where that domain code lives instead, one subfolder per concern.

---

## hooks/

Reusable custom hooks — data fetching (`use-matches`, `use-match`), sockets
(`use-socket`, `use-connection-status`, `use-live-scores`,
`use-match-live-updates`), and chat (`use-chat`, `use-chat-identity`).

---

## lib/

Framework-agnostic helpers. Currently just `utils.ts` (`cn()` for merging
Tailwind classes).

---

## services/

Communication with external systems:

- `api.ts` — REST API client
- `socket.ts` — Socket.IO client

Business logic should not live here.

---

## types/

Shared TypeScript types used across components and hooks — `match.ts`,
`chat.ts`, `socket.ts`.

---

## utils/

Small domain helpers and configuration:

- `config.ts` — environment-derived constants (API/socket URLs, storage keys)
- `id.ts` — id/username generation
- `match.ts` — match status/formatting helpers
- `typography.ts` — shared text style constants (`DISPLAY_TEXT_CLASS`)

---

# Guiding Principle

If a directory doesn't have anything in it yet, it doesn't belong in this
document (or in `src/`). Add a folder — `stores/`, `constants/`,
`features/`, or otherwise — when there's real code to put in it, not in
anticipation of it.
