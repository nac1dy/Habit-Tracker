// Defines valid habit categories
export type HabitCategory = 'sport' | 'health' | 'mental' | 'personal';

// Days of week for habit scheduling
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// Main Habit interface - will be extended with backend fields (userId, checkmarks, etc.)
export interface Habit {
    id: string; // TODO: Will be UUID from Supabase
    name: string;
    category: HabitCategory;
    daysOfWeek: Record<DayOfWeek, boolean>;
    createdAt: Date; // TODO: Will be server timestamp from Supabase
}

