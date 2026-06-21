'use client';

import { useRouter } from 'next/navigation';
import { HabitForm } from '@/app/habits/create/HabitForm';

/**
 * Intercepting route: renders the create-habit sheet as a modal overlay
 * while the /habits page stays mounted and visible behind.
 *
 * This intercepts navigation to /habits/create when triggered from within
 * the app (e.g. the "+ New" button). Direct URL access or refresh falls
 * back to app/habits/create/page.tsx (the standalone page).
 */
export default function CreateHabitModal() {
  const router = useRouter();

  return (
    // Full-screen fixed overlay: backdrop + sheet.
    <div className="fixed inset-0 z-50 flex flex-col justify-end">

      {/* Backdrop — dimmed + blurred, tap to dismiss ─────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        onClick={() => router.back()}
        aria-label="Close"
      />

      {/* Sheet ─────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto w-full max-w-md overflow-y-auto rounded-t-[28px] px-5 pb-10"
        style={{
          background: 'var(--app-bg)',
          maxHeight: '88svh',
          animation: 'sheet-up 0.34s cubic-bezier(0.32,0.72,0,1) both',
        }}
      >
        <HabitForm onClose={() => router.back()} />
      </div>
    </div>
  );
}
