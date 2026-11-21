"use client"
import { HabitCategory,DayOfWeek } from '@/app/lib/types';


export async function getCheckedHabits(router: any) : Promise<Response>{
        const res_check = await fetch('/api/check'); // TODO refactor
        if (res_check.status === 401) return router.replace('/login');
        if (!res_check.ok) throw new Error('Failed to fetch checked habits');
        return res_check;
}

export async function getHabits(router: any) : Promise<Response>{
        const res = await fetch('/api/habits');
        // 401 means the session has expired, so the user has to log in again
        if (res.status === 401) return router.replace('/login'); 
        if (!res.ok) throw new Error('Failed to fetch habits');
        return res;
}

export async function deleteHabit(id:string): Promise<Response>{
    const response = await fetch(`/api/habits/${id}`, { method: 'DELETE' });
    return response;
}

export async function createHabit(title:string, category:HabitCategory,frequenz:Record<DayOfWeek, boolean> ){
    const res = await fetch('/api/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // FEATURE ENTRY POINT: also send `color`, `icon`, `track_type`, all categories
        // once backend schema is extended.
        body: JSON.stringify({ title, category, frequenz }),
    });
    return res;
}

export async function checkHabit(habitid:string, today:string, newDoneState:boolean) : Promise<Response>{
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitID: habitid, date: today, done: newDoneState }),
      });
      return res;
}