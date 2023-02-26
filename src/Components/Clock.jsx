import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [timerId, setTimerId] = useState(null);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
      clearInterval(timerId);
      setAnimation(false);
    }
  }, [time, timerId]);

  const startTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    setTimerId(
      setInterval(() => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
          clearInterval(timerId);
          setAnimation(false);
        } else {
          setTime((prevTime) => {
            let { hours, minutes, seconds } = prevTime;
            if (minutes === 0 && seconds === 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else if (seconds === 0) {
              minutes--;
              seconds = 59;
            } else {
              seconds--;
            }
            return { hours, minutes, seconds };
          });
          setAnimation(true);
        }
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    setAnimation(false);
  };

  const resetTimer = () => {
    clearInterval(timerId);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setTimerId(null);
    setAnimation(false);
    document.getElementById("hour-input").value = "";
    document.getElementById("min-input").value = "";
    document.getElementById("second-input").value = "";
  };

  const handleHourChange = (event) => {
    const hours = parseInt(event.target.value);
    setTime((prevTime) => {
      return { ...prevTime, hours };
    });
  };

  const handleMinuteChange = (event) => {
    const minutes = parseInt(event.target.value);
    setTime((prevTime) => {
      return { ...prevTime, minutes };
    });
  };

  const handleSecondChange = (event) => {
    const seconds = parseInt(event.target.value);
    setTime((prevTime) => {
      return { ...prevTime, seconds };
    });
  };

  const formatTime = (timeObj) => {
    const { hours, minutes, seconds } = timeObj;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const timer =
    time.hours === 0 && time.minutes < 5 ? "text-rose-600" : "text-stone-900";

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-12">
      <h2 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        Count Down
      </h2>
      <div className="flex gap-2 border shadow-md shadow-rose-300 text-rose-500 px-2">
        <label className="">
          Hours:
          <input
            id="hour-input"
            type="number"
            min="00"
            max="99"
            placeholder="00"
            onChange={handleHourChange}
            className="w-12 pl-2 cursor-pointer"
          />
        </label>
        <label>
          Minutes:
          <input
            id="min-input"
            type="number"
            min="00"
            max="60"
            placeholder="00"
            onChange={handleMinuteChange}
            className="w-12 pl-2 cursor-pointer"
          />
        </label>
        <label>
          Seconds:
          <input
            id="second-input"
            type="number"
            min="00"
            max="60"
            placeholder="00"
            onChange={handleSecondChange}
            className="w-12 pl-2 cursor-pointer"
          />
        </label>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 border rounded-full shadow-md shadow-orange-500 px-8 py-28">
        <p
          className={
            animation
              ? `font-bold text-7xl animate-bounce  ${timer}`
              : `font-bold text-7xl `
          }
        >
          {formatTime(time)}
        </p>
        <div className="flex gap-2 ">
          {time.hours === 0 && time.minutes === 0 && time.seconds === 0 ? (
            <button
              disabled
              className="bg-purple-300 p-2 rounded-md font-semibold"
            >
              Start
            </button>
          ) : timerId ? (
            <button
              onClick={stopTimer}
              className="bg-red-400 p-2 rounded-md font-semibold cursor-pointer"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={startTimer}
              className="bg-orange-300 p-2 rounded-md font-semibold cursor-pointer"
            >
              Start
            </button>
          )}
          <button
            onClick={resetTimer}
            className="bg-violet-400 p-2 rounded-md font-semibold cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
