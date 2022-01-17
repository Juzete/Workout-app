import { iExercises } from "./../../types/workout";
import { Dispatch } from "redux";
import axios from "axios";
import { WorkoutAction, WorkoutActionTypes } from "../../types/workout";
import exercisesCombineInArray from "../../utils/exercisesCombineInArray";

declare var process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

export const fetchWorkouts = () => {
  return async (dispatch: Dispatch<WorkoutAction>) => {
    try {
      dispatch({ type: WorkoutActionTypes.FETCH_WORKOUTS });
      const response = await axios.get(process.env.REACT_APP_API_URL);
      dispatch({
        type: WorkoutActionTypes.FETCH_WORKOUTS_SUCCESS,
        payload: response.data.data.questions,
      });
      dispatch({
        type: WorkoutActionTypes.SET_EXERCISES,
        payload: exercisesCombineInArray(response.data.data.questions),
      });
      dispatch({
        type: WorkoutActionTypes.SET_CURRENT_EXERCISES,
        payload: response.data.data.questions[0].exercises[0].id,
      });
    } catch (e) {
      dispatch({
        type: WorkoutActionTypes.FETCH_WORKOUTS_ERROR,
        payload: "Error loading workout",
      });
    }
  };
};

export const setCurrentExercises = (id: number) => {
  return (dispatch: Dispatch<WorkoutAction>) => {
    dispatch({ type: WorkoutActionTypes.SET_CURRENT_EXERCISES, payload: id });
  };
};

export const SetWorkoutIsPaused = (isPaused: boolean) => {
  return (dispatch: Dispatch<WorkoutAction>) => {
    dispatch({
      type: WorkoutActionTypes.SET_WORKOUT_IS_PAUSED,
      payload: isPaused,
    });
  };
};

export const setCurrentDuration = (duration: number) => {
  return (dispatch: Dispatch<WorkoutAction>) => {
    dispatch({
      type: WorkoutActionTypes.SET_CURRENT_DURATION,
      payload: duration,
    });
  };
};

export const setExercisesToView = (exercises: iExercises) => {
  return (dispatch: Dispatch<WorkoutAction>) => {
    dispatch({
      type: WorkoutActionTypes.SET_EXERCISES_TO_VIEW,
      payload: exercises,
    });
  };
};
