# Pro Football

Live football scores and per-match chat, built on Next.js.

## Approach

- **Data fetching** — REST for anything that just needs to be displayed (match lists, match detail), fetched through React Query so caching/refetching is handled for free.
- **Real-time** — a single Socket.IO connection (`use-socket`) is shared app-wide via context. Score/status updates patch the React Query cache directly (`use-live-scores`) instead of triggering a refetch, so the UI updates instantly without a network round trip. Chat (`use-chat`) is plain socket event state, kept separate from React Query since it's push-only and not really "cacheable" data.
- **Chat identity** — username + user id are generated client-side and persisted to `localStorage`, so no auth is required to join a match chat.
- **Forms** — react-hook-form for the two forms in the app (username entry, chat input), instead of hand-rolled `useState` + `onChange` wiring.
- **UI** — shadcn-style primitives (`components/ui`) composed into feature components (`components/shared`), Tailwind for styling, dark/light theme via a simple provider + localStorage.

## Trade-offs

- Live scores use cache patching rather than reconciling with a source of truth — if a socket event is missed, the UI can drift until the next full fetch/refetch.
- Chat has no persistence or moderation; history is only what's received during the current session.
- No auth means usernames aren't unique/verified — good enough for casual match chat, not for anything trust-sensitive.
