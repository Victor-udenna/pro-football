# Folder Structure

Naming: kebab-case files/folders, PascalCase components/types, camelCase
functions/variables/hooks (`use*`), UPPER_SNAKE_CASE constants.

## components/

```
components/
    ui/       Generic primitives (shadcn/base-ui) — Button, Card, Dialog, ...
    layout/    Page chrome — SiteHeader
    shared/    Domain code, grouped by what it serves:
        matches/, match-detail/, chat/, providers/, state/
```

No `features/` — with two routes a full feature-module split isn't worth it
(see `architecture.md`). `ui/` stays business-agnostic; everything else lives
in `shared/`.

## Other directories

- `app/` — routes, root layout, loading UI. No business logic.
- `hooks/` — data fetching (`use-matches`, `use-match`), sockets (`use-socket`,
  `use-live-scores`, `use-match-live-updates`), chat (`use-chat`,
  `use-chat-identity`).
- `lib/` — framework-agnostic helpers (`utils.ts` → `cn()`).
- `services/` — `api.ts` (REST client), `socket.ts` (Socket.IO client). No
  business logic.
- `types/` — shared types (`match.ts`, `chat.ts`, `socket.ts`).
- `utils/` — `config.ts` (env/storage constants), `id.ts`, `match.ts`
  (status/formatting), `typography.ts`.

## Guiding principle

Only add a directory when there's real code for it — not `stores/`,
`constants/`, or `features/` in anticipation of needing them.
