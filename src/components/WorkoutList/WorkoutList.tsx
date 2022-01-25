import React, { useEffect } from "react";
import "./WorkoutList.css";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { workoutListMap } from "../../utils/workoutListMap";
import Loader from "../Loader/Loader";

const WorkoutList: React.FC = () => {
  const { workouts, loading, error } = useTypedSelector(
    (state) => state.workout
  );

  const { fetchWorkouts } = useActions();
  useEffect(() => {
    if (workouts.length === 0) {
      fetchWorkouts();
    }
  }, []);

  if (loading) {
    return (
      <div className="workout_list__wrapper">
        <Loader />
      </div>
    );
  }

  return <div>{error ? <h1>{error}</h1> : workoutListMap(workouts)}</div>;
};

export default WorkoutList;
