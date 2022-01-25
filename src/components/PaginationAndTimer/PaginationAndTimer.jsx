import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CircleTimer from "../CircleTimer/CircleTimer";
import ExercisesPagination from "./ExercisesPagination";
import styles from "./PaginationAndTimer.module.css";

const PaginationAndTimer = (props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const { currentExercises, isPaused, currentDuration } = useTypedSelector(
    (state) => state.workout
  );

  const handleComplete = (condition) => {
    setIsComplete(condition);
    props.isComplete(condition);
    if (isPassed === true && condition === true) props.isPassed(false);
  };
  const handlePassed = (condition) => {
    setIsPassed(condition);
    props.isPassed(condition);
  };

  useEffect(() => {
    if (isComplete === true && !isPaused) {
      props.videoRef.current.play();
    } else {
      props.videoRef.current.pause();
    }
  }, [isComplete, isPassed, isPaused, currentExercises, props]);

  return (
    <>
      <div className={styles.prevPage}>
        {props.prevPage > -1 ? (
          <ExercisesPagination direction="prev" setComplete={setIsComplete} />
        ) : null}
      </div>

      <div className={styles.timer}>
        {isComplete === false ? (
          <CircleTimer
            completed={isComplete}
            seconds={5}
            color={"#1DE9B6"}
            isComplete={handleComplete}
            isPassed={handlePassed}
          />
        ) : (
          <CircleTimer
            completed={isComplete}
            seconds={currentDuration}
            color={"#FF4081"}
            isComplete={handleComplete}
            isPassed={handlePassed}
          />
        )}
      </div>
      <div className={styles.nextPage}>
        {props.nextPage > -1 ? (
          <ExercisesPagination direction="next" setComplete={setIsComplete} />
        ) : null}
      </div>
    </>
  );
};

export default PaginationAndTimer;
