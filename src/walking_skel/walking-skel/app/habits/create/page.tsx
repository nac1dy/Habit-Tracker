'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HabitCategory, DayOfWeek } from '@/app/lib/types';

// Create Habit form - saves to Supabase backend
export default function CreateHabit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<HabitCategory>('sport');
  const [frequenz, setFrequenz] = useState<Record<DayOfWeek, boolean>>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day: DayOfWeek) => {
    setFrequenz((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !Object.values(frequenz).some((day) => day)) {
      setModal({
        title: 'Missing info',
        message: 'Please enter a habit name and select at least one day.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          frequenz,
        }),
      });

      if (!response.ok) throw new Error('Failed to create habit');
      router.push('/');
    } catch (error) {
      setModal({
        title: 'Create failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-(--teal-700) hover:text-(--teal-900) mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-(--teal-900)">Create New Habit</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 border border-foreground"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text-2) mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Morning jog"
              className="w-full px-4 py-2 border border-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-(--focus) bg-white text-foreground"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text-2) mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full px-4 py-2 border border-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-(--focus) bg-white text-foreground"
            >
              <option value="sport">Sport</option>
              <option value="health">Health</option>
              <option value="mental">Mental</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-(--text-2) mb-3">
              Select Days
            </label>
            <div className="grid grid-cols-7 gap-4 text-center">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-2 px-1 rounded-full font-semibold transition text-sm capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus) hover:-translate-y-0.5 active:translate-y-0 ${
                    frequenz[day]
                      ? 'text-(--teal-700) underline decoration-2 underline-offset-4'
                      : 'text-foreground hover:text-(--teal-700)'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-2 px-6 rounded-lg transition hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: 'linear-gradient(135deg, var(--teal-500), var(--teal-700))',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Creating...' : 'Create Habit'}
          </button>
        </form>

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setModal(null)}
            />
            <div
              className="relative w-full max-w-md bg-white border border-foreground p-6"
              style={{ borderRadius: 'var(--radius-lg)' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-modal-title"
              aria-describedby="create-modal-message"
            >
              <h2 id="create-modal-title" className="text-lg font-bold text-foreground">
                {modal.title}
              </h2>
              <p id="create-modal-message" className="mt-2 text-(--text-2)">
                {modal.message}
              </p>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-(--teal-500) text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
