import { iExercises } from "../types/workout";

export const handleMinutes = (
  exercises: iExercises[],
  setMinutes: (min: number) => number
) => {
  const minutes = exercises.reduce((sum, current) => {
    return sum + current.duration;
  }, 0);
  setMinutes(Math.floor(minutes / 60));
};
