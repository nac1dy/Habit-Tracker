'use client';


import { createContext, useContext, useState, ReactNode } from 'react';
import { Habit } from './types';


// Context API interface for habit management
interface HabitContextType{
    habits: Habit[];
    addHabit: (habit: Habit) => void; // TODO: Replace with Supabase insert
    deleteHabit: (id: string) => void; // TODO: Replace with Supabase delete
    getHabitById : (id: string) => Habit | undefined;
}


const HabitContext = createContext<HabitContextType | undefined>(undefined);


export function HabitProvider({ children }: {children: ReactNode}){
    const[habits, setHabits] = useState<Habit[]>([]);



    const addHabit = (habit: Habit) => {
        setHabits((prev) => [...prev, habit]);
    };

    const deleteHabit = (id: string) => {
        setHabits((prev) => prev.filter((habit) => habit.habitid !== id));
    };

    const getHabitById = (id: string ) => {
        return habits.find((habit) => habit.habitid === id);
    };

    return (
        <HabitContext.Provider value={{ habits, addHabit, deleteHabit, getHabitById }}>
        {children}
        </HabitContext.Provider>
    );
}

// Custom hook for accessing habit context - will later connect to Supabase queries
export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within HabitProvider');
  }
  return context;
}