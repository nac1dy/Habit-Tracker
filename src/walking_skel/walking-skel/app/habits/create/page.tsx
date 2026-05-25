'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SubmitEvent } from 'react';
import { Habit, HabitCategory, DayOfWeek } from '@/app/lib/types';
import { useHabits } from '@/app/lib/HabitContext';

// Create Habit form - saves to context (will connect to Supabase backend)
export default function CreateHabit() {
  const router = useRouter();
  const { addHabit } = useHabits(); // ← nutze den context

  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('sport');
  const [daysOfWeek, setDaysOfWeek] = useState<Record<DayOfWeek, boolean>>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day: DayOfWeek) => {
    setDaysOfWeek((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!name.trim() || !Object.values(daysOfWeek).some((day) => day)) {
      alert('Please enter a habit name and select at least one day');
      return;
    }

    // Create habit object (temporary ID, will be replaced by Supabase UUID)
    const newHabit: Habit = {
      id: Date.now().toString(), // TODO: Will be replaced with Supabase UUID
      name,
      category,
      daysOfWeek,
      createdAt: new Date(), // TODO: Will be server timestamp from Supabase
    };

    addHabit(newHabit); // TODO: Replace with Supabase insert operation
    router.push('/');
  };

  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Habit</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-slate-700">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning jog"
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <option value="sport">Sport</option>
              <option value="health">Health</option>
              <option value="mental">Mental</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Days
            </label>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-2 px-1 rounded-lg font-semibold transition text-sm capitalize ${
                    daysOfWeek[day]
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
}