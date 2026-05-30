'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          🎯 Habito
        </Link>
      </div>
    </header>
  );
}