# ProFootball Design System

Reference for tokens in `src/app/globals.css` — keep them in sync.

## Principles

Token-first: no raw hex/oklch/pixel values in components — use
`bg-background`, `rounded-lg`, `text-destructive`, etc. Raw values live in
`:root`, mapped to Tailwind names via `@theme inline`; every color has a
`.dark` override. Never use `bg-white` — use `bg-background`.

Components come from shadcn (style `base-nova`, base color `neutral`) on
`@base-ui/react` primitives, customized in `components/ui/`.

## Color

No custom brand palette — shadcn's neutral oklch scale, light/dark pair per
role: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`,
`muted`, `accent`, `destructive` (also doubles as the **live-match** accent),
`border`, `input`, `ring`.

`chart-*` and `sidebar-*` tokens exist (shadcn scaffold) but are unused —
nothing needs them yet.

**Live match:** no dedicated status-color tokens — reuses `Badge` variants:
`destructive` + `ring-destructive/25` + animated `LiveIndicator` bar for
live, `outline` for upcoming, `secondary` for finished. See
`components/shared/matches/{live-indicator,match-row}.tsx`.

## Typography

Two fonts via `next/font/google`: **Oswald** → `font-heading` (headings,
badges, scores), **Source Sans 3** → `font-sans` (body, the default).

Shared display style instead of a type scale:

```ts
// src/utils/typography.ts
export const DISPLAY_TEXT_CLASS = "font-heading uppercase tracking-[0.16em]";
```

Otherwise use Tailwind's default `text-*` sizes/weights directly.

## Spacing, radius, shadows

No custom spacing or width tokens — default Tailwind scale + arbitrary
`max-w-*` where needed.

Radius is the one real customization — every step derives from `--radius`
(`0.5rem` / 8px): `sm` 0.6×, `md` 0.8×, `lg` 1× (default), `xl` 1.4×, `2xl`
1.8×, `3xl` 2.2×, `4xl` 2.6×. Change `--radius` once to reshape the whole app.

No custom shadows — default Tailwind `shadow-*` scale.

## Buttons

`components/ui/button.tsx` wraps `@base-ui/react/button` with `cva`.
Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
Sizes: `default`, `xs`, `sm`, `lg`, `icon(-xs/sm/lg)`. Add a variant to
`buttonVariants` rather than hand-rolling button styles.

## Dark mode

Toggled by a `.dark` class on `<html>` (`ThemeProvider` + `ThemeToggle` in
the header — system/light/dark, persisted to `localStorage`, applied
pre-hydration to avoid a flash). Every color token needs a `.dark` override;
never hardcode a color.

## Adding a token

1. Check it doesn't already exist in `globals.css`.
2. Only add one if the value repeats — a one-off gets an arbitrary Tailwind
   value instead.
3. Raw value in `:root`, mapped in `@theme inline`, `.dark` override if it
   changes, then update this doc.
