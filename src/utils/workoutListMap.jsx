import styles from "./workoutListMap.module.css";

export const workoutListMap = (workouts) => {
  return workouts.map((workout) => {
    return (
      <div key={workout.title} className={styles.wrapper}>
        <span className={styles.head}>{workout.title}</span>
        {workout.exercises.map((exercies) => {
          return (
            <div key={exercies.id} className={styles.exercies_item}>
              <img src={exercies.photo} alt="preview" width={"64px"}></img>{" "}
              <div>
                <span className={styles.title}>
                  {exercies.title}{" "}
                  {exercies.isPassed ? (
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 57 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.5 34.2046L5.29501 20.9996L0.79834 25.4646L18.5 43.1663L56.5 5.16629L52.035 0.701294L18.5 34.2046Z"
                        fill="#1DE9B6"
                      />
                    </svg>
                  ) : null}
                </span>{" "}
                <span className={styles.duration}>{exercies.duration} sec</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  });
};
