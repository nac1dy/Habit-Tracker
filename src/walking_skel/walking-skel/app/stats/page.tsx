import { BottomNav } from '../components/BottomNav';
import { SettingsMenu } from '../components/SettingsMenu';

/**
 * Stats screen — PLACEHOLDER.
 *
 * FEATURE ENTRY POINT: all statistics and charts live here.
 * Build order suggestion:
 *   1. Period toggle (Week / Month / All time) → state + re-fetch on change
 *      API: GET /api/stats?period=week|month|all
 *   2. Momentum Score card → formula: completion + streaks + consistency + variety → 0–100
 *      API: included in GET /api/stats response or GET /api/momentum
 *   3. Calendar heatmap → array of { date, completedCount, totalCount }
 *      API: GET /api/stats/calendar?period=...
 *      Library suggestion: react-calendar-heatmap or custom SVG grid
 *   4. Category donut chart → group check-ins by category
 *      Library suggestion: recharts PieChart or custom SVG arc
 *   5. Per-habit breakdown → { habitid, title, category, streak, completionRate }
 *      API: GET /api/stats/per-habit?period=...
 */
export default function StatsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="sticky top-0 z-30 w-full bg-[var(--app-bg)]" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto w-full max-w-md flex items-center justify-between px-4 py-2">
          <h1 className="text-[26px] font-extrabold text-[var(--teal-900)] tracking-tight">Statistics</h1>
          <SettingsMenu />
        </div>
      </div>
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">

        {/* ── FEATURE ENTRY POINT ────────────────────────────────────────────
            Replace this placeholder with the real stats sections.
            See the JSDoc above for the recommended build order.
        ─────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
            style={{ background: 'rgba(53,184,170,.1)' }}>
            📊
          </div>
          <p className="text-lg font-extrabold text-[var(--teal-900)]">Stats — coming soon</p>
          <p className="mt-1 text-sm text-[var(--text-2)]">
            Period toggle, momentum score, heatmap, donut chart and per-habit rows go here.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
