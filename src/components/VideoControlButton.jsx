import styles from "./VideoControlButton.module.css";

const VideoControlButton = ({ condition }) => {
  return (
    <div className={styles.button_wrapper}>
      {condition === "pause" ? (
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.0002 0.333252C12.2802 0.333252 0.333496 12.2799 0.333496 26.9999C0.333496 41.7199 12.2802 53.6666 27.0002 53.6666C41.7202 53.6666 53.6668 41.7199 53.6668 26.9999C53.6668 12.2799 41.7202 0.333252 27.0002 0.333252ZM24.3335 37.6666H19.0002V16.3333H24.3335V37.6666ZM35.0002 37.6666H29.6668V16.3333H35.0002V37.6666Z"
            fill="#AA00FF"
          />
        </svg>
      ) : (
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.0002 0.333252C12.2802 0.333252 0.333496 12.2799 0.333496 26.9999C0.333496 41.7199 12.2802 53.6666 27.0002 53.6666C41.7202 53.6666 53.6668 41.7199 53.6668 26.9999C53.6668 12.2799 41.7202 0.333252 27.0002 0.333252ZM21.6668 38.9999V14.9999L37.6668 26.9999L21.6668 38.9999Z"
            fill="#AA00FF"
          />
        </svg>
      )}
    </div>
  );
};

export default VideoControlButton;
