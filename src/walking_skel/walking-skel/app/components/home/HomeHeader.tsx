'use client';

import { SettingsMenu } from '@/app/components/SettingsMenu';

function getGreeting(date: Date): string {
  const h = date.getHours();
  if (h < 5)  return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function HomeHeader() {
  const now = new Date();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[20px] font-extrabold tracking-tight text-[var(--teal-900)]">
          {getGreeting(now)}
        </h1>
        <p className="text-[11px] text-[var(--text-3)]">{formatDate(now)}</p>
      </div>
      <SettingsMenu />
    </div>
  );
}
