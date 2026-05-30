'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--glass)] backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-end justify-between">
        <div>
          {/* Small kicker in preview style */}
          <p className="text-xs font-extrabold tracking-[0.18em] text-[var(--teal-700)] uppercase">
            Habit Tracker
          </p>
          <Link href="/" className="text-2xl font-bold text-[var(--teal-900)]">
            Habito
          </Link>
        </div>
      </div>
    </header>
  );
}