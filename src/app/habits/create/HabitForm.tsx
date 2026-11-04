'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HabitCategory, DayOfWeek } from '@/app/lib/types';

// ─── Category config ─────────────────────────────────────────────────────────
// FEATURE ENTRY POINT: fetch custom categories from GET /api/categories and merge.
const CATEGORIES: Array<{ key: HabitCategory; label: string; color: string; icon: React.ReactNode }> = [
  {
    key: 'sport', label: 'Sport', color: '#16a34a',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg>,
  },
  {
    key: 'health', label: 'Health', color: '#dc2626',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  },
  {
    key: 'mental', label: 'Mental', color: '#9333ea',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  },
  {
    key: 'personal', label: 'Personal', color: '#2563eb',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" /></svg>,
  },
];

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_SHORT: Record<DayOfWeek, string> = {
  monday: 'Mo', tuesday: 'Tu', wednesday: 'We', thursday: 'Th',
  friday: 'Fr', saturday: 'Sa', sunday: 'Su',
};

function freqFromCount(n: number): Record<DayOfWeek, boolean> {
  return Object.fromEntries(DAYS.map((d, i) => [d, i < n])) as Record<DayOfWeek, boolean>;
}

export function HabitForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [expanded, setExpanded] = useState(false);

  // ── Real fields ─────────────────────────────────────────────────────────
  const [title, setTitle] = useState('');
  // Multi-select; backend takes one for now.
  // FEATURE ENTRY POINT: send full array when backend supports multi-category.
  const [categories, setCategories] = useState<HabitCategory[]>([]);
  const [timesPerWeek, setTimesPerWeek] = useState(7);
  const [frequenz, setFrequenz] = useState<Record<DayOfWeek, boolean>>(freqFromCount(7));

  // specific days: off by default (slider auto-picks days); on = show day grid
  const [specificDays, setSpecificDays] = useState(false);

  // ── Placeholder fields ──────────────────────────────────────────────────
  // FEATURE ENTRY POINT: trackType → backend field `track_type: 'yesno'|'count'|'duration'`
  const [trackType, setTrackType] = useState<'yesno' | 'count' | 'duration'>('yesno');
  // FEATURE ENTRY POINT: selectedColor → backend field `color: string | null`
  const [selectedColor] = useState<string | null>(null);
  // FEATURE ENTRY POINT: selectedIcon  → backend field `icon: string | null`
  const [selectedIcon] = useState<string | null>(null);

  const toggleCategory = (cat: HabitCategory) =>
    setCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);

  const handleSlider = (n: number) => {
    setTimesPerWeek(n);
    setFrequenz(freqFromCount(n));
  };

  const toggleDay = (day: DayOfWeek) => {
    setFrequenz((prev) => {
      const next = { ...prev, [day]: !prev[day] };
      setTimesPerWeek(Object.values(next).filter(Boolean).length);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || categories.length === 0) {
      setModal({ title: 'Missing info', message: 'Enter a habit name and pick at least one category.' });
      return;
    }
    if (!Object.values(frequenz).some(Boolean)) {
      setModal({ title: 'Missing info', message: 'Select at least one day.' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FEATURE ENTRY POINT: also send `color`, `icon`, `track_type`, all categories
        // once backend schema is extended.
        body: JSON.stringify({ title, category: categories[0], frequenz }),
      });
      if (!res.ok) throw new Error('Failed to create habit');
      router.refresh();   // refresh habits list behind the sheet
      onClose();
    } catch (err) {
      setModal({ title: 'Error', message: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const sliderLabel = timesPerWeek === 7 ? 'Daily' : `${timesPerWeek}×`;

  return (
    <>
      {/* Handle bar */}
      <div className="mx-auto mt-3 mb-5 h-1.5 w-9 rounded-full" style={{ background: 'var(--border)' }} />

      <h1 className="text-[20px] font-extrabold tracking-tight text-[var(--teal-900)]">New Habit</h1>
      <p className="mt-1 mb-5 text-[13px] text-[var(--text-2)]">Pick a category to get started</p>

      <form onSubmit={handleSubmit}>

        {/* ── Category — scrollable, multi-select ─────────────────────── */}
        <div className="mb-2 flex items-center justify-between">
          <label className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-2)]">
            Category
          </label>
          {/*
            FEATURE ENTRY POINT: Edit button → open a category management sheet.
            - List existing categories with delete (×) per row.
            - "Add category" → name + color + icon picker.
            - Backend: POST/DELETE /api/categories.
          */}
          <button
            type="button"
            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition active:scale-95"
            style={{ background: 'var(--glass)', color: 'var(--text-2)', border: '1px solid var(--border)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(({ key, label, color, icon }) => {
            const active = categories.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleCategory(key)}
                className="shrink-0 flex flex-col items-center gap-1.5 rounded-[14px] border px-5 py-3 transition active:scale-95"
                style={
                  active
                    ? { borderColor: color, background: color + '18', color }
                    : { borderColor: 'var(--border)', background: 'var(--glass)', color: 'var(--text-3)' }
                }
              >
                <span>{icon}</span>
                <span className="text-[11px] font-semibold whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Habit name ──────────────────────────────────────────────── */}
        <label className="mt-5 mb-2 block text-[11px] font-semibold uppercase tracking-wide text-[var(--text-2)]">
          Habit name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Morning Run"
          className="w-full rounded-[12px] border px-4 py-3 text-[15px] outline-none transition"
          style={{ background: 'var(--page-bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />

        {/* ── Track type (main section) ───────────────────────────────── */}
        {/*
          FEATURE ENTRY POINT: controls check-in sheet UI.
          Yes/No → done/not-done tap. Count → number + unit. Duration → minutes.
          Backend field: `track_type` (not yet in schema).
        */}
        <label className="mt-5 mb-2 block text-[11px] font-semibold uppercase tracking-wide text-[var(--text-2)]">
          Track type
        </label>
        <div className="flex rounded-[10px] p-[3px]" style={{ background: 'rgba(0,0,0,0.06)' }}>
          {(['yesno', 'count', 'duration'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTrackType(t)}
              className="flex-1 rounded-[8px] py-2 text-[13px] transition"
              style={
                trackType === t
                  ? { background: 'var(--app-bg)', color: '#35b8aa', fontWeight: 700, boxShadow: '0 2px 8px rgba(30,90,84,0.12)' }
                  : { color: 'var(--text-2)', fontWeight: 500 }
              }
            >
              {t === 'yesno' ? 'Yes / No' : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── More options toggle ─────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="mt-5 flex w-full items-center justify-center gap-1 text-[13px] font-medium text-[var(--text-2)] transition"
        >
          <span>{expanded ? '▾' : '▸'}</span>
          <span>{expanded ? 'Fewer options' : 'More options'}</span>
        </button>

        {expanded && (
          <div className="mt-4 space-y-6">

            {/* Times per week ─────────────────────────────────────── */}
            {/*
              Slider auto-selects first N weekdays in `frequenz`.
              "Custom" toggle reveals the day grid for precise control.
              Both stay in sync. `frequenz` is sent to the backend.
            */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-[var(--text-2)]">
                Times per week
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range" min={1} max={7} value={timesPerWeek}
                  onChange={(e) => handleSlider(Number(e.target.value))}
                  className="flex-1"
                  style={{ accentColor: '#35b8aa' }}
                />
                <span className="w-12 shrink-0 text-right text-[16px] font-bold text-[var(--text)]">
                  {sliderLabel}
                </span>
              </div>

              {/* Specific days toggle — same segmented style as Track Type */}
              <label className="mt-4 mb-2 block text-[11px] font-semibold uppercase tracking-wide text-[var(--text-2)]">
                Specific days
              </label>
              <div className="flex rounded-[10px] p-[3px]" style={{ background: 'rgba(0,0,0,0.06)' }}>
                {([false, true] as const).map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setSpecificDays(val)}
                    className="flex-1 rounded-[8px] py-2 text-[13px] transition"
                    style={
                      specificDays === val
                        ? { background: 'var(--app-bg)', color: '#35b8aa', fontWeight: 700, boxShadow: '0 2px 8px rgba(30,90,84,0.12)' }
                        : { color: 'var(--text-2)', fontWeight: 500 }
                    }
                  >
                    {val ? 'Custom' : 'Auto'}
                  </button>
                ))}
              </div>

              {/* Day grid — only visible when Custom is selected */}
              {specificDays && (
                <div className="mt-3 grid grid-cols-7 gap-1.5">
                  {DAYS.map((day) => {
                    const on = frequenz[day];
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className="flex h-9 items-center justify-center rounded-full text-[12px] font-semibold transition active:scale-90"
                        style={
                          on
                            ? { background: '#35b8aa', color: '#fff' }
                            : { background: 'var(--page-bg)', color: 'var(--text-2)', border: '1px solid var(--border)' }
                        }
                      >
                        {DAY_SHORT[day]}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Color + Icon buttons ───────────────────────────────── */}
            {/*
              FEATURE ENTRY POINT (Color): tap → open color-picker sheet.
                setSelectedColor(picked). Backend field: `color: string | null`.
                Used for: habit dot, check-in accent bar, stats segment.
              FEATURE ENTRY POINT (Icon): tap → open emoji/icon picker sheet.
                setSelectedIcon(picked). Backend field: `icon: string | null`.
                Shown next to habit name in list and check-in sheet.
            */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-between rounded-[12px] border px-4 py-3 transition active:scale-95"
                style={{ borderColor: 'var(--border)', background: 'var(--page-bg)' }}
              >
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--text-2)]">Color</span>
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full border border-[var(--border)]" style={{ background: selectedColor ?? 'var(--border)' }} />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-3)]"><polyline points="9,18 15,12 9,6" /></svg>
                </span>
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-between rounded-[12px] border px-4 py-3 transition active:scale-95"
                style={{ borderColor: 'var(--border)', background: 'var(--page-bg)' }}
              >
                <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--text-2)]">Icon</span>
                <span className="flex items-center gap-2">
                  <span className="text-lg leading-none">{selectedIcon ?? '—'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-3)]"><polyline points="9,18 15,12 9,6" /></svg>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ── Submit ──────────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-[var(--radius)] py-4 text-[16px] font-bold text-white transition active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, #35b8aa, #1b6f68)',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 8px 24px rgba(30,90,84,0.22)',
          }}
        >
          {loading ? 'Adding…' : 'Add Habit'}
        </button>
      </form>

      {/* ── Inline validation error ───────────────────────────────────── */}
      {modal && (
        <div
          className="mt-4 flex items-start gap-2.5 rounded-[12px] px-4 py-3"
          style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.22)' }}
          role="alert"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="flex-1">
            <p className="text-[13px] font-semibold" style={{ color: '#dc2626' }}>{modal.title}</p>
            <p className="text-[12px] text-[var(--text-2)]">{modal.message}</p>
          </div>
          <button type="button" onClick={() => setModal(null)} className="shrink-0 text-[var(--text-3)] transition active:scale-95">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      )}
    </>
  );
}
