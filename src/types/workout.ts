export interface iExercises {
  id: number;
  title: string;
  duration: number;
  video: string;
  photo: string;
  description: string;
  isPassed?: boolean;
  length?: number;
}

export interface iWorkouts {
  exercises: iExercises[];
  muscle_group: {};
  title: string;
}

export interface WorkoutState {
  workouts: iWorkouts[];
  loading: boolean;
  error: null | string;
  exercises: iExercises[];
  currentExercises: number;
}

export enum WorkoutActionTypes {
  FETCH_WORKOUTS = "FETCH_WORKOUTS",
  FETCH_WORKOUTS_SUCCESS = "FETCH_WORKOUTS_SUCCESS",
  FETCH_WORKOUTS_ERROR = "FETCH_WORKOUTS_ERROR",
  SET_EXERCISES = "SET_EXERCISES",
  SET_CURRENT_EXERCISES = "SET_CURRENT_EXERCISES",
}
interface FetchWorkoutAction {
  type: WorkoutActionTypes.FETCH_WORKOUTS;
}
interface FetchWorkoutSuccessAction {
  type: WorkoutActionTypes.FETCH_WORKOUTS_SUCCESS;
  payload: any[];
}
interface FetchWorkoutErrorAction {
  type: WorkoutActionTypes.FETCH_WORKOUTS_ERROR;
  payload: string;
}
interface SetExercisesAction {
  type: WorkoutActionTypes.SET_EXERCISES;
  payload: iExercises[];
}
interface SetCurrentExercisesAction {
  type: WorkoutActionTypes.SET_CURRENT_EXERCISES;
  payload: number;
}

export type WorkoutAction =
  | FetchWorkoutAction
  | FetchWorkoutErrorAction
  | FetchWorkoutSuccessAction
  | SetExercisesAction
  | SetCurrentExercisesAction;
