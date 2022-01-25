import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { handleMinutes } from "../../utils/completePageMinutesHandler";
import "./WorkoutCompletePage.css";

const WorkoutCompletePage = () => {
  const { exercises } = useTypedSelector((state) => state.workout);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    handleMinutes(exercises, setMinutes);
  }, []);

  return (
    <div className={"WorkoutCompletePage__page_wrapper"}>
      <svg
        width="57"
        height="44"
        viewBox="0 0 57 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.5 34.2046L5.29501 20.9996L0.79834 25.4646L18.5 43.1663L56.5 5.16629L52.035 0.701294L18.5 34.2046Z"
          fill="#1DE9B6"
        />
      </svg>

      <span className={"header"}>Workout completed!</span>
      <span className={"grey_text"}>
        Nice job. You’re done. Here’s the workout summary.
      </span>
      <div>
        <span>Minutes</span>
        <span>{minutes}</span>
      </div>
      <div>
        <Link to={"/"} className={"save_button"}>
          Save & Continue
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCompletePage;
