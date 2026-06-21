import { BottomNav } from '../components/BottomNav';
import { SettingsMenu } from '../components/SettingsMenu';

/**
 * Habits screen — PLACEHOLDER.
 *
 * FEATURE ENTRY POINT: the full habits list lives here.
 * Build order suggestion:
 *   1. Fetch habits from GET /api/habits → render list rows
 *   2. Category filter chips (scrollable, multi-select) at the top
 *   3. "+ New" button → opens /habits/create sheet (intercepting route already wired in layout.tsx)
 *   4. Swipe-left on a row → pause / delete (PATCH / DELETE /api/habits/:id)
 *   5. Tap a row → habit detail / edit page (/habits/:id)
 */
export default function HabitsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="sticky top-0 z-30 w-full bg-[var(--app-bg)]" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto w-full max-w-md flex items-center justify-between px-4 py-2">
          <h1 className="text-[26px] font-extrabold text-[var(--teal-900)]">My Habits</h1>
          <SettingsMenu />
        </div>
      </div>
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">

        {/* ── FEATURE ENTRY POINT ────────────────────────────────────────────
            Replace this placeholder with the real habit list.
            See the JSDoc above for the recommended build order.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: 'rgba(53,184,170,.1)' }}>
            ✓
          </div>
          <p className="text-lg font-extrabold text-[var(--teal-900)]">Habits — coming soon</p>
          <p className="mt-1 text-sm text-[var(--text-2)]">Habit list, filters and &quot;+ New&quot; go here.</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
