'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DayOfWeek, Habit } from '@/app/lib/types';
import { BottomNav } from '@/app/components/BottomNav';

// Habit-Page mit Details (Kathegorie + Wochentage + Änderungen + Delete)
interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}
//Parameter wird angehangen, Abhängig davon, welche Änderung vorgenommen wird
const EDIT_ITEMS = [
  { label: 'Kategorie ändern', field: 'category' },
  { label: 'Namen ändern', field: 'name' },
  { label: 'Häufigkeit ändern', field: 'frequency' },
  { label: 'Tracking-Methode ändern', field: 'tracking' },
];
export default function HabitDetail({ params }: DetailPageProps) {
  const router = useRouter();
  const { id } = use(params); // Unwrap the Promise

  const [habit, setHabit] = useState<Habit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); //Menue für das Bearbeiten von Habits

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
 if (loading || error || !habit) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">
          <Link href="/" className="mb-4 inline-block text-[var(--teal-700)]">
            ← Back
          </Link>
          {loading ? (
            <p className="py-6 text-center text-[var(--text-2)]">Loading…</p>
          ) : (
            <p className="py-6 text-center text-[var(--danger)]">{error || 'Habit not found.'}</p>
          )}
        </main>
        <BottomNav />
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

  const cardClass =
    'rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[12px]';

  return (
    <div className="flex min-h-full flex-1 flex-col">
      {/* Header: Habit-Name links, Hamburger-Menü rechts */}
      <div
        className="sticky top-0 z-30 w-full bg-[var(--app-bg)]"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" aria-label="Back" className="text-xl text-[var(--teal-700)]">
              ←
            </Link>
            <h1 className="truncate text-[20px] font-extrabold tracking-tight text-[var(--teal-900)]">
              {habit.title}
            </h1>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Edit menu"
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-[var(--text-2)] transition hover:bg-[var(--card)] active:scale-90"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {menuOpen && (
              <>
                {/* Unsichtbare Fläche: Klick daneben schließt das Menü */}
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-40 cursor-default"
                />
                <div
                  className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-1.5 backdrop-blur-[22px]"
                  style={{ boxShadow: 'var(--shadow)' }}
                  role="menu"
                >
                  {EDIT_ITEMS.map((item) => (
                    <Link
                      key={item.field}
                      href={`/habits/${id}/edit?field=${item.field}`}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2.5 text-sm text-[var(--text)] transition hover:bg-[var(--card)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">
        <div className={`${cardClass} p-5`} style={{ boxShadow: 'var(--shadow)' }}>
          <div className="mb-5">
            <p className="mb-1 text-xs text-[var(--text-2)]">Category</p>
            <p className="text-base font-semibold capitalize text-[var(--text)]">{habit.category}</p>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-xs text-[var(--text-2)]">Selected Days</p>
            {hasSelectedDays ? (
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {days.map((day) => {
                  const isSelected = habit.frequenz[day];
                  return (
                    <span
                      key={day}
                      className={`rounded-lg py-1.5 text-xs font-semibold ${
                        isSelected
                          ? 'bg-[#35b8aa] text-white'
                          : 'text-[var(--text-3)]'
                      }`}
                    >
                      {dayLabels[day]}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-[var(--text-3)]">No days selected</p>
            )}
          </div>

          <div className="mb-6">
            <p className="mb-1 text-xs text-[var(--text-2)]">Created</p>
            <p className="text-[var(--text)]">{new Date(habit.created_at).toLocaleDateString()}</p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="w-full rounded-lg px-4 py-2.5 font-semibold text-white transition active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #35b8aa, #1e8f84)' }}
          >
            Delete Habit
          </button>
        </div>
      </main>

      <BottomNav />

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setConfirmOpen(false)}
          />
          <div
            className="relative w-full max-w-md border border-[var(--border-mid)] bg-[var(--app-bg)] p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
          >
            <h2 id="confirm-title" className="text-lg font-bold text-[var(--text)]">
              Delete habit?
            </h2>
            <p id="confirm-message" className="mt-2 text-[var(--text-2)]">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full border border-[var(--border-mid)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white transition active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #35b8aa, #1e8f84)',
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
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />
          <div
            className="relative w-full max-w-md border border-[var(--border-mid)] bg-[var(--app-bg)] p-6"
            style={{ borderRadius: 'var(--radius-lg)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
            aria-describedby="detail-modal-message"
          >
            <h2 id="detail-modal-title" className="text-lg font-bold text-[var(--text)]">
              {modal.title}
            </h2>
            <p id="detail-modal-message" className="mt-2 text-[var(--text-2)]">
              {modal.message}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-full bg-[var(--teal-500)] px-4 py-2 text-sm font-semibold text-white transition active:scale-95"
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
