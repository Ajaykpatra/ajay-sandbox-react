import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null); // to store interval ID

  // Start the timer
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  // Pause the timer
  const pause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Reset the timer
  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem", fontFamily: "sans-serif" }}>
      <h1>React Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={start} disabled={isRunning}>Start</button>{" "}
        <button onClick={pause} disabled={!isRunning}>Pause</button>{" "}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
