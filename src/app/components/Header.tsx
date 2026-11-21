'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-(--border) bg-(--glass) backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-end justify-between">
        <div>
          {/* Small kicker in preview style */}
          <p className="text-xs font-extrabold tracking-[0.18em] text-(--teal-700) uppercase">
            Habit Tracker
          </p>
          <Link href="/" className="text-2xl font-bold text-(--teal-900)">
            Habito
          </Link>
        </div>
      </div>
    </header>
  );
}
