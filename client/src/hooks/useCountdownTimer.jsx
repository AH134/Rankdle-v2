import { useState, useEffect } from "react";

const useCountdownTimer = () => {
  const [countdown, setCountdown] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const resetTime = new Date();
      resetTime.setHours(24, 0, 0, 0);
      let remainingTime = resetTime - currentTime;

      // resets timer back to 24:00:00
      if (remainingTime < 0) {
        resetTime.setDate(resetTime.getDate() + 1);
        remainingTime = resetTime - currentTime;
      }

      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setCountdown({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return countdown;
};

export default useCountdownTimer;
