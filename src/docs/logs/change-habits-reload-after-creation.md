Initially habits where fetched once and changes such as creating a new Habit doesn't change the state of the Habits

now it is a function called fetchHabits which can be called more then once with the useCallback.
useCallback is a React Hook that will call a cache a passed function meaning we only re-render the Habits

And so we can easily fetch all habits, create a new Habit, and fetch the Habits again and re-render the list

User clicks "Add Habit"
        ↓
createHabit() sends POST /api/habits
        ↓
Supabase creats the Habit
        ↓
Post returns successfull
        ↓
HabitForm calls onCreated 
        ↓
onCreated points to fetchHabits
        ↓
fetchHabits sends GET /api/habits
        ↓
fetchHabits gets the new Habit
        ↓
setHabits(todaysHabits)
        ↓
React re-rendered the List 
        ↓
HabitForm closes