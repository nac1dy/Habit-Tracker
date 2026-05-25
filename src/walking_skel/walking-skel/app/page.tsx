'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useHabits } from './lib/HabitContext';

// Header only renders on client to avoid SSR issues with Theme Context
const Header = dynamic(() => import('./components/Header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

// Home page - displays all habits from context (will fetch from Supabase backend)
export default function Home() {
  const { habits } = useHabits(); // TODO: Replace with Supabase query (getHabits)

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* titel */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Habits</h1>
          {/* link zu create seite */}
          <Link
            href="/habits/create"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            + Create Habit
          </Link>
        </div>

        {/* habit list oder empty state */}
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No habits yet.</p>
            <p className="text-gray-400 dark:text-gray-500">Click "Create Habit" to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* map alle habits und zeige sie als clickable cards */}
            {habits.map((habit) => (
              <Link
                key={habit.id}
                href={`/habits/${habit.id}`}
                className="block p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-md dark:hover:shadow-slate-800 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {habit.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {habit.category}
                    </p>
                  </div>
                  <span className="text-gray-400 dark:text-gray-500">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}