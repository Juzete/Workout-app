import { iWorkouts, iExercises } from "./../types/workout";

const exercisesCombineInArray = (workouts: iWorkouts[]) => {
  let allExercises: iExercises[] = [];
  workouts.forEach((item) => {
    allExercises = [...allExercises, ...item.exercises];
  });
  return allExercises;
};

export default exercisesCombineInArray;
