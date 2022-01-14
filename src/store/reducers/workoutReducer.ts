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
    default:
      return state;
  }
};
