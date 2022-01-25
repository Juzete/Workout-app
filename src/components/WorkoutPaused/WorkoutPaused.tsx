import { Link } from "react-router-dom";
import "./WorkoutPaused.css";

const WorkoutPaused = () => {
  return (
    <div className={"pause_wrapper"}>
      <div>
        <span> Workout paused </span>
        <span>Press “Play button” or “Space bar” to continue </span>
      </div>

      <Link to={"/"} className={"leave_button"}>
        Leave workout
      </Link>
    </div>
  );
};

export default WorkoutPaused;
