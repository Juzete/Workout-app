import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CircleTimer from "../CircleTimer/CircleTimer";
import ExercisesPagination from "./ExercisesPagination";
import styles from "./PaginationAndTimer.module.css";

const PaginationAndTimer = (props) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(props.duration);
  const { currentExercises } = useTypedSelector((state) => state.workout);

  const handleComplete = (condition) => {
    setIsComplete(condition);
    props.isComplete(condition);
    if (isPassed === true && condition === true) props.isPassed(false);
  };
  const handlePassed = (condition) => {
    setIsPassed(condition);
    props.isPassed(condition);
  };
  const handleCurrentSeconds = (seconds) => {
    setCurrentSeconds(seconds);
  };

  useEffect(() => {
    if (isComplete === true && !props.isPaused) props.videoRef.current.play();
    else props.videoRef.current.pause();
    if (isPassed) setCurrentSeconds(props.duration);
  }, [
    isComplete,
    isPassed,
    currentSeconds,
    props.isPaused,
    props.duration,
    currentExercises,
    props,
  ]);

  return (
    <>
      <div className={styles.prevPage}>
        {" "}
        {props.prevPage > -1 ? <ExercisesPagination direction="prev" /> : null}
      </div>

      <div className={styles.timer}>
        {" "}
        {isComplete === false ? (
          <CircleTimer
            seconds={5}
            color={"#1DE9B6"}
            isComplete={handleComplete}
            isPassed={handlePassed}
          />
        ) : (
          <CircleTimer
            seconds={currentSeconds}
            color={"#FF4081"}
            isComplete={handleComplete}
            isPassed={handlePassed}
            isPaused={props.isPaused}
            currentSeconds={handleCurrentSeconds}
          />
        )}
      </div>
      <div className={styles.nextPage}>
        {props.nextPage > -1 ? <ExercisesPagination direction="next" /> : null}
      </div>
    </>
  );
};

export default PaginationAndTimer;
