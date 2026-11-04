'use client';

import Link from 'next/link';
import { HomeHabit } from '@/app/lib/types';
import { CATEGORY_COLOR } from '@/app/lib/categoryColors';

/**
 * HabitListItem — a single row in the "Today" list.
 *
 * Renders the habit and delegates actions outward (it holds no logic itself).
 *
 * Feature entry points:
 *  - onToggle:        check / uncheck today  -> later POSTs a check-in to the backend
 *  - opening details: links to /habits/[id]  -> existing habit detail page
 */

interface HabitListItemProps {
  habit: HomeHabit;
  onToggle: (habitid: string) => void;
}

export function HabitListItem({ habit, onToggle }: HabitListItemProps) {
  const { habitid, title, category, streakDays, doneToday } = habit;

  return (
    <div
      className={`mb-2 flex items-center gap-3 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-3.5 backdrop-blur-[12px] transition ${
        doneToday ? 'opacity-50' : ''
      }`}
      style={{ boxShadow: '0 2px 12px rgba(30,90,84,0.06)' }}
    >
      {/* Category color dot */}
      <span
        className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
        style={{ background: CATEGORY_COLOR[category] }}
      />

      {/* Info area opens the habit details */}
      <Link href={`/habits/${habitid}`} className="min-w-0 flex-1">
        <div
          className={`truncate text-[15px] font-medium text-[var(--text)] ${
            doneToday ? 'text-[var(--text-3)] line-through' : ''
          }`}
        >
          {title}
        </div>
        <div className="mt-0.5 text-xs capitalize text-[var(--text-2)]">
          {streakDays > 0 ? `${streakDays} days · ` : ''}
          {category}
        </div>
      </Link>

      {/* Check circle: marks the habit done for today */}
      <button
        type="button"
        onClick={() => onToggle(habitid)}
        aria-label={doneToday ? `Mark ${title} not done` : `Mark ${title} done`}
        aria-pressed={doneToday}
        className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-lg border-2 text-sm transition active:scale-90"
        style={{
          // Literal brand teal so the white check stays visible in dark mode.
          borderColor: doneToday ? '#35b8aa' : 'var(--border-mid)',
          background: doneToday ? '#35b8aa' : 'transparent',
          color: '#fff',
        }}
      >
        {doneToday ? '✓' : ''}
      </button>
    </div>
  );
}
