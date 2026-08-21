# Frontend Development Guidelines

## General Principles

- Keep components small and focused.
- Prefer composition over inheritance.
- Avoid premature abstraction.
- Write self-documenting code.
- Reuse components in `components/ui/` before creating new ones.

---

# Naming Conventions

## Files

Use **kebab-case** for all files.

Examples:

```text
match-card.tsx
status-badge.tsx
use-live-scores.ts
api.ts
socket-provider.tsx
```

---

## Folders

Use **kebab-case**.

```text
match-detail/
providers/
```

---

## React Components

Use **PascalCase**.

```tsx
export function MatchCard() {}

export function StatusBadge() {}

export function SiteHeader() {}
```

---

## Hooks

Use **camelCase** and prefix with `use`.

Examples:

```ts
useMatches();

useLiveScores();

useConnectionStatus();
```

---

## Functions

Use **camelCase**.

Examples:

```ts
formatMatchStatus();

isMatchLive();

generateGuestUsername();
```

---

## Variables

Use **camelCase**.

Examples:

```ts
homeTeam;

matchStatus;

typingUsers;
```

---

## Constants

Use **UPPER_SNAKE_CASE**.

Examples:

```ts
API_BASE_URL;

CHAT_MESSAGE_MAX_LENGTH;

TYPING_DEBOUNCE_MS;
```

---

## Types

Use **PascalCase**.

Examples:

```ts
Match;

MatchStatus;

ChatMessage;
```

---

# Imports

Always use absolute imports via the `@/*` alias.

✅ Correct

```ts
import { Button } from "@/components/ui/button";
```

❌ Avoid

```ts
import Button from "../../../../components/ui/button";
```

---

# Components

A component should ideally have one responsibility.

If a component grows beyond approximately 250–300 lines, consider splitting it into smaller components.

---

# Styling

- Use Tailwind CSS.
- Avoid inline styles.
- Reuse UI components in `components/ui/` before creating new ones.
- Avoid duplicating utility classes — extract a component or use `cn()` when a combination repeats.

See `design-system.md` for the color, typography, and radius tokens actually
defined in `globals.css`.

---

# State Management

Use the appropriate tool for each type of state.

Server State

- TanStack Query (`useMatches`, `useMatch`)

Real-time State

- Socket.IO, layered on top of Query via hooks like `useLiveScores` and `useMatchLiveUpdates`

Component State

- `useState`

There is no global client-side store or form library in use yet. Zustand
and React Hook Form are present in `package.json` but not wired up —
don't reference them as the established pattern for client state or forms
until they're actually adopted somewhere in the app.

---

# Performance

- Prefer Server Components whenever possible.
- Lazy load heavy components.
- Avoid unnecessary memoization.
- Measure performance before optimizing.

---

# Accessibility

Every interactive element should support:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Appropriate ARIA attributes where required

---

# Commit Messages

This project follows Conventional Commits.

Examples

```text
feat(chat): add typing indicator

feat(matches): show live minute on match card

fix(socket): reconnect after connection drop

refactor(api): simplify request interceptor

chore(setup): configure commitlint
```
