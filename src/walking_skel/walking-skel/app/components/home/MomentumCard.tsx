/**
 * MomentumCard — PLACEHOLDER.
 *
 * FEATURE ENTRY POINT: Today's Habits progress block + Momentum score.
 * What goes here (wireframe: docs/preview.html #sc-home):
 *   - Header: "TODAY'S HABITS" label + {doneToday}/{totalToday} counter
 *   - Motivational subtitle (streak-based message)
 *   - Progress bar: gradient orange → teal, width = today's completion %
 *   - Footer row: "Momentum: {score}/100"  |  "Week: {weekPercent}%"
 *
 * Formula (wireframe): Completion today + Active streaks + Weekly consistency + Variety bonus → 0–100
 * API: GET /api/momentum  or  included in GET /api/stats response
 * Props needed: doneToday, totalToday, momentumScore, weekPercent
 */
export function MomentumCard() {
  return (
    <div
      className="my-1 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-4"
      style={{ boxShadow: 'var(--shadow)', minHeight: '80px' }}
    />
  );
}
