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
match-card.tsx
status-badge.tsx
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

All UI, grouped by what it serves rather than by feature module:

```text
components/
    ui/            Generic primitives (shadcn/base-ui) — Button, Badge, Card, Dialog, Input, Avatar, ScrollArea, Separator
    layout/        Site-wide chrome — SiteHeader
    matches/        Match list page components
    match-detail/   Match detail page components
    chat/          Live match chat
    providers/      App-wide React providers (QueryProvider, SocketProvider)
    state/         Shared loading / error / empty state components
```

`components/ui/` should stay business-agnostic. Anything that knows about
matches, chat, or football belongs in one of the other subdirectories.

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
