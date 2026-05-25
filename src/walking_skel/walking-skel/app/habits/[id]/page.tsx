'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DayOfWeek, Habit } from '@/app/lib/types';

// Habit detail page - shows individual habit and delete option
interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function HabitDetail({ params }: DetailPageProps) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the Promise
  
  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const response = await fetch(`/api/habits/${id}`);
        if (!response.ok) throw new Error('Failed to fetch habit');
        const data = await response.json();
        setHabit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  // Delete handler
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this habit?')) {
      try {
        const response = await fetch(`/api/habits/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete habit');
        router.push('/');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete');
      }
    }
  };

  // Loading / Error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-blue-600 dark:text-blue-400 mb-4 inline-block">
            ← Back
          </Link>
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !habit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-blue-600 dark:text-blue-400 mb-4 inline-block">
            ← Back
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{error || 'Habit not found.'}</p>
        </div>
      </div>
    );
  }

  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const selectedDays = days.filter((day) => habit.frequenz[day]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{habit.title}</h1>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-700 mb-6">
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{habit.category}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Selected Days</p>
            <div className="flex flex-wrap gap-2">
              {selectedDays.length > 0 ? (
                selectedDays.map((day) => (
                  <span
                    key={day}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {day}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No days selected</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
            <p className="text-gray-700 dark:text-gray-300">{new Date(habit.created_at).toLocaleDateString()}</p>
          </div>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Delete Habit
          </button>
        </div>
      </div>
    </div>
  );
}