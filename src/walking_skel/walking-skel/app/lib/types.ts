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

