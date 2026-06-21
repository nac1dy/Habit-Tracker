'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * BottomNav — the app's primary navigation (matches the wireframe's bottom bar).
 *
 * FEATURE ENTRY POINT: shared across screens. Currently used by the Mainpage
 * (and the /pet placeholder); other pages can adopt it too.
 *
 * Tabs mirror the wireframe: Home / Habits / Stats / Pet.
 * (Settings lives in the header menu in the wireframe, not in the bottom bar.)
 */

type Tab = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const TABS: Tab[] = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    href: '/habits',
    label: 'Habits',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <polyline points="8,12 11,15 16,9" />
      </svg>
    ),
  },
  {
    href: '/stats',
    label: 'Stats',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="18" y1="20" x2="18" y2="10" />
      </svg>
    ),
  },
  {
    href: '/pet',
    label: 'Pet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="16.5" rx="5" ry="4" />
        <circle cx="5.5" cy="11.5" r="2.2" />
        <circle cx="9.5" cy="7.5" r="2.2" />
        <circle cx="14.5" cy="7.5" r="2.2" />
        <circle cx="18.5" cy="11.5" r="2.2" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    // The bar background spans the full viewport width; the buttons stay in a
    // centered, phone-width row. This keeps the app feel on desktop/tablet
    // without the nav looking cut off or floating.
    <nav className="sticky bottom-0 z-40 w-full border-t border-[var(--border)] bg-[var(--glass)] backdrop-blur-[28px]">
      <div className="mx-auto flex w-full max-w-md items-start justify-around px-2 pt-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          // Home matches "/" exactly; others match their prefix.
          const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className="flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition active:scale-90"
            >
              <span
                className={`h-[22px] w-[22px] ${active ? 'text-[var(--teal-700)]' : 'text-[var(--text-3)]'}`}
                style={{ stroke: 'currentColor' }}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[10px] ${active ? 'font-bold text-[var(--teal-700)]' : 'font-medium text-[var(--text-3)]'}`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
