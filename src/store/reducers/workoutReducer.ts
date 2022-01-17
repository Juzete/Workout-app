import {
  WorkoutAction,
  WorkoutActionTypes,
  WorkoutState,
} from "../../types/workout";

const initialState: WorkoutState = {
  workouts: [],
  error: null,
  loading: false,
  exercises: [],
  currentExercises: -1,
  isPaused: false,
  currentDuration: 0,
  exercisesToView: {
    id: 0,
    title: "",
    duration: 0,
    video: "",
    photo: "",
    description: "",
    isPassed: false,
    length: 0,
  },
};

export const workoutReducer = (
  state = initialState,
  action: WorkoutAction
): WorkoutState => {
  switch (action.type) {
    case WorkoutActionTypes.FETCH_WORKOUTS:
      return { ...state, loading: true };
    case WorkoutActionTypes.FETCH_WORKOUTS_SUCCESS:
      return { ...state, loading: false, workouts: action.payload };
    case WorkoutActionTypes.FETCH_WORKOUTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case WorkoutActionTypes.SET_EXERCISES:
      return { ...state, exercises: action.payload };
    case WorkoutActionTypes.SET_CURRENT_EXERCISES:
      return { ...state, currentExercises: action.payload };
    case WorkoutActionTypes.SET_WORKOUT_IS_PAUSED:
      return { ...state, isPaused: action.payload };
    case WorkoutActionTypes.SET_CURRENT_DURATION:
      return { ...state, currentDuration: action.payload };
    case WorkoutActionTypes.SET_EXERCISES_TO_VIEW:
      return { ...state, exercisesToView: action.payload };
    default:
      return state;
  }
};
