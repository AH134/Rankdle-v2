import styles from "./Timer.module.css";
import useCountdowntimer from "../../hooks/useCountdownTimer";
import formatTime from "../../utils/formatTime";

const Timer = () => {
  const countdown = useCountdowntimer();

  return (
    <div className={styles.timerContainer}>
      <span>{formatTime(countdown.hours)}</span>:
      <span>{formatTime(countdown.minutes)}</span>:
      <span>{formatTime(countdown.seconds)}</span>
      <span> UTC</span>
    </div>
  );
};

export default Timer;
