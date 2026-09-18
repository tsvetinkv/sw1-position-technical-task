# Countries of the World

A single-page app that fetches country data and displays it as a responsive,
color-coded, filterable grid of cards with light/dark theme support.

## Getting started

```bash
npm install
npm run dev
```

The app will be available at the local URL Vite prints (typically
`http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

No environment variables or API keys are required — `countries.json` is
served as a static file and read via `fetch('/countries.json')`, the same
way a real API response would be consumed.

## Stack

## Stack

- **React 19 + TypeScript + Vite** — React fits this app's shape well: the
  UI is a tree of small, reusable pieces driven by one source of data
  (cards, legend, controls all rendering from the same `Country[]`), which
  is exactly the component + props model React is built around, and its
  large ecosystem meant no time spent building basics from scratch.
  TypeScript is the right call on top of that for a data-shaped app like
  this: the same `Country`/`Continent` types flow through every component
  that touches country data, so a mismatched field is a compile error
  instead of a blank card at runtime. Vite gives fast HMR and a minimal
  build setup, which fits a focused, small-scope app without unnecessary
  overhead.
- **Tailwind CSS v4** — using its `@theme`/`@theme inline` config instead of
  hardcoded colors means light/dark theming is driven entirely by CSS
  custom properties that flip on a single `.dark` class, and continent
  colors are centralized in one file (`continentTheme.ts`) rather than
  duplicated across components — the right tradeoff for a UI with six
  color variants that both need to stay in sync and pass contrast checks
  in two themes.

## Features

- Fetches country data from `countries.json` via `fetch`, with a simulated
  network delay and a proper loading indicator.
- Renders each country as a card: image, name, short description, continent,
  capital, language, population, and total area.
- Color-codes cards by continent, with a legend that works as a filter —
  clicking a continent narrows the grid to just that continent.
- Search by country name and sort by name, population, or area (ascending
  or descending). The 12-card display cap applies to the current
  filtered/sorted result.
- Light/dark theme toggle, persisted to `localStorage`, with continent
  colors and text contrast tuned separately for each theme to stay WCAG
  2.1 AA compliant rather than just inverting colors.
- Friendly error state if the fetch fails, with a retry action.
- Semantic, accessible markup throughout: proper landmark elements,
  heading hierarchy, `alt` text on flag images, real `<label>`s on every
  input/select, `aria-pressed` on filter toggles, and a live region
  announcing result counts as filters change.
- Written in TypeScript with no `any`.

## What I'd improve with more time

- **Debounce the search input.** It currently filters on every keystroke,
  which is fine at 30 records but wouldn't scale to a real API-backed list.
- **URL-sync filter/sort state** (query params) so a filtered view is
  shareable and survives a refresh, rather than resetting on reload.
- **Extract a `useCountryFilters` hook** to move the filter/sort state and
  `useMemo` derivation out of `App.tsx` and into something independently
  testable, now that the feature has grown past a couple of `useState`
  calls.
- **Add tests** — none currently exist. `filterAndSortCountries` in
  particular is a pure function and would be cheap to unit test directly;
  the interactive components would benefit from a few React Testing Library
  smoke tests (search narrows results, sort direction toggles, continent
  filter clears).
- **Virtualize or paginate beyond 12** if the dataset grows — the current
  cap is a simple `.slice(0, 12)`, which is fine for this dataset size but
  wouldn't be the right approach at scale.

See [`AI_NOTES.md`](https://github.com/tsvetinkv/sw1-position-technical-task/blob/main/AI_NOTES.md)
for the AI-collaboration writeup required by the task.
