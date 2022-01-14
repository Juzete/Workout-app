import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { workoutListMap } from "../utils/workoutListMap";
import CircleProgressBar from "./CircleTimer/ProgressBar/CircleProgressBar";
import CSS from "csstype";

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

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((progress) => progress + 3);
    }, 1);

    return () => {
      clearInterval(progressInterval);
    };
  }, []);

  const wrapper: CSS.Properties = {
    display: "flex",
    justifyContent: "center",
    width: "800px",
  };

  if (loading) {
    return (
      <div style={wrapper}>
        {" "}
        <CircleProgressBar
          width="120"
          height="120"
          stroke={"black"}
          strokeWidth="6"
          cx="60"
          cy="60"
          r="52"
          progress={progress}
        />
      </div>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return <div>{workoutListMap(workouts)}</div>;
};

export default WorkoutList;
