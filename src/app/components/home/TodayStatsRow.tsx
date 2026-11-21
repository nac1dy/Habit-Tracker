/**
 * TodayStatsRow — three summary cards under the greeting. All placeholders.
 */
export function TodayStatsRow() {
  return (
    <div className="my-3.5 flex gap-2">

      {/*
        FEATURE ENTRY POINT: Day streak
        Show: 🔥 {dayStreak} — label "Day streak"
        API: GET /api/habits/:id/streak  or  streak field on habit object
      */}
      <div
        className="flex-1 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-3.5 backdrop-blur-[16px]"
        style={{ boxShadow: 'var(--shadow)', minHeight: '64px' }}
      />

      {/*
        FEATURE ENTRY POINT: Today done
        Show: {doneToday}/{totalToday} — label "Today done"
        Wire to: local toggle state (doneToday counter) + later POST /api/check-ins
      */}
      <div
        className="flex-1 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-3.5 backdrop-blur-[16px]"
        style={{ boxShadow: 'var(--shadow)', minHeight: '64px' }}
      />

      {/*
        FEATURE ENTRY POINT: This week
        Show: {weekPercent}% — label "This week"
        API: GET /api/stats?period=week  →  { weekPercent: number }
      */}
      <div
        className="flex-1 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-3.5 backdrop-blur-[16px]"
        style={{ boxShadow: 'var(--shadow)', minHeight: '64px' }}
      />

    </div>
  );
}
