# Jopalesi — Claude Context

## Stack
- **Next.js 16** App Router, TypeScript, Tailwind v4
- Static site export (`npm run build`)
- Dev server: `npm run dev`

## Project structure

```
app/
  layout.tsx          — Root layout: I18nProvider + BackgroundManager + Nav + CursorBox
  page.tsx            — Home: renders <DraggableTextBox />
  globals.css         — Dark theme, .page-scroll scrollbar styles
  icon.svg            — Favicon (pixel-art sticks)
  maja/page.tsx       — Latvian home alias (/maja), same as /
  about/page.tsx      — About page
  projects/page.tsx
  people/page.tsx
  contact/page.tsx
  meetings/page.tsx

components/
  BackgroundManager.tsx — WebGL canvas (shader sticks), overlay, freeze logic
  Nav.tsx               — Responsive nav: 5 DraggableButtons + LanguageButton
  CursorBox.tsx         — Draggable "JOPALESI" box; tap on sub-pages → navigate to /maja
  DraggableButton.tsx   — Shared draggable nav button (label, href, isActive)
  LanguageButton.tsx    — Draggable language picker with animated dropdown
  DraggableTextBox.tsx  — Draggable home-page description box
  PageTemplate.tsx      — Sub-page content wrapper (scrollable panel)

lib/
  routes.ts   — navRoutes array (5 routes; label = translation key, e.g. "projects")
  theme.ts    — Color constants
  shaders.ts  — GLSL source strings
  i18n.tsx    — I18nProvider context + useI18n hook

locales/
  en.ts       — Master locale; exports Translations type
  lv.ts, es.ts, de.ts, zh.ts, ru.ts, ar.ts, ka.ts, hy.ts
  index.ts    — locales Record<string, typeof en>
```

## Routes

| Path       | File                    | navRoutes label |
|------------|-------------------------|-----------------|
| /          | app/page.tsx            | (home)          |
| /maja      | app/maja/page.tsx       | (home alias)    |
| /projects  | app/projects/page.tsx   | projects        |
| /people    | app/people/page.tsx     | people          |
| /contact   | app/contact/page.tsx    | contact         |
| /meetings  | app/meetings/page.tsx   | meetings        |
| /about     | app/about/page.tsx      | about           |

`isHome = pathname === "/" || pathname === "/maja"`

## Design system

Colors (`lib/theme.ts`):
- `STICK_COLOR`  `#bdb2a3` — warm off-white, default element color
- `HOVER_COLOR`  `#a46b63` — mid-red on hover
- `ACTIVE_COLOR` `#8b2424` — dark red for active nav route
- `BG_COLOR`     `#0a0a0c` — near-black background

Typography: monospace throughout, uppercase tracking, small sizes (0.65–0.92rem).

Visual: arty / niche, shader-first, draggable UI elements positioned with viewport-percentage coords.

## Draggable element pattern

All draggable components share the same approach:
- State: `pos` (% viewport), `posRef` (for event handlers without stale closure)
- `DRAG_THRESHOLD = 6px` to distinguish tap from drag
- `origin.current` stores mouse/touch start point + button start position
- Global `mousemove`/`mouseup` + `touchmove`/`touchend` listeners in `useEffect`
- Position clamped `[0, 100]%`; applied as `left: X%, top: Y%, transform: translate(-50%,-50%)`
- `e.preventDefault()` on `onTouchStart` prevents synthetic mouse events firing after touch

## Nav responsive layout

Breakpoints (in `Nav.tsx`):
- `>= 1100px` → desktop: single row of 5 nav + language
- `480–1099px` → tablet: row 1 (3 nav), row 2 (2 nav + language)
- `< 480px`   → mobile: 2-col grid (4 nav) + 5th nav; language top-right

Initial positions are reset on resize (via `key={layout}` prop on each button).

## i18n

- Client-side only, no locale routes
- Language stored in `localStorage["jopalesi-lang"]`
- Provider in `app/layout.tsx` wraps everything
- All sub-pages are `"use client"` and call `const { t } = useI18n()`
- To add a new locale: create `locales/XX.ts` satisfying `Translations`, add to `locales/index.ts`, add entry to `LANGUAGES` array in `LanguageButton.tsx`
- To add a new nav key: add to `en.ts` nav object, add to all other locale files, add route to `lib/routes.ts`

## Shader (BackgroundManager)

- 40 sticks, animated WebGL canvas
- 5 cursor modes blended by cursor position; `lerpK = 1 - Math.pow(0.87, dt)` (~5s half-life)
- Freezes on sub-pages: `frozenRef` captures `liveRef` snapshot on navigation away from home
- `DEFAULT_SNAPSHOT` time=137.3 used for direct navigation to sub-pages (bypasses home animation)
- Overlay fades 0→82% opacity over 1s when leaving home

## Key CSS

- `.page-scroll` (globals.css): custom scrollbar, 22px wide, #bdb2a3 thumb
- `PageTemplate`: fixed panel — top 13vh, bottom 16vh, right 1.2rem (scrollbar gap), padding-left 2rem

## Common gotchas

- **Border shorthand conflict**: Never mix `border: "Xpx solid color"` + `borderTop: "none"` in React inline styles. Use explicit `borderTopWidth`, `borderBottomWidth`, etc.
- **Dropdown direction**: Wrap the trigger in `display:inline-block; position:relative` so `translate(-50%,-50%)` on the outer fixed element doesn't shift upward when the dropdown opens. Dropdown uses `position:absolute; top:100%`.
- **layout.tsx is a server component** (exports `metadata`). `I18nProvider` is a client component imported into it — this is valid in Next.js App Router.
