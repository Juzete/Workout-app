import CircleProgressBar from "./CircleTimer/ProgressBar/CircleProgressBar";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="wrapper">
      <CircleProgressBar
        width="120"
        height="120"
        stroke={"black"}
        strokeWidth="6"
        cx="60"
        cy="60"
        r="52"
        progress={50}
      />
    </div>
  );
};

export default Loader;
