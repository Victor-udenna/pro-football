# ProFootball Live Match Center

Real-time football scores, match events, stats, and per-match chat, built
on Next.js 16 (App Router).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create `.env.local` with:

```bash
NEXT_PUBLIC_API_BASE_URL=https://profootball.srv883830.hstgr.cloud
NEXT_PUBLIC_SOCKET_URL=https://profootball.srv883830.hstgr.cloud
```

The app has two pages: the match list (`/`) and a match's detail page with
chat (`/matches/[id]`).

## How it's built

When a page first loads, it fetches its data the normal way — a regular
HTTP request to the API, once. From then on, updates arrive over a
Socket.IO connection that stays open in the background: goals, cards,
stat changes, and status changes all arrive as small "here's what
changed" messages, and the app patches them straight into the already-
loaded data instead of re-fetching. So the match list and match detail
pages don't poll the API on a timer — they just sit and wait for the
socket to tell them something changed. (The one exception: if a match
detail page somehow never got its live-update socket messages, it still
quietly re-checks with the API every 20 seconds — but only until the
match ends, since a finished match can't change anymore.)

Chat works a little differently: there's no API endpoint for it at all.
Messages, typing indicators, and "so-and-so joined" notices exist only as
socket events, held in the page's own memory for as long as you're on it.
Nothing about the chat is fetched on load, because there's nothing to
fetch it from.

The code itself is organized as one flat set of folders
(`components/`, `hooks/`, `services/`, etc.) rather than split into
per-feature modules — with only two pages, separate feature folders would
just add navigation overhead for no real benefit. Inside `components/`,
the split is `ui/` (generic, business-agnostic primitives — Button, Card,
Dialog), `layout/` (page chrome — just the header), and `shared/`
(everything domain-specific, grouped internally by what it serves —
`matches/`, `match-detail/`, `chat/`, `providers/`, `state/`). The
`docs/` folder has more detail: [architecture.md](docs/architecture.md)
and [folder-structure.md](docs/folder-structure.md) explain the folder
layout, and [design-system.md](docs/design-system.md) covers the colors,
fonts, and spacing rules.

The match detail page reuses its layout instead of branching into a
separate mobile component: below the score header sits an underline tab
bar (Timeline / Stats / Messages) that, on small screens, shows exactly
one section at a time. At the `lg` breakpoint the Messages tab disappears
and chat becomes a fixed sidebar instead — but Timeline and Stats stay
tab-switched even on desktop, rather than reverting to both stacked at
once. Same components, same state, just different CSS breakpoints
deciding what's visible.

Theme (light/dark/system) is handled without a dependency on
`next-themes` — a small `ThemeProvider` keeps the current choice in
`localStorage` and toggles a `.dark` class on `<html>`, and a blocking
inline script (`next/script` with `strategy="beforeInteractive"`) applies
that class before the page paints, so there's no flash of the wrong theme
on load. Defaults to the OS/browser preference until the user picks
otherwise.

## Things worth knowing (trade-offs)

**The API has no database — match state is not persisted.** The server
(`profootball.srv883830.hstgr.cloud`) holds matches in an in-memory store
only, and only exposes matches with a status between `NOT_STARTED` and
`FULL_TIME`. Once a match transitions to `FULL_TIME`, the server evicts it
from that store shortly after and generates a new simulated match in its
place. There's no persistence layer behind it — it's simulating a live
matchday, not maintaining a historical record.

The consequence: while a match is still in the client's React Query
cache, going to full-time doesn't cause any errors — the last known state
just stops updating, since polling and socket updates for a finished
match have nothing left to change. But a hard refresh discards that
cache and re-fetches from the server, and by that point the match may
already have been evicted server-side, so `GET /api/matches/{id}` returns
a `404`. `MatchDetailView` checks for that specific status code and
renders "This match has ended and is no longer available" instead of a
generic, retryable error — but it can't recover the score or event data,
since the server-side record no longer exists either. The actual fix
would be persisting finished matches on the backend (or the client
snapshotting match state to its own storage before eviction); neither is
something this front-end alone can address.

**Chat history is not persisted either, for the same reason.** Messages
exist only in the socket connection's in-memory client state
(`useChat`'s `useState`) for the duration of the session — there's no
storage layer backing it, so reloading or reopening a match's chat starts
from an empty state regardless of prior activity.

**Zustand and React Hook Form are installed but not used.** They're in
`package.json`, but nothing in the app currently needs a global state
store or a form library — plain `useState` covers everything so far.
Don't take their presence as a sign they're the intended pattern; add them
when something actually calls for them.

**There's no real login.** Chat identities are just a random guest name
generated in the browser (`utils/id.ts`) and remembered in `localStorage`
— not a real account system.

**Quick reactions are just chat messages, not a separate feature.** The
emoji row above the chat input (⚽🔥😂👏😢🟨) calls the exact same
`sendMessage` used by the text field — it's a shortcut for sending an
emoji-only message, not a distinct "reaction" protocol. That means no
per-message reaction counts or de-duplication (tapping 🔥 five times
posts five separate 🔥 messages) — the trade-off for not needing any
backend changes to ship it, since the Socket.IO server only understands
`send_message`, not a reaction event.

**No test suite.** There's no Jest/Vitest/Playwright setup — changes are
verified by running the dev server and checking the behavior directly.
Fine for a project this size, but worth knowing before assuming CI would
catch a regression.