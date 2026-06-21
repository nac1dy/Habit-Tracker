// Defines valid habit categories
export type HabitCategory = 'sport' | 'health' | 'mental' | 'personal';

// Days of week for habit scheduling
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Main Habit interface - will be extended with backend fields (userId, checkmarks, etc.)
export interface Habit {
    habitid: string; // UUID from Supabase
    title: string;
    category: HabitCategory;
    frequenz: Record<DayOfWeek, boolean>;
    created_at: string; // ISO timestamp from Supabase
}

// --- Home view models -------------------------------------------------------
// These are UI shapes for the Mainpage, not the raw DB shape (Habit above).
// They bundle the few extra fields the home screen shows.

// A single habit row as shown in the "Today" list on the home page.
export interface HomeHabit {
    habitid: string;
    title: string;
    category: HabitCategory;
    // streakDays + doneToday are NOT in the DB yet -> currently mock/local.
    // See API INTEGRATION POINT in app/lib/mockHome.ts.
    streakDays: number;
    doneToday: boolean;
}

// Top-of-page summary stats (3 small cards).
export interface HomeStats {
    dayStreak: number;
    weekPercent: number;
}

// Momentum block: a score plus today's vs. previous progress (0-100 widths).
export interface MomentumData {
    score: number;      // 0-100
    prevPercent: number; // yesterday's progress bar width
    fillPercent: number; // today's progress bar width
}

// A habit row as shown on the Habits management screen (/habits).
export interface ManagedHabit {
    habitid: string;
    title: string;
    category: HabitCategory;
    // Human-readable frequency, e.g. "Daily" or "3× week".
    // Derived from the habit's `frequenz` field (see /habits page).
    freqLabel: string;
}

