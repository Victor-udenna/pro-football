# ProFootball Live Match Center

A real-time football match center built with **Next.js 16 (App Router)**. The application provides live match scores, events, statistics, match status updates, and per-match chat.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Application Structure](#application-structure)
- [Architecture](#architecture)
- [Responsive Match Detail](#responsive-match-detail)
- [Theme Management](#theme-management)
- [Known Limitations and Trade-offs](#known-limitations-and-trade-offs)
- [Development Notes](#development-notes)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Install the project dependencies:

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Environment Variables

Create a `.env.local` file in the project root and add the following:

```bash
NEXT_PUBLIC_API_BASE_URL=https://profootball.srv883830.hstgr.cloud
NEXT_PUBLIC_SOCKET_URL=https://profootball.srv883830.hstgr.cloud
```

### Environment Variable Reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL used for HTTP API requests |
| `NEXT_PUBLIC_SOCKET_URL` | URL used to establish the Socket.IO connection |

## Application Structure

The application currently consists of two primary routes:

| Route | Description |
|---|---|
| `/` | Displays the list of available live and upcoming matches |
| `/matches/[id]` | Displays detailed information for a specific match, including timeline, statistics, and chat |

The project intentionally uses a **flat application structure** rather than organizing code into separate feature modules. With only two primary pages, this keeps navigation and maintenance straightforward without introducing unnecessary architectural overhead.

### Component Organization

Components are grouped into three main categories:

- `components/ui/` — Generic, business-agnostic UI primitives such as `Button`, `Card`, and `Dialog`.
- `components/layout/` — Application-level layout elements such as the header.
- `components/shared/` — Domain-specific components, organized internally by responsibility:
  - `matches/`
  - `match-detail/`
  - `chat/`
  - `providers/`
  - `state/`

Additional architectural documentation is available in:

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/folder-structure.md`](docs/folder-structure.md)
- [`docs/design-system.md`](docs/design-system.md)

## Architecture

### Initial Data Loading

When a page is loaded, its initial data is retrieved through a standard HTTP request to the API.

After the initial request completes, the application does not continuously poll the API for updates. Instead, it establishes a persistent **Socket.IO** connection and listens for real-time events.

This approach allows the application to:

1. Fetch the initial state once.
2. Maintain an open socket connection.
3. Receive incremental updates as events occur.
4. Patch the existing client-side data rather than repeatedly fetching the entire resource.

Live events can include:

- Goals
- Cards
- Match statistics
- Match status changes
- Other match-state updates

### Fallback Polling

The match detail page includes a fallback mechanism for cases where live socket updates are not received.

While the match is still active, the client can re-check the API every **20 seconds**. Polling stops once the match reaches `FULL_TIME`, because a completed match is no longer expected to change.

The primary update mechanism therefore remains Socket.IO, with polling serving only as a resilience mechanism.

### Chat

Chat is implemented entirely through Socket.IO.

There is currently no HTTP API endpoint for chat history. Chat-related information exists only within the active socket session and the page's client-side state.

Socket events are used for:

- Sending messages
- Receiving messages
- Typing indicators
- Join notifications

Because there is no persistence layer for chat, messages are not restored when the page is refreshed or reopened.

## Responsive Match Detail

The match detail page uses a shared responsive layout rather than maintaining separate mobile and desktop implementations.

The layout consists of:

1. Match score/header section
2. Tab navigation
3. Timeline
4. Statistics
5. Chat

### Mobile

On smaller screens, the match content uses an underline tab bar:

- Timeline
- Stats
- Messages

Only one section is displayed at a time.

### Desktop

At the `lg` breakpoint:

- The Messages tab is hidden.
- Chat becomes a fixed sidebar.
- Timeline and Stats remain tab-switched.

This approach keeps the same components and application state across screen sizes while allowing CSS breakpoints to determine the appropriate presentation.

## Theme Management

Theme support includes:

- Light
- Dark
- System

The application does not use `next-themes`.

Instead, a lightweight custom `ThemeProvider`:

1. Stores the user's theme preference in `localStorage`.
2. Toggles the `.dark` class on the `<html>` element.
3. Falls back to the operating system/browser preference when no explicit preference has been selected.

A blocking inline script is loaded using `next/script` with:

```tsx
strategy="beforeInteractive"
```

This applies the correct theme before the page is painted and prevents a flash of the wrong theme during initial loading.

## Known Limitations and Trade-offs

### 1. Match Data Is Not Persisted

The backend does not currently use a database. Match state is maintained in an in-memory store.

The API server:

```text
https://profootball.srv883830.hstgr.cloud
```

only exposes matches whose status is between `NOT_STARTED` and `FULL_TIME`.

Once a match reaches `FULL_TIME`, the server removes it from the in-memory store shortly afterward and generates another simulated match.

This means the backend currently simulates a live matchday rather than maintaining a historical match database.

#### Impact on the Client

If a match reaches `FULL_TIME` while its data is still present in the client's React Query cache, the existing view remains usable because the final known state is retained locally.

However, a hard refresh clears the client cache and triggers a new API request. If the match has already been evicted from the backend, the API can return:

```text
404 Not Found
```

`MatchDetailView` handles this specific response and displays:

> This match has ended and is no longer available

instead of presenting it as a generic retryable error.

The frontend cannot restore the match's historical data because the backend record no longer exists.

#### Recommended Production Solution

For a production implementation, finished matches should be persisted in a database. An alternative would be to snapshot completed match data into client-side storage before eviction, although server-side persistence is the preferred solution.

---

### 2. Chat History Is Not Persisted

Chat messages are stored only in the active client-side state managed by `useChat`.

There is currently no persistent chat storage layer.

As a result:

- Refreshing the page clears the chat.
- Reopening a match starts with an empty chat.
- Previous messages cannot be retrieved from the backend.

A production implementation would require a persistent chat service or database-backed message history.

---

### 3. Zustand and React Hook Form Are Installed but Unused

`Zustand` and `React Hook Form` are currently included in `package.json`, but neither is required by the current implementation.

The application currently relies primarily on React state and hooks.

Their presence in the dependency list should therefore not be interpreted as an architectural requirement.

They can be introduced later if the application grows to require:

- More complex global state management
- Cross-page client state
- Complex forms
- Advanced form validation

---

### 4. There Is No Real Authentication

The application does not currently implement user authentication.

Chat users are represented by randomly generated guest identities created in the browser and persisted in `localStorage`.

The identity-generation logic is located in:

```text
utils/id.ts
```

This is sufficient for a demonstration environment but should be replaced with a proper authentication and user-management system for production.

---

### 5. Quick Reactions Are Implemented as Chat Messages

The chat interface includes quick reaction buttons:

```text
⚽ 🔥 😂 👏 😢 🟨
```

These are not implemented as a separate reaction protocol.

Instead, clicking a reaction invokes the same `sendMessage` function used by the regular text input and sends an emoji-only chat message.

For example, clicking `🔥` five times results in five separate `🔥` messages.

There is currently no:

- Per-message reaction count
- Reaction aggregation
- Reaction deduplication
- Dedicated reaction Socket.IO event

This implementation was intentionally chosen because it works with the existing `send_message` socket event and does not require backend changes.

A production implementation could introduce a dedicated reaction event and data model.

---

### 6. No Automated Test Suite

The project does not currently include:

- Jest
- Vitest
- Playwright
- Cypress
- Automated CI test coverage

Changes are currently verified by running the development server and manually checking application behavior.

This is acceptable for a project of this scope, but automated unit, integration, and end-to-end tests should be introduced before the application is considered production-ready.

## Development Notes

### Data Strategy

The application follows a **fetch-on-load, subscribe-for-updates** model:

```text
Initial page load
      ↓
HTTP API request
      ↓
Initial match state
      ↓
Socket.IO connection
      ↓
Real-time events
      ↓
Update existing client state
```

This avoids unnecessary recurring API requests and provides a more responsive real-time experience.

### Production Considerations

Before deploying this architecture to production, the following areas should be addressed:

- Persist completed match data.
- Persist chat messages where chat history is required.
- Introduce real authentication and authorization.
- Add automated testing.
- Remove unused dependencies where appropriate.
- Add structured error monitoring.
- Add API and socket reconnection handling.
- Consider rate limiting and abuse protection for chat.
- Introduce a dedicated reaction protocol if reactions become a first-class feature.
- Add CI checks for linting, type checking, and tests.

## Summary

ProFootball Live Match Center is designed around a lightweight real-time architecture: HTTP is used for initial data retrieval, while Socket.IO handles live match updates and chat.

The frontend deliberately avoids unnecessary polling, feature-folder complexity, and additional state-management dependencies. The current backend is intentionally simulated and in-memory, which keeps the project simple for demonstration purposes but means match history and chat history are not persistent.

For a production implementation, the primary architectural upgrade would be introducing persistent backend storage alongside authentication, automated testing, and stronger operational safeguards.
