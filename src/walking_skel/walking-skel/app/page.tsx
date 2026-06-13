'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// API response shape from /api/habits
type HabitApi = {
  habitid: string;
  title: string;
  category: string;
};

// Header only renders on client to avoid SSR issues with Theme Context
const Header = dynamic(() => import('./components/Header').then(mod => ({ default: mod.Header })), {
  ssr: false,
});

export default function Home() {
  // Functional habit list uses the backend API
  const [habits, setHabits] = useState<HabitApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load habits once on page load
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/habits');
        if (!response.ok) throw new Error('Failed to fetch habits');
        const data = await response.json();
        setHabits(data as HabitApi[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // Dummy values for the preview-style overview cards
  const completedToday = 2;
  const streakDays = 7;
  const totalHabits = habits.length;
  const completionPct = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Tab system (dummy pages) */}
          <nav className="grid grid-cols-4 gap-2 mb-6">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-(--teal-500) text-white border-transparent text-center"
            >
              Home
            </Link>
            <Link
              href="/habits"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-(--card) text-(--text-2) border-(--border) text-center"
            >
              Habits
            </Link>
            <Link
              href="/stats"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-(--card) text-(--text-2) border-(--border) text-center"
            >
              Stats
            </Link>
            <Link
              href="/settings"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-(--card) text-(--text-2) border-(--border) text-center"
            >
              Settings
            </Link>
          </nav>

          {/* Home title block in preview style */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-extrabold tracking-[0.18em] text-(--teal-700) uppercase">
                Habit Tracker
              </p>
              <h1 className="text-3xl font-bold text-(--teal-900) mt-1">Today</h1>
              <p className="text-(--text-2)">Your daily overview and active habits.</p>
            </div>

            {/* Functional CTA (create habit) */}
            <Link
              href="/habits/create"
              className="rounded-full px-4 py-2 text-sm font-semibold bg-(--teal-500) text-white hover:bg-(--teal-700) transition"
            >
              + Create Habit
            </Link>
          </div>

          {/* Today overview cards (dummy values) */}
          <div className="grid gap-3 md:grid-cols-3 mb-6">
            <div
              className="rounded-2xl border border-(--glass-border) bg-(--glass) backdrop-blur-[22px] p-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <p className="text-xs uppercase font-semibold text-(--text-3)">Completed today</p>
              <p className="text-2xl font-extrabold text-(--teal-900) mt-2">
                {completedToday}/{totalHabits}
              </p>
              <p className="text-sm text-(--text-2)">{completionPct}% done</p>
            </div>

            <div
              className="rounded-2xl border border-(--glass-border) bg-(--glass) backdrop-blur-[22px] p-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <p className="text-xs uppercase font-semibold text-(--text-3)">Current streak</p>
              <p className="text-2xl font-extrabold text-(--teal-900) mt-2">{streakDays} days</p>
              <p className="text-sm text-(--text-2)">Keep the momentum</p>
            </div>

            <div
              className="rounded-2xl border border-(--glass-border) bg-(--glass) backdrop-blur-[22px] p-4"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <p className="text-xs uppercase font-semibold text-(--text-3)">Active habits</p>
              <p className="text-2xl font-extrabold text-(--teal-900) mt-2">{totalHabits}</p>
              <p className="text-sm text-(--text-2)">Across your schedule</p>
            </div>
          </div>

          {/* Preview-style momentum teaser (dummy block) */}
          <div
            className="rounded-3xl border border-[rgba(53,184,170,0.25)] p-5 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(53,184,170,0.12), rgba(27,111,104,0.07))',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase font-semibold text-(--teal-700)">Momentum</p>
                <p className="text-lg font-bold text-foreground mt-1">Stable today</p>
              </div>
              <div className="text-2xl font-extrabold text-foreground">72</div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: '72%', background: 'linear-gradient(90deg, var(--teal-500), var(--teal-700))' }}
              />
            </div>
          </div>

          {/* Habit list (functional, but styled like preview cards) */}
          <div
            className="rounded-3xl border border-(--glass-border) bg-(--glass) backdrop-blur-[22px] p-5"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Habits</h2>
              <span className="text-sm text-(--text-3)">Tap to view details</span>
            </div>

            {/* Loading and error states */}
            {loading ? (
              <div className="text-center py-6">
                <p className="text-(--text-2)">Loading habits...</p>
              </div>
            ) : error ? (
              <div className="text-center py-6">
                <p className="text-(--danger)">{error}</p>
              </div>
            ) : habits.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-(--text-2) text-lg mb-2">No habits yet.</p>
                <p className="text-(--text-3)">Create your first habit to get started.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {habits.map((habit) => (
                  <Link
                    key={habit.habitid}
                    href={`/habits/${habit.habitid}`}
                    className="block rounded-2xl border border-(--glass-border) bg-(--glass) backdrop-blur-md p-4 transition hover:-translate-y-0.5"
                    style={{ boxShadow: '0 2px 12px rgba(30,90,84,0.06)' }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{habit.title}</h3>
                        <p className="text-sm text-(--text-2) capitalize">{habit.category}</p>
                      </div>
                      <span className="text-(--text-3)">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
