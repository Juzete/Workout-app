import React from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ListProps {
  direction: string;
  setComplete: (condition: boolean) => void;
}

const ExercisesPagination = (props: ListProps) => {
  const { exercises, currentExercises } = useTypedSelector(
    (state) => state.workout
  );
  const { setCurrentExercises } = useActions();

  const setIsPassed = (condition: boolean) => {
    exercises.forEach((item, index) => {
      if (exercises[index].id === currentExercises) {
        exercises[index].isPassed = condition;
      }
    });
  };

  const handlePaginationButtons = (condition: string) => {
    const idsArray = exercises.map((item) => item.id);
    const currentIndex = idsArray.indexOf(currentExercises);
    if (condition === "prev") {
      setIsPassed(false);
      setCurrentExercises(idsArray[currentIndex - 1]);
    } else {
      setIsPassed(true);
      setCurrentExercises(idsArray[currentIndex + 1]);
    }
    props.setComplete(false);
  };

  return (
    <div>
      {props.direction === "prev" ? (
        <button
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            handlePaginationButtons("prev")
          }
        >
          <svg width="74" height="48" viewBox="0 0 74 48" fill="none">
            <rect
              x="-1"
              y="1"
              width="72"
              height="46"
              rx="7"
              transform="matrix(-1 0 0 1 72 0)"
              stroke="#AA00FF"
              strokeWidth="2"
            />
            <path
              d="M42 30L33.5 24L42 18V30ZM32 18V30H30V18H32Z"
              fill="#AA00FF"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={(event: React.MouseEvent<HTMLElement>) =>
            handlePaginationButtons("next")
          }
        >
          <svg
            width="74"
            height="48"
            viewBox="0 0 74 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="72"
              height="46"
              rx="7"
              stroke="#AA00FF"
              strokeWidth="2"
            />
            <path
              d="M32 30L40.5 24L32 18V30ZM42 18V30H44V18H42Z"
              fill="#AA00FF"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ExercisesPagination;
