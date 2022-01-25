import { Link } from "react-router-dom";
import styles from "./WorkoutPaused.module.css";

const WorkoutPaused = () => {
  return (
    <div className={styles.pause_wrapper}>
      <div>
        <span> Workout paused </span>
        <span>Press “Play button” or “Space bar” to continue </span>
      </div>

      <Link to={"/"} className={styles.leave_button}>
        Leave workout
      </Link>
    </div>
  );
};

export default WorkoutPaused;
