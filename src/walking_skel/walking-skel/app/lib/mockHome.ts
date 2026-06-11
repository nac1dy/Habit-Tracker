import { HomeHabit, HomeStats, MomentumData, ManagedHabit } from './types';

/**
 * MOCK DATA for the Mainpage.
 *
 * The current backend (/api/habits + the Supabase `habit` table) only stores
 * title / category / frequenz. The home screen also shows streaks, today's
 * check-in status and a momentum score — none of which exist in the DB yet.
 * Those values are mocked here, clearly separated from the real habit data,
 * so the page renders fully even before the backend is extended.
 *
 * Each block below is an API INTEGRATION POINT: replace the mock with a real
 * fetch once the corresponding backend endpoint/field exists.
 */

// API INTEGRATION POINT: summary stats -> later from a stats endpoint.
export const MOCK_STATS: HomeStats = {
  dayStreak: 12,
  weekPercent: 87,
};

// API INTEGRATION POINT: momentum -> later computed from real check-in history.
export const MOCK_MOMENTUM: MomentumData = {
  score: 45,
  prevPercent: 70,
  fillPercent: 45,
};

/**
 * Fallback habit list, used only when the real API is unavailable
 * (e.g. no .env.local with Supabase keys). Lets the page work as a demo.
 */
export const MOCK_HABITS: HomeHabit[] = [
  { habitid: 'mock-run', title: 'Morning Run', category: 'sport', streakDays: 8, doneToday: false },
  { habitid: 'mock-read', title: 'Read 20 Pages', category: 'personal', streakDays: 15, doneToday: false },
  { habitid: 'mock-alcohol', title: 'No Alcohol', category: 'health', streakDays: 22, doneToday: false },
  { habitid: 'mock-meditate', title: 'Meditate', category: 'mental', streakDays: 5, doneToday: false },
];

// API INTEGRATION POINT: per-habit streak -> later a real field on the habit.
// Used as a placeholder streak for real habits coming from /api/habits.
export const MOCK_DEFAULT_STREAK = 0;

/**
 * Fallback list for the Habits management screen (/habits), used only when the
 * real API is unavailable (e.g. no .env.local). Lets the screen render as a demo.
 */
export const MOCK_MANAGED_HABITS: ManagedHabit[] = [
  { habitid: 'mock-run', title: 'Morning Run', category: 'sport', freqLabel: 'Daily' },
  { habitid: 'mock-read', title: 'Read 20 Pages', category: 'personal', freqLabel: 'Daily' },
  { habitid: 'mock-alcohol', title: 'No Alcohol', category: 'health', freqLabel: 'Daily' },
  { habitid: 'mock-meditate', title: 'Meditate', category: 'mental', freqLabel: 'Daily' },
  { habitid: 'mock-plants', title: 'Water Plants', category: 'personal', freqLabel: '2× week' },
];
