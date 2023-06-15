import useCountdowntimer from "../hooks/useCountdownTimer";
import formatTime from "../utils/formatTime";

const Timer = () => {
  const countdown = useCountdowntimer();

  return (
    <>
      <span>{formatTime(countdown.hours)}</span>:
      <span>{formatTime(countdown.minutes)}</span>:
      <span>{formatTime(countdown.seconds)}</span>
    </>
  );
};

export default Timer;
