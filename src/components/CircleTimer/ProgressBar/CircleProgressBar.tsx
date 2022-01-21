import CSS from "csstype";

interface ListProps {
  width: string;
  height: string;
  stroke: string;
  strokeWidth: string;
  cx: string;
  cy: string;
  r: string;
  progress: number;
}

const CircleProgressBar = (props: ListProps) => {
  const progress_ring_circle: CSS.Properties = {
    transformOrigin: "center",
    transform: "rotate(-90deg)",
    transition: "stroke-dashoffset 0.1s",
  };

  const radius = +props.r;
  const circumference = 2 * Math.PI * radius;

  progress_ring_circle.strokeDasharray = `${circumference.toString()} ${circumference.toString()}`;
  progress_ring_circle.strokeDashoffset = circumference.toString();

  const setProgress = (percent: number) => {
    const offset = circumference - (percent / 100) * circumference;
    progress_ring_circle.strokeDashoffset = offset.toString();
  };

  setProgress(props.progress);

  return (
    <svg className="progress_ring" width={props.width} height={props.height}>
      <circle
        stroke={"#EEEEEE"}
        strokeWidth={props.strokeWidth}
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        fill="transparent"
      />
      <circle
        style={progress_ring_circle}
        stroke={props.stroke}
        strokeWidth={props.strokeWidth}
        cx={props.cx}
        cy={props.cy}
        r={props.r}
        fill="transparent"
      />
    </svg>
  );
};

export default CircleProgressBar;
