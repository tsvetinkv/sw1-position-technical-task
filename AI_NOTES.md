# AI Collaboration Notes

## Feature built with AI assistance

Sorting and filtering (bonus): search by name, filter by continent, and sort
by name/population/area (ascending/descending), with the existing 12-card
cap applied to the filtered/sorted result rather than the raw list. This
also covers a follow-up UX pass that merged the sort field and sort
direction into a single, accessible custom dropdown.

## Prompts used

**Initial prompt**, after providing the assistant with the existing types,
hook shape, component contracts, and theme tokens so it wasn't guessing:

> I have a React 19 + TypeScript + Tailwind v4 (Vite) app that displays
> country cards. Add sorting and filtering.
>
> [existing `Country`/`Continent` types, `useCountries` discriminated union,
> component props, and available Tailwind tokens]
>
> Requirements:
> 1. Search by country name — case-insensitive substring match.
> 2. Filter by continent, replacing the Legend's existing scroll-to-continent
>    behaviour with actual filtering, with a clear active/pressed state and a
>    way to clear the filter.
> 3. Sort by name, population, or total area, ascending or descending.
> 4. The 12-card cap must apply to the filtered and sorted result, not the
>    raw list.
> 5. Show a live result count and a proper empty state when nothing matches.
> 6. Full keyboard accessibility, `aria-pressed` on filter pills, result
>    count in a polite live region.
> 7. TypeScript, no `any`. Derive filtered/sorted state during render
>    (`useMemo`), not via `useState` + `useEffect`.
> 8. Don't mutate the `countries` prop when sorting.

**Follow-up fix prompts**, after reviewing the first-pass output and
catching the issues listed below — each targeting one specific, named
problem:
>1. Remove a `data-continent` attribute left over from the old scroll
>   behaviour, now unused.
>2. Rename `CountryGrid`'s `countries`/`totalCount` props to `results`/
>   `allCount` for clarity, since `countries` had silently changed meaning.
>3. Replace an unchecked `as SortKey` cast with a runtime type guard.
>4. Derive a duplicated `SORT_KEYS` array from the existing `SORT_OPTIONS`
>   array instead of hand-maintaining both.

**UX redesign prompt**, after deciding the separate sort-key `<select>` plus
icon-only direction button was not user-friendly:

> Redesign the sort control in `CountryControls.tsx`. Merge sort field and
> sort direction into a single control instead of two — one dropdown with
> six plain-language options ("Name (A–Z)", "Population (low to high)",
> etc.), no icons or arrows to decode. Internally map the chosen option back
> to the existing `sortKey`/`sortDirection` pair so `App.tsx` and its state
> shape don't need to change. Keep full keyboard accessibility and a real
> `<label>`.

**Custom dropdown prompt**, after deciding the native `<select>` didn't give
enough control over the option list's appearance and behaviour:

> Replace the native `<select>` in the sort control with a custom,
> keyboard-accessible dropdown (`role="listbox"`/`role="option"`,
> `aria-selected`, arrow-key navigation, `Escape` to close) styled to match
> the rest of the UI, while keeping the same external props and behaviour.

## What the AI got right on the first pass

- Correctly used `useMemo` to derive the filtered/sorted list from state and
  props on every render, with no `useEffect` mirroring it into a second
  piece of state — the most common way this kind of feature goes wrong.
- Copied before sorting (`[...filtered].sort(...)`) rather than mutating the
  array in place.
- Applied the 12-item cap to the filtered result, not the original list.
- Used `localeCompare` for name sorting rather than naive `<`/`>`.
- Built real accessibility on the first pass: native `<label htmlFor>`
  elements, `role="group"` with `aria-pressed` on every continent toggle,
  and an `aria-live="polite"` region for the result count.
- On the combined sort-control redesign, kept the diff scoped — it didn't
  touch `App.tsx` or the `sortKey`/`sortDirection` state shape, just
  remapped internally as asked, and cleanly removed the now-unused `cn`
  import along with the direction button it used to serve.

## What the AI got wrong on the first pass

- **Left a dead `data-continent` attribute** on `CountryCard`, a leftover
  from the old `scrollIntoView`-based continent behaviour that had already
  been replaced by real filtering. It was never cleaned up, so I flagged it
  and had it removed.
- **Used ambiguous prop naming on `CountryGrid`** — `countries`/`totalCount`
  no longer matched what the props actually represented once filtering was
  introduced, silently changing meaning partway through the feature. I had
  them renamed to `results`/`allCount` for clarity.
- **Used an unchecked type cast** (`as SortKey`) on the original sort-key
  `<select>` instead of validating the value at runtime, meaning a mismatch
  between the dropdown's options and the `SortKey` union would fail
  silently rather than safely. I had it replaced with a proper runtime type
  guard.
- **Duplicated a constant unnecessarily**, maintaining `SORT_KEYS` as a
  separate hand-written array instead of deriving it from `SORT_OPTIONS`,
  creating a second source of truth that could drift out of sync. I had it
  derived from the existing array instead.

## What I changed, rejected, or fixed after review — and why

1. **Rejected the AI's first attempt at rounding the dropdown's first/last
   rows to match the container.** It matched what I'd asked for, but once
   rendered it looked like a "curve within a curve" — worse than the plain
   version. I had it reverted to a single container-level `overflow-hidden`
   clip with no per-row rounding. This was the clearest case in this
   feature of a fix that was correct on paper but wrong in practice —
   something only catchable by looking at the rendered UI, not the diff.

2. **Ran the linter and static analysis against the finished feature and
   went through every warning manually.** In `App.tsx`, an
   `exhaustive-deps` warning flagged the `countries` fallback (`state.status
   === 'success' ? state.data : []`), since a new array literal on every
   render could make the dependent `useMemo` recompute unnecessarily — I
   wrapped it in its own `useMemo` so the reference stays stable across
   renders where the underlying state hasn't actually changed.

3. **Removed a redundant `focus:outline-none` in `CountryControls.tsx`**
   that duplicated the same CSS property already set by the base
   `outline-none`, which applies in every state including focus.

4. **Fixed two "referenced UMD global" warnings** in `CountryControls.tsx`.
   The custom dropdown's keyboard handlers used `React.KeyboardEvent<...>`
   without ever importing `React`, relying on an implicit ambient global —
   I imported `KeyboardEvent` as a named type from `react` instead and used
   it directly, removing the reliance on the global.

5. **Fixed a missing label/control association on the sort dropdown**,
   also caught during the accessibility review. The "Sort by" label wasn't
   actually associated with its control — it only reached the button via
   `aria-labelledby` — so I gave the button a real `id` and added a
   matching `htmlFor` on the label, consistent with the search input,
   while keeping `aria-labelledby` in place since the listbox's ARIA
   semantics still need it independently of the native label association.

## Would I trust this to ship as-is?

Mostly, but not blindly. The functional logic (filtering, sorting, the
12-cap, state derivation) was correct from the first prompt onward and
didn't need revisiting. What needed real human review fell into two
buckets: naming/type-safety issues the AI introduced and I caught by
reading the diff carefully (dead attributes, ambiguous prop names,
unchecked casts, duplicated constants), and visual/UX judgment calls it
couldn't make on its own. On top of that, a manual pass of reading
every linter and static-analysis warning caught issues that don't surface
as visible bugs at all.

**What I'd double-check before actually shipping it:**
- Verify the custom listbox's keyboard behaviour end-to-end (arrow keys,
  `Enter` to select, `Escape` to close, focus returning to the trigger on
  close) — a hand-rolled listbox has more ways to get keyboard interaction
  subtly wrong than a native `<select>`, which gets all of that for free
  from the browser.
- Run a full accessibility audit against the custom dropdown specifically,
  since swapping a native form control for a custom one is exactly the
  kind of change that can quietly regress accessibility even when the ARIA
  attributes look correct in the JSX.
- Confirm the dropdown's option list stays readable and doesn't clip
  awkwardly at small viewport widths, since the visual iteration happened
  by eye on desktop.
- Re-run static analysis after any further changes to these files, since
  some of the issues fixed here (the UMD global, the label association)
  don't show up as visible bugs in the browser — only as static-analysis
  findings.
