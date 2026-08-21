# Frontend Development Guidelines

- Keep components small and focused; split past ~250–300 lines.
- Prefer composition over inheritance; avoid premature abstraction.
- Reuse `components/ui/` before creating something new.
- Write self-documenting code.

## Naming

| Item          | Convention        | Example                          |
| ------------- | ------------------ | ----------------------------------- |
| Files/folders | kebab-case         | `match-row.tsx`, `match-detail/`   |
| Components    | PascalCase         | `MatchRow`, `SiteHeader`           |
| Hooks         | camelCase, `use*`  | `useMatches`, `useLiveScores`      |
| Functions     | camelCase          | `formatMatchStatus`                |
| Variables     | camelCase          | `homeTeam`, `typingUsers`          |
| Constants     | UPPER_SNAKE_CASE   | `API_BASE_URL`                     |
| Types         | PascalCase         | `Match`, `ChatMessage`             |

## Imports

Always use the `@/*` alias — `import { Button } from "@/components/ui/button"`,
never relative `../../../`.

## Styling

Tailwind only, no inline styles. Reuse `components/ui/` before adding new
markup; use `cn()` instead of duplicating class combinations. See
`design-system.md` for tokens.

## State

- Server state → TanStack Query (`useMatches`, `useMatch`)
- Real-time → Socket.IO layered on Query (`useLiveScores`, `useMatchLiveUpdates`)
- Local state → `useState`

Zustand and React Hook Form are installed but unused — don't treat them as
the established pattern until something actually needs them.

## Performance & accessibility

Prefer Server Components; lazy-load heavy components; measure before
optimizing. Every interactive element needs keyboard support, visible focus
states, semantic HTML, and ARIA where needed.

## Commits

Conventional Commits — `feat(chat): add typing indicator`,
`fix(socket): reconnect after drop`, `refactor(api): simplify interceptor`.
