'use client';

import { Suspense, use, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DayOfWeek, Habit } from '@/app/lib/types';
import { BottomNav } from '@/app/components/BottomNav';

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu',
  friday: 'Fri', saturday: 'Sat', sunday: 'Sun',
};

// placeholder, Kathegorien müssten noch durch die echten Werte ersetzt werden
const CATEGORIES = ['health', 'fitness', 'learning', 'mindfulness'];
const TRACKING_METHODS = ['checkbox', 'counter', 'timer'];

// Überschrift je nach gewählter Änderung
const TITLES: Record<string, string> = {
  name: 'Change name',
  category: 'Change category',
  frequency: 'Change frequency',
  tracking: 'Change tracking method',
};

const inputClass =
  'w-full rounded-lg border border-[var(--border-mid)] bg-transparent px-3 py-2 text-[var(--text)] outline-none focus:border-[#35b8aa]';

function EditHabitForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const searchParams = useSearchParams();
  const field = searchParams.get('field'); // 'name' | 'category' | 'frequency' | 'tracking' | null
  const show = (f: string) => !field || field === f;

  const [habit, setHabit] = useState<Habit | null>(null);
  const [tracking, setTracking] = useState(TRACKING_METHODS[0]); // nur UI-State

  useEffect(() => {
    fetch(`/api/habits/${id}`)
      .then((r) => r.json())
      .then(setHabit);
  }, [id]);

  //Speichern funktioniert noch nicht, reine UI 
  const save = () => {
    console.log('Würde speichern:', { ...habit, tracking });
    router.push(`/habits/${id}`);
  };

  if (!habit) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">
          <p className="py-6 text-center text-[var(--text-2)]">Loading…</p>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      {/* Header */}
      <div
        className="sticky top-0 z-30 w-full bg-[var(--app-bg)]"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-between px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            <Link href={`/habits/${id}`} aria-label="Cancel" className="text-xl text-[var(--teal-700)]">
              ←
            </Link>
            <h1 className="truncate text-[20px] font-extrabold tracking-tight text-[var(--teal-900)]">
              {field && TITLES[field] ? TITLES[field] : 'Edit habit'}
            </h1>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">
        <div
          className="space-y-5 rounded-[var(--radius)] border border-[var(--glass-border)] bg-[var(--glass)] p-5 backdrop-blur-[12px]"
          style={{ boxShadow: 'var(--shadow)' }}
        >
          {/* Name */}
          {show('name') && (
            <div>
              <label className="mb-1 block text-xs text-[var(--text-2)]">Name</label>
              <input
                value={habit.title}
                onChange={(e) => setHabit({ ...habit, title: e.target.value })}
                className={inputClass}
              />
            </div>
          )}

          {/* Kategorie */}
          {show('category') && (
            <div>
              <label className="mb-1 block text-xs text-[var(--text-2)]">Category</label>
              <select
                value={habit.category}
                onChange={(e) => setHabit({ ...habit, category: e.target.value as Habit['category'] })}
                className={`${inputClass} bg-[var(--app-bg)] capitalize`}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Häufigkeit */}
          {show('frequency') && (
            <div>
              <label className="mb-2 block text-xs text-[var(--text-2)]">Frequency</label>
              <div className="grid grid-cols-7 gap-1.5">
                {DAYS.map((day) => {
                  const selected = habit.frequenz[day];
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() =>
                        setHabit({ ...habit, frequenz: { ...habit.frequenz, [day]: !selected } })
                      }
                      className={`rounded-lg border py-1.5 text-xs font-semibold transition active:scale-95 ${
                        selected
                          ? 'border-[#35b8aa] bg-[#35b8aa] text-white'
                          : 'border-[var(--border-mid)] text-[var(--text-3)]'
                      }`}
                    >
                      {DAY_LABELS[day]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tracking-Methode */}
          {show('tracking') && (
            <div>
              <label className="mb-1 block text-xs text-[var(--text-2)]">Tracking method</label>
              <select
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                className={`${inputClass} bg-[var(--app-bg)] capitalize`}
              >
                {TRACKING_METHODS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg px-4 py-2.5 font-semibold text-white transition active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #35b8aa, #1e8f84)' }}
          >
            Save
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

// useSearchParams braucht beim Build eine Suspense-Grenze
export default function EditHabit(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <EditHabitForm {...props} />
    </Suspense>
  );
}