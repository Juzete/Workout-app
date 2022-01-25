import React, { useEffect, useState } from "react";
import CircleProgressBar from "./ProgressBar/CircleProgressBar";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "./CircleTimer.css";

interface ListProps {
  completed: boolean;
  seconds: number;
  color: string;
  isComplete: (condition: boolean) => boolean;
  isPassed: (condition: boolean) => boolean;
  currentSeconds?: (seconds: number) => number;
}

const CircleTimer = (props: ListProps) => {
  const { currentExercises, isPaused, exercisesToView } = useTypedSelector(
    (state) => state.workout
  );
  const { setCurrentDuration } = useActions();

  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(props.seconds);

  let stopper = 0;
  const timerIncrement = props.seconds;

  useEffect(() => {
    if (!isPaused) setSeconds(props.seconds);
    if (isPaused && !props.completed) setSeconds(props.seconds);
    if (!props.completed && props.seconds === 5) {
      setProgress(0);
    }
    if (isPaused) setCurrentDuration(seconds);
  }, [props.seconds, exercisesToView, isPaused]);

  useEffect(() => {
    if (props.completed) setCurrentDuration(exercisesToView.duration);
  }, [props.completed]);

  useEffect(() => {
    if (seconds === props.seconds && !isPaused) setProgress(0);
    const progressInterval = setInterval(() => {
      if (stopper < 99.9) {
        if (!isPaused) {
          setProgress((progress) => progress + 0.1);
          setSeconds((seconds) => seconds - timerIncrement / 1000);
          stopper += 0.1;
        }
      }
      if (stopper >= 99.9) {
        props.isComplete(true);
        if (props.seconds === 5) {
          props.isPassed(false);
        } else {
          props.isPassed(true);
          props.isComplete(false);
          setProgress(0);
        }
      }
    }, props.seconds);
    if (isPaused) {
      setCurrentDuration(seconds);
    }
    return () => {
      clearInterval(progressInterval);
    };
  }, [props.seconds, currentExercises, isPaused]);
  //115 inline style
  return (
    <div className="timer_wrapper">
      <CircleProgressBar
        width="120"
        height="120"
        stroke={props.color}
        strokeWidth="7"
        cx="60"
        cy="60"
        r="52"
        progress={progress}
      />
      <span className="timer_styles" style={{ color: props.color }}>
        {Math.floor(seconds) + 1}
      </span>
    </div>
  );
};

export default CircleTimer;
