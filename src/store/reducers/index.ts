import { combineReducers } from "redux";
import { workoutReducer } from "./workoutReducer";

export const rootReducer = combineReducers({
  workout: workoutReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
