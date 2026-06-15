'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HomeHabit, HabitCategory } from './lib/types';
import { MOCK_HABITS, MOCK_DEFAULT_STREAK } from './lib/mockHome';
import { HomeHeader } from './components/home/HomeHeader';
import { TodayStatsRow } from './components/home/TodayStatsRow';
import { MomentumCard } from './components/home/MomentumCard';
import { TodayHabitList } from './components/home/TodayHabitList';
import { BottomNav } from './components/BottomNav';
import { HabitForm } from './habits/create/HabitForm';

/**
 * Mainpage / Home.
 *
 * This file mainly COMPOSES and LAYOUTS the home screen. The actual UI blocks
 * live in app/components/home/*. Data responsibilities kept here:
 *  - load real habits from /api/habits (falls back to mock if unavailable)
 *  - track which habits are checked today (local only for now)
 *
 * Mock vs. real: the habit list is real (Supabase via /api/habits). Streaks,
 * stats and momentum are mock — see app/lib/mockHome.ts for the integration
 * points where real backend values plug in later.
 */

// Shape returned by /api/habits (raw DB row). Mapped into HomeHabit for the UI.
type HabitApiRow = {
  habitid: string;
  title: string;
  category: HabitCategory;
};

export default function Home() {
  const [habits, setHabits] = useState<HomeHabit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Load habits once on mount.
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch('/api/habits');
        if (!res.ok) throw new Error('Failed to fetch habits');
        const rows = (await res.json()) as HabitApiRow[];
/*
        const checkedRes = await fetch('/api/check_habit');

        let completedToday = new Set<string>();

        if (checkedRes.ok) {
          const entries = await checkedRes.json();

          console.log('Entries:', entries);

          completedToday = new Set(
            entries.map((e: any) => e.habitid)
          );
        }
*/
        // Map DB rows to the home view model. streakDays/doneToday are not in
        // the DB yet, so they start as placeholders.
        // API INTEGRATION POINT: real streak/check-in status go here.
        const mapped: HomeHabit[] = rows.map((row) => ({
          habitid: row.habitid,
          title: row.title,
          category: row.category,
          streakDays: MOCK_DEFAULT_STREAK,
          doneToday: false, 
          //doneToday: completedToday.has(row.habitid),
        }));

        // If the backend has no habits yet, show the mock list so the page
        // still demonstrates the layout.
        setHabits(mapped.length > 0 ? mapped : MOCK_HABITS);
      } catch {
        // No backend / no .env.local: fall back to mock data so the demo works.
        setHabits(MOCK_HABITS);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // Toggle a habit's "done today" state.
  // FEATURE ENTRY POINT: currently local-only; later this POSTs a check-in.
  const toggleHabit = (habitid: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.habitid === habitid ? { ...h, doneToday: !h.doneToday } : h)),
    );
  };

  /*
  const toggleHabit = async (habitid: string) => {

    const habitToToggle = habits.find((h) => h.habitid === habitid);
    //if to be checked habit is not found, meaning not defined, return
    if (!habitToToggle) return;
    

    const newDoneState = !habitToToggle.doneToday;

    setHabits((prev) =>
      prev.map((h) => (h.habitid === habitid ? { ...h, doneToday: newDoneState } : h)),
    );


    const today = new Date().toISOString().split('T')[0]; 
    try {
      const res = await fetch('/api/check_habit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          habitid: habitid, 
          date: today, 
          done: newDoneState 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Backend Error:', errorData);
        throw new Error('Failed to update habit status');
      }
    } catch (error) {
      console.error(error);

      setHabits((prev) =>
        prev.map((h) => (h.habitid === habitid ? { ...h, doneToday: !newDoneState } : h)),
      );
    }
};
*/

  return (
    // Full-width column; the content is constrained to a phone width and
    // centered, while the bottom nav background stretches edge to edge.
    <div className="flex min-h-full flex-1 flex-col">
      {/* Sticky header — stays visible while content scrolls */}
      <div className="sticky top-0 z-30 w-full bg-[var(--app-bg)]" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto w-full max-w-md px-4 py-2">
          <HomeHeader />
        </div>
      </div>

      {/* Scrollable content (phone-width, centered) */}
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-4 pt-4">

        <TodayStatsRow />

        <MomentumCard />

        <TodayHabitList
          habits={habits}
          loading={loading}
          error={error}
          onToggle={toggleHabit}
        />

        {/* Create habit CTA — opens bottom sheet overlay (home page stays visible) */}
        <button
          onClick={() => setShowCreate(true)}
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-[var(--radius)] px-4 py-3 text-sm font-bold text-white transition active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #35b8aa, #1b6f68)' }}
        >
          + New Habit
        </button>

        {/* Stats teaser -> existing /stats page */}
        <Link
          href="/stats"
          className="mt-3.5 block rounded-[var(--radius-lg)] border border-[rgba(53,184,170,0.25)] p-4 text-center text-sm font-semibold text-[var(--teal-700)] transition active:scale-[0.985]"
          style={{ background: 'linear-gradient(135deg, rgba(53,184,170,0.12), rgba(27,111,104,0.07))' }}
        >
          View full statistics →
        </Link>
      </main>

      {/* Create habit bottom sheet — same pattern as habits/@modal/(.)create */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
            onClick={() => setShowCreate(false)}
            aria-label="Close"
          />
          <div
            className="relative z-10 mx-auto w-full max-w-md overflow-y-auto rounded-t-[28px] px-5 pb-10"
            style={{ background: 'var(--app-bg)', maxHeight: '88svh', animation: 'sheet-up 0.34s cubic-bezier(0.32,0.72,0,1) both' }}
          >
            <HabitForm onClose={() => setShowCreate(false)} />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
