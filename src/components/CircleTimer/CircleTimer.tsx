import React, { useEffect, useState } from "react";
import CSS from "csstype";
import CircleProgressBar from "./ProgressBar/CircleProgressBar";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ListProps {
  seconds: number;
  color: string;
  isComplete: (condition: boolean) => boolean;
  isPassed: (condition: boolean) => boolean;
  currentSeconds: (seconds: number) => number;
  isPaused?: boolean;
}

const CircleTimer = (props: ListProps) => {
  const { currentExercises } = useTypedSelector((state) => state.workout);
  const timer_styles: CSS.Properties = {
    width: "120px",
    display: "flex",
    position: "relative",
    zIndex: "10",
    top: "-95px",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s",
  };

  const wrapper: CSS.Properties = {
    height: "120px",
  };

  const font_face = `
      @font-face {
          font-family: "SF Pro Text Normal";
          src: local("SF Pro Text Normal"),
            url(../assets/fonts/SF-Pro-Display-Light.otf) format("opentype");
        }
      
      .timer_digits {
          font-family: SF Pro Text Normal;
          font-style: normal;
          font-weight: 600;
          font-size: 40px;
          line-height: 56px;
          color: ${props.color};
      }
      `;

  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(props.seconds);
  let stoper = 0;
  const timerIncrement = props.seconds;

  useEffect(() => {
    if (!props.isPaused) setSeconds(props.seconds);
    const progressInterval = setInterval(() => {
      if (stoper < 99.9) {
        if (props.isPaused !== true) {
          setProgress((progress) => progress + 0.1);
          setSeconds((seconds) => seconds - timerIncrement / 1000);
          stoper += 0.1;
        }
      }
      if (stoper >= 99.9) {
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
    if (props.isPaused) {
      props.currentSeconds(seconds);
    }
    return () => {
      clearInterval(progressInterval);
    };
  }, [props, currentExercises]);

  return (
    <div style={wrapper}>
      <style>{font_face}</style>
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
      <span style={timer_styles} className="timer_digits">
        {Math.floor(seconds) + 1}
      </span>
    </div>
  );
};

export default CircleTimer;
