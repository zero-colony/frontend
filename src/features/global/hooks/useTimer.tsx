import { useEffect, useState } from 'react';

const useTimer = ({
  initialHours = 0,
  initialMinute = 0,
  initialSeconds = 0,
  successCallback = () => {},
  isStarted = false,
  withHours = false,
  isRepetative = false
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (isStarted) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              if (isRepetative) {
                setHours(initialHours);
                setMinutes(initialMinute);
                setSeconds(initialSeconds);
                return;
              }
              clearInterval(myInterval);
              successCallback();
            } else {
              setHours(hours - 1);
              setMinutes(59);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      return () => {
        clearInterval(myInterval);
      };
    }
  });
  if (withHours)
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds < 10 ? `0${seconds}` : seconds}`;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default useTimer;
