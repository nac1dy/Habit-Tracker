import Link from 'next/link';
import { Header } from '../components/Header';

export default function HabitsPage() {
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
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--teal-500)] text-white border-transparent text-center"
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
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--card)] text-[var(--text-2)] border-[var(--border)] text-center"
            >
              Settings
            </Link>
          </nav>

          {/* Page header */}
          <div className="mb-6">
            <p className="text-xs font-extrabold tracking-[0.18em] text-[var(--teal-700)] uppercase">
              Habits
            </p>
            <h1 className="text-3xl font-bold text-[var(--teal-900)] mt-1">Manage habits</h1>
            <p className="text-[var(--text-2)]">Dummy list that previews the future habits view.</p>
          </div>

          {/* Dummy habit list cards */}
          <div
            className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[22px] p-5"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4">
                <div>
                  <p className="text-[var(--text)] font-semibold">Morning Run</p>
                  <p className="text-sm text-[var(--text-2)]">Sport · 4x per week</p>
                </div>
                <span className="text-xs text-[var(--text-3)]">Active</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4">
                <div>
                  <p className="text-[var(--text)] font-semibold">Read 20 Pages</p>
                  <p className="text-sm text-[var(--text-2)]">Mental · Daily</p>
                </div>
                <span className="text-xs text-[var(--text-3)]">Active</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[var(--glass-border)] bg-[var(--glass)] p-4">
                <div>
                  <p className="text-[var(--text)] font-semibold">No Sugar</p>
                  <p className="text-sm text-[var(--text-2)]">Health · 5x per week</p>
                </div>
                <span className="text-xs text-[var(--text-3)]">Paused</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
