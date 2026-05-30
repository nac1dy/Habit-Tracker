import Link from 'next/link';
import { Header } from '../components/Header';

export default function SettingsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[var(--page-bg)] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tab system (dummy pages) */}
          <nav className="grid grid-cols-4 gap-2 mb-6">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--card)] text-[var(--text-2)] border-[var(--border)] text-center"
            >
              Home
            </Link>
            <Link
              href="/habits"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--card)] text-[var(--text-2)] border-[var(--border)] text-center"
            >
              Habits
            </Link>
            <Link
              href="/stats"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--card)] text-[var(--text-2)] border-[var(--border)] text-center"
            >
              Stats
            </Link>
            <Link
              href="/settings"
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--teal-500)] text-white border-transparent text-center"
            >
              Settings
            </Link>
          </nav>

          {/* Page header */}
          <div className="mb-6">
            <p className="text-xs font-extrabold tracking-[0.18em] text-[var(--teal-700)] uppercase">
              Settings
            </p>
            <h1 className="text-3xl font-bold text-[var(--teal-900)] mt-1">Account and reminders</h1>
            <p className="text-[var(--text-2)]">Dummy settings for the walking skeleton.</p>
          </div>

          {/* Dummy settings rows */}
          <div
            className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[22px] p-5"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text)] font-semibold">Notifications</p>
                  <p className="text-sm text-[var(--text-2)]">Daily reminders and streak nudges</p>
                </div>
                <button className="rounded-full bg-[var(--teal-100)] text-[var(--teal-700)] px-3 py-1 text-xs font-semibold">
                  On
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text)] font-semibold">Privacy</p>
                  <p className="text-sm text-[var(--text-2)]">Data export and deletion</p>
                </div>
                <button className="rounded-full bg-[var(--orange-100)] text-[var(--orange-700)] px-3 py-1 text-xs font-semibold">
                  View
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--text)] font-semibold">Theme</p>
                  <p className="text-sm text-[var(--text-2)]">Light / Dark toggle (soon)</p>
                </div>
                <button className="rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--text-2)] px-3 py-1 text-xs font-semibold">
                  Auto
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
