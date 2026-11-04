'use client';

import { useState } from 'react';
import { useTheme } from '@/app/lib/ThemeContext';

/**
 * SettingsMenu — reusable burger button + settings dropdown.
 * Used in every tab header so settings are always reachable.
 */

function MenuRow({
  label,
  icon,
  onClick,
  danger,
  trailing,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-[var(--card)] ${
        danger ? 'text-[var(--danger)]' : 'text-[var(--text)]'
      }`}
    >
      <span className="h-[18px] w-[18px] flex-shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
        aria-expanded={open}
        className="rounded-full p-2 text-[var(--text-2)] transition hover:bg-[var(--card)] active:scale-90"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close settings"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-[var(--border)] bg-[var(--glass)] p-1.5 backdrop-blur-[22px]"
            style={{ boxShadow: 'var(--shadow)' }}
            role="menu"
          >
            <MenuRow
              label="Dark Mode"
              onClick={toggleTheme}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              }
              trailing={
                <span
                  className="relative h-5 w-9 flex-shrink-0 rounded-full transition"
                  style={{ background: isDark ? '#35b8aa' : 'var(--border-mid)' }}
                >
                  <span
                    className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
                    style={{ left: isDark ? '18px' : '2px' }}
                  />
                </span>
              }
            />

            {/* FEATURE ENTRY POINT: pause all habits */}
            <MenuRow
              label="Pause Habits"
              onClick={() => setOpen(false)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              }
            />

            {/* FEATURE ENTRY POINT: replay onboarding tutorial */}
            <MenuRow
              label="Tutorial"
              onClick={() => setOpen(false)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              }
            />

            <div className="my-1 border-t border-[var(--border)]" />

            {/* FEATURE ENTRY POINT: auth log out */}
            <MenuRow
              label="Log out"
              onClick={() => setOpen(false)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              }
            />

            {/* FEATURE ENTRY POINT: delete account */}
            <MenuRow
              label="Delete Account"
              danger
              onClick={() => setOpen(false)}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3,6 5,6 21,6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
