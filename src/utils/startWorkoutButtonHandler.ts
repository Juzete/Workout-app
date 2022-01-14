import { iExercises } from "./../types/workout";
export const startWorkoutButtonHandler = (exercises: iExercises[]) => {
  if (exercises.length > 0) {
    if (exercises[0].hasOwnProperty("isPassed")) return "Resume";
  }
  return "Start Workout";
};
