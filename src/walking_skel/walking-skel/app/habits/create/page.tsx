'use client';

import { useRouter } from 'next/navigation';
import { HabitForm } from './HabitForm';

/**
 * Standalone fallback for /habits/create.
 * Used on direct URL access or refresh (when intercepting route doesn't fire).
 * Shows the sheet without the habits page behind it.
 */
export default function CreateHabitPage() {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end bg-black/50">
      <div
        className="relative mx-auto w-full max-w-md overflow-y-auto rounded-t-[28px] px-5 pb-10"
        style={{ background: 'var(--app-bg)', maxHeight: '88svh' }}
      >
        <HabitForm onClose={() => router.push('/habits')} />
      </div>
    </div>
  );
}
