import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./WorkoutExerciseViewPage.module.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import PaginationAndTimer from "../components/PaginationAndTimer/PaginationAndTimer";
import VideoControlButton from "../components/VideoControlButton";
import WorkoutPaused from "../components/WorkoutPaused";
import { Link } from "react-router-dom";
import { handlePaginationButtons } from "../utils/handlePaginationButtons";

const WorkoutExerciseViewPage = () => {
  const [isPassed, setIsPassed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [videoButton, setVideoButton] = useState("pause");
  const [videoIsPaused, setVideoIsPaused] = useState(false);
  const [nextPage, setNextPage] = useState(-1);
  const [prevPage, setPrevPage] = useState(-1);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const videoRef = useRef(null);
  const { setCurrentExercises } = useActions();
  const { exercises, currentExercises } = useTypedSelector(
    (state) => state.workout
  );

  const setExercisesById = () => {
    let toView;
    exercises.forEach((item) => {
      if (item.id === currentExercises) toView = item;
    });
    return toView;
  };

  const [exercisesToView, setExercisesToView] = useState(setExercisesById());

  useEffect(() => {
    handlePaginationButtons(
      exercises,
      currentExercises,
      setPrevPage,
      setNextPage
    );
    if (isPassed === true) {
      for (let i = 0; i < exercises.length; i++) {
        if (exercises[i].id === currentExercises) {
          exercises[i].isPassed = true;
        }
      }
      for (let i = 0; i < exercises.length + 1; i++) {
        if (i === exercises.length) {
          setWorkoutComplete(true);
          return;
        }
        if (!exercises[i].hasOwnProperty("isPassed")) {
          setCurrentExercises(exercises[i].id);
          setIsPassed(false);
          return;
        }
      }
    }
    setExercisesToView(setExercisesById());
  }, [currentExercises, isComplete, isPassed, exercisesToView, exercises]);

  const handlePassed = (isPassed) => {
    setIsPassed(isPassed);
  };
  const handleComplete = (isComplete) => {
    setIsComplete(isComplete);
  };
  const handleVideoButton = () => {
    if (videoButton === "pause") {
      videoRef.current.pause();
      setVideoIsPaused(true);
      setVideoButton("resume");
    } else {
      videoRef.current.play();
      setVideoIsPaused(false);
      setVideoButton("pause");
    }
  };

  return (
    <div className={styles.page_wrapper}>
      {workoutComplete ? (
        <Link to={"/workout-complete"} className={styles.complete_button}>
          Workout completed!
        </Link>
      ) : null}
      {!workoutComplete ? (
        <>
          {isComplete && !workoutComplete ? (
            <span className={styles.title}>{exercisesToView.title}</span>
          ) : (
            <span className={styles.title}>Get Ready </span>
          )}
          <div className={styles.wrapper}>
            <PaginationAndTimer
              duration={exercisesToView.duration}
              isPassed={handlePassed}
              isComplete={handleComplete}
              videoRef={videoRef}
              isPaused={videoIsPaused}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
          <div className={styles.video_wrapper}>
            <video
              muted={"muted"}
              loop={true}
              ref={videoRef}
              src={exercisesToView.video}
            ></video>
            {videoIsPaused ? <WorkoutPaused /> : null}
          </div>
          <>
            {isComplete && !workoutComplete ? (
              <button
                className={styles.video_control}
                onClick={handleVideoButton}
              >
                {" "}
                <VideoControlButton condition={videoButton} />
              </button>
            ) : null}
          </>
        </>
      ) : null}
    </div>
  );
};

export default WorkoutExerciseViewPage;
