import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./WorkoutExerciseViewPage.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import PaginationAndTimer from "../../components/PaginationAndTimer/PaginationAndTimer";
import VideoControlButton from "../../components/VideoControlButton/VideoControlButton";
import { Link } from "react-router-dom";
import WorkoutPaused from "../../components/WorkoutPaused/WorkoutPaused";
import { iExercises } from "../../types/workout";

const WorkoutExerciseViewPage = () => {
  const [isPassed, setIsPassed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [videoButton, setVideoButton] = useState("pause");
  const [nextPage, setNextPage] = useState(-1);
  const [prevPage, setPrevPage] = useState(-1);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    setCurrentExercises,
    SetWorkoutIsPaused,
    setCurrentDuration,
    setExercisesToView,
  } = useActions();
  const { exercises, currentExercises, isPaused } = useTypedSelector(
    (state) => state.workout
  );

  let toView: iExercises;
  const setExercisesById = () => {
    exercises.forEach((item) => {
      if (item.id === currentExercises) {
        toView = item;
      }
    });
    return toView;
  };
  const handlePaginationButtons = () => {
    const idsArray = exercises.map((item) => item.id);
    const currentIndex = idsArray.indexOf(currentExercises);
    if (currentIndex === 0) {
      setPrevPage(-1);
    } else if (currentIndex === idsArray.length) {
      setNextPage(-1);
    }
    if (currentIndex > 0) setPrevPage(idsArray[currentIndex - 1]);
    if (currentIndex < idsArray.length) setNextPage(idsArray[currentIndex + 1]);
  };
  const exercisesPassHandler = () => {
    if (isPassed && isComplete) {
      exercises.forEach((item, index) => {
        if (item.id === currentExercises) {
          item.isPassed = true;
        }
      });

      for (let i = 0; i <= exercises.length; i++) {
        if (i === exercises.length) {
          setWorkoutComplete(true);
          return;
        }
        if (
          !exercises[i].hasOwnProperty("isPassed") ||
          exercises[i].isPassed === false
        ) {
          setCurrentExercises(exercises[i].id);
          return;
        }
      }
    }
  };

  const [exercisesToView, SetExercisesToView] = useState(setExercisesById());

  useEffect(() => {
    setExercisesToView(setExercisesById());
    handlePaginationButtons();
    exercisesPassHandler();
    SetExercisesToView(setExercisesById());
    setCurrentDuration(exercisesToView.duration);
  }, [currentExercises, isComplete, isPassed, exercisesToView, exercises]);

  const handlePassed = (isPassed: boolean) => {
    setIsPassed(isPassed);
    return isPassed;
  };
  const handleComplete = (isComplete: boolean) => {
    setIsComplete(isComplete);
    return isComplete;
  };
  const handleVideoButton = () => {
    if (videoButton === "pause") {
      videoRef.current!.pause();
      SetWorkoutIsPaused(true);
      setVideoButton("resume");
    } else {
      videoRef.current!.play();
      SetWorkoutIsPaused(false);
      setVideoButton("pause");
    }
  };

  return (
    <div className={"WorkoutExerciseViewPage__page_wrapper"}>
      {workoutComplete ? (
        <Link to={"/workout-complete"} className={"complete_button"}>
          Workout completed!
        </Link>
      ) : null}
      {!workoutComplete ? (
        <>
          {isComplete && !workoutComplete ? (
            <span className={"title"}>{exercisesToView.title}</span>
          ) : (
            <span className={"title"}>Get Ready </span>
          )}
          <div className={"WorkoutExerciseViewPage__wrapper"}>
            <PaginationAndTimer
              isPassed={handlePassed}
              isComplete={handleComplete}
              videoRef={videoRef}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
          <div className={"video_wrapper"}>
            <video
              muted={true}
              loop={true}
              ref={videoRef}
              src={exercisesToView.video}
            ></video>
            {isPaused ? <WorkoutPaused /> : null}
          </div>
          <>
            {isComplete && !workoutComplete ? (
              <button className={"video_control"} onClick={handleVideoButton}>
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
