'use client';

import { HomeHabit } from '@/app/lib/types';
import { HabitListItem } from './HabitListItem';

/**
 * TodayHabitList — the "Today" section: a header with a "N left" badge and
 * the list of habit rows. Handles the loading / error / empty states.
 *
 * It owns no data; the page passes habits in and handles toggles.
 */

interface TodayHabitListProps {
  habits: HomeHabit[];
  loading: boolean;
  error: string | null;
  onToggle: (habitid: string) => void;
}

export function TodayHabitList({ habits, loading, error, onToggle }: TodayHabitListProps) {
  const remaining = habits.filter((h) => !h.doneToday).length;

  return (
    <section>
      <div className="mb-2.5 mt-4 flex items-center justify-between">
        <h2 className="text-base font-extrabold tracking-tight text-[var(--teal-900)]">Today</h2>
        {!loading && !error && habits.length > 0 && (
          <span className="rounded-full bg-[var(--teal-100)] px-2.5 py-0.5 text-xs font-semibold text-[var(--teal-700)]">
            {remaining} left
          </span>
        )}
      </div>

      {loading ? (
        <p className="py-6 text-center text-[var(--text-2)]">Loading habits…</p>
      ) : error ? (
        <p className="py-6 text-center text-[var(--danger)]">{error}</p>
      ) : habits.length === 0 ? (
        <div className="py-6 text-center">
          <p className="mb-1 text-[var(--text-2)]">No habits yet.</p>
          <p className="text-sm text-[var(--text-3)]">Create your first habit to get started.</p>
        </div>
      ) : (
        habits.map((habit) => <HabitListItem key={habit.habitid} habit={habit} onToggle={onToggle} />)
      )}
    </section>
  );
}
