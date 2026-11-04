import { BottomNav } from '../components/BottomNav';
import { SettingsMenu } from '../components/SettingsMenu';

/**
 * Pet screen — PLACEHOLDER.
 *
 * The wireframe (docs/preview.html) includes a "Pet" tab for a gamification
 * feature. It isn't built yet; this placeholder exists so the bottom nav has a
 * real destination instead of a dead link.
 *
 * FEATURE ENTRY POINT: a team member can build the pet/gamification screen here.
 */
export default function PetPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="sticky top-0 z-30 w-full bg-[var(--app-bg)]" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="mx-auto w-full max-w-md flex items-center justify-between px-4 py-2">
          <h1 className="text-[26px] font-extrabold text-[var(--teal-900)]">Pet</h1>
          <SettingsMenu />
        </div>
      </div>
      <main className="mx-auto w-full max-w-md flex-1 px-4 pt-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl">🐾</div>
          <p className="mt-3 text-xl font-extrabold text-[var(--teal-900)]">Pet coming soon</p>
          <p className="mt-1 text-sm text-[var(--text-2)]">
            Your habit companion will live here.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
