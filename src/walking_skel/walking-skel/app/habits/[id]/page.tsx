'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DayOfWeek } from '@/app/lib/types';
import { useHabits } from '@/app/lib/HabitContext';

// Habit detail page - shows individual habit and delete option
interface DetailPageProps {
  params: {
    id: string;
  };
}

export default function HabitDetail({ params }: DetailPageProps) {
  const router = useRouter();
  const { id } = params;
  const { getHabitById, deleteHabit } = useHabits(); // ← nutze context

  // Fetch habit by ID from context (will be Supabase query)
  const habit = getHabitById(id);

  // Fallback if habit not found
  if (!habit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block">
            ← Back
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Habit not found.</p>
        </div>
      </div>
    );
  }

  // Delete handler - removes from context (will call Supabase delete)
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(id); // TODO: Replace with Supabase delete operation
      router.push('/');
    }
  };

  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const selectedDays = days.filter((day) => habit.daysOfWeek[day]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{habit.name}</h1>
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
            <p className="text-gray-700 dark:text-gray-300">{habit.createdAt.toLocaleDateString()}</p>
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