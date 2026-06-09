import Link from 'next/link';
import { Header } from '../components/Header';

export default function StatsPage() {
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
              className="rounded-full px-3 py-2 text-sm font-semibold border transition bg-[var(--teal-500)] text-white border-transparent text-center"
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
              Stats
            </p>
            <h1 className="text-3xl font-bold text-[var(--teal-900)] mt-1">Progress insights</h1>
            <p className="text-[var(--text-2)]">Dummy stats to preview the analytics view.</p>
          </div>

          {/* Momentum score card (preview style) */}
          <div
            className="rounded-3xl border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[22px] p-5"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs uppercase font-semibold text-[var(--text-3)]">Momentum score</p>
                <p className="text-sm text-[var(--text-2)]">Falls daily · stays green when habits are completed</p>
              </div>
              <div className="text-3xl font-extrabold text-[var(--teal-900)]">82</div>
            </div>

            {/* Gradient bar from preview */}
            <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg,#f17777 0%,#f4b860 38%,#45c487 70%,#35b8aa 100%)' }} />

            {/* Zone labels */}
            <div className="mt-2 grid grid-cols-3 text-xs text-[var(--text-3)]">
              <span>low</span>
              <span className="text-center">stable</span>
              <span className="text-right">strong</span>
            </div>
          </div>

          {/* Mini bars (dummy weekly values) */}
          <div className="mt-6 space-y-2">
            <div className="grid grid-cols-[32px_1fr_28px] items-center gap-2 text-sm text-[var(--text-2)]">
              <span>Mon</span>
              <div className="h-2 rounded-full bg-[var(--teal-100)] overflow-hidden">
                <div className="h-full bg-[var(--teal-500)]" style={{ width: '82%' }} />
              </div>
              <span className="text-right">82</span>
            </div>

            <div className="grid grid-cols-[32px_1fr_28px] items-center gap-2 text-sm text-[var(--text-2)]">
              <span>Tue</span>
              <div className="h-2 rounded-full bg-[var(--teal-100)] overflow-hidden">
                <div className="h-full bg-[var(--teal-500)]" style={{ width: '74%' }} />
              </div>
              <span className="text-right">74</span>
            </div>

            <div className="grid grid-cols-[32px_1fr_28px] items-center gap-2 text-sm text-[var(--text-2)]">
              <span>Wed</span>
              <div className="h-2 rounded-full bg-[var(--orange-100)] overflow-hidden">
                <div className="h-full bg-[var(--orange-500)]" style={{ width: '58%' }} />
              </div>
              <span className="text-right">58</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
