# Mainpage — Feature Entry Points

Short guide for the team. The Mainpage (home screen) is built as a **composition
layer**: `app/page.tsx` mostly lays things out, the real UI lives in small
components. Mock data is kept separate so the page works before the backend is
finished.

## Where things are

| Thing | File |
|-------|------|
| Mainpage (composition + data loading) | `app/page.tsx` |
| Home UI blocks | `app/components/home/` |
| Bottom navigation (shared) | `app/components/BottomNav.tsx` |
| Mock data (stats, momentum, fallback habits) | `app/lib/mockHome.ts` |
| Category → color mapping | `app/lib/categoryColors.ts` |
| View-model types (`HomeHabit`, `HomeStats`, `MomentumData`) | `app/lib/types.ts` |
| Design tokens (colors, radius, shadow) | `app/globals.css` (`:root`) |

## Component responsibilities

- `HomeHeader` — greeting + date + settings entry point (presentation only)
- `TodayStatsRow` — the 3 summary cards
- `MomentumCard` — progress bar + momentum score
- `TodayHabitList` — "Today" section, loading/error/empty states
- `HabitListItem` — one habit row; delegates actions via props
- `BottomNav` — Home / Habits / Stats / Pet

## Real vs. mock data

- **Real**: the habit list comes from `GET /api/habits` (Supabase).
  Needs `.env.local` with `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Without it the API returns 500 and the
  page falls back to `MOCK_HABITS` so the demo still renders.
- **Mock**: streaks, "done today" status, weekly %, and momentum are mock —
  the DB doesn't store them yet. See the `API INTEGRATION POINT` comments in
  `app/lib/mockHome.ts` and `app/page.tsx`.

## How to extend

- **Add a new UI block to the home page**: create a component in
  `app/components/home/`, then drop it into `app/page.tsx`. Keep logic out of the
  block — pass data and callbacks in via props.
- **Wire up "check habit done"**: `toggleHabit` in `app/page.tsx` is currently
  local-only. Replace it with a POST to a check-in endpoint.
- **Wire up streaks / stats / momentum**: replace the mock imports in
  `app/page.tsx` with real fetches once the endpoints exist.
- **Build the Pet feature**: `app/pet/page.tsx` is a placeholder behind the Pet
  tab.
- **Settings menu**: `HomeHeader` links to `/settings`; the wireframe envisions a
  dropdown (Dark Mode, Pause Habits, Log out, …) — that can replace the link.

## Dark mode

- The settings menu (top-right on the home page) has a **Dark Mode** toggle wired
  to `app/lib/ThemeContext.tsx` (it adds `.dark` to `<html>`).
- Dark theme is defined in `app/globals.css` under `.dark { … }` (token overrides
  mirroring the wireframe). Since the UI is token-based, the whole app re-themes.
- Filled accents that carry white content (the "+ New Habit" button, the habit
  check, the momentum bar) use literal brand teal instead of `--teal-500`, so they
  stay legible in dark mode (where `--teal-500` becomes near-white).

## Known pre-existing issues (not part of the Mainpage work)

- `app/lib/ThemeContext.tsx` has 2 ESLint errors (it still works at runtime).
- `next build` fails while collecting page data for `/api/habits` when no
  `.env.local` is present (`supabase.ts` requires the env at import). `npm run dev`
  works regardless thanks to the mock fallback.
