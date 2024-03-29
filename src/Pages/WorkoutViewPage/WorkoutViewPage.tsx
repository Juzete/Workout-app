import { useEffect } from "react";
import { Link } from "react-router-dom";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { startWorkoutButtonHandler } from "../../utils/startWorkoutButtonHandler";
import "./WorkoutViewPage.css";

const WorkoutViewPage = () => {
  const { exercises, error } = useTypedSelector((state) => state.workout);
  const { SetWorkoutIsPaused } = useActions();

  const handleClickButton = () => {
    SetWorkoutIsPaused(false);
  };

  useEffect(() => {}, [exercises]);

  return (
    <div className={"workoutViewPage_wrapper"}>
      <div className={"arrow"}>
        <a href="#">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 20L13.41 18.59L7.83 13L20 13L20 11L7.83 11L13.41 5.41L12 4L4 12L12 20Z"
              fill="#212121"
            />
          </svg>
        </a>
      </div>

      <div className={"preview"}>
        <img src="https://i.imgur.com/R51sF4W.png" alt="preview" />
      </div>
      <div className={"title"}>
        <span className={"exercise_description"}>Day 1</span>
        <span className={"exercise_name"}>Morning Flexibility Routine</span>
        <span className={"exercise_description"}>
          Easy • 15 min • No equipment
        </span>
      </div>
      <WorkoutList />
      {!error ? (
        <Link
          to={"/workout-exercise-view"}
          className={"start_button"}
          onClick={handleClickButton}
        >
          {startWorkoutButtonHandler(exercises)}
        </Link>
      ) : null}
    </div>
  );
};

export default WorkoutViewPage;
