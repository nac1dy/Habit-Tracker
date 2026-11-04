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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

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
    setDeleting(true);
    try {
      const response = await fetch(`/api/habits/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete habit');
      router.push('/');
    } catch (err) {
      setModal({
        title: 'Delete failed',
        message: err instanceof Error ? err.message : 'Failed to delete',
      });
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  // Loading / Error states
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-(--teal-700) mb-4 inline-block">
            ← Back
          </Link>
          <p className="text-(--text-2)">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !habit) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-(--teal-700) mb-4 inline-block">
            ← Back
          </Link>
          <p className="text-(--text-2) text-lg">{error || 'Habit not found.'}</p>
        </div>
      </div>
    );
  }

  const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels: Record<DayOfWeek, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  };
  const hasSelectedDays = days.some((day) => habit.frequenz[day]);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-(--teal-700) hover:text-(--teal-900) mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-(--teal-900)">{habit.title}</h1>
        </div>

        <div
          className="bg-white p-8 border border-foreground mb-6"
          style={{ borderRadius: 'var(--radius-lg)' }}
        >
          <div className="mb-6">
            <p className="text-sm text-(--text-2) mb-1">Category</p>
            <p className="text-lg font-semibold text-foreground capitalize">{habit.category}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-(--text-2) mb-3">Selected Days</p>
            {hasSelectedDays ? (
              <div className="grid grid-cols-7 gap-4 text-center">
                {days.map((day) => {
                  const isSelected = habit.frequenz[day];
                  return (
                    <span
                      key={day}
                      className={`text-sm font-semibold ${
                        isSelected ? 'text-foreground' : 'text-(--text-3)'
                      }`}
                    >
                      {dayLabels[day]}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-(--text-3)">No days selected</p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-(--text-2) mb-1">Created</p>
            <p className="text-foreground">{new Date(habit.created_at).toLocaleDateString()}</p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: 'linear-gradient(135deg, var(--danger), #e56565)' }}
          >
            Delete Habit
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div
            className="relative w-full max-w-md bg-white border border-foreground p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
          >
            <h2 id="confirm-title" className="text-lg font-bold text-foreground">
              Delete habit?
            </h2>
            <p id="confirm-message" className="mt-2 text-(--text-2)">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-semibold border border-foreground text-foreground bg-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, var(--danger), #e56565)',
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
            aria-labelledby="detail-modal-title"
            aria-describedby="detail-modal-message"
          >
            <h2 id="detail-modal-title" className="text-lg font-bold text-foreground">
              {modal.title}
            </h2>
            <p id="detail-modal-message" className="mt-2 text-(--text-2)">
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
  );
}
