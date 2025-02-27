import React, { useState, useEffect } from 'react';
import "./navbar.css";
import logo from "../../assets/logo.png";
import flag from "../../assets/indianflag.png";
import teamicon from "../../assets/team.jpeg";
import missiontimeicon from "../../assets/missiontime.jpeg";
import missionstatusicon from "../../assets/missionstatus.jpeg";
import restartmissiontime from "../../assets/restartmissiontime.png";
import startmissiontime from "../../assets/startmissiontime.png";
import stopmissiontime from "../../assets/stopmissiontime.png";

const Navbar = () => {
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (num) => num.toString().padStart(2, '0');

  // Mission Timer State
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setElapsedTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleRestart = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  return (
    <div className="navbar">
      <div className="centerinfo">
        <div className="logo">
          <a href="/"  rel="noopener noreferrer">
            <img className="spriha" src={logo} alt="spriha logo" />
          </a>
        </div>
        <div className="teaminfo">
          <div className="rectangle">
            <div className="teamId">
              <a href="https://team.example.com" target="_blank" rel="noopener noreferrer">
                <img src={teamicon} alt="team icon" className="teamicon" />
              </a>
              <h1 className="teamid"># 010</h1>
            </div>
            <div className="missiontime">
              <a href="https://missiontime.example.com" target="_blank" rel="noopener noreferrer">
                <img src={missiontimeicon} alt="mission time icon" className="missiontimeicon" />
              </a>
              <h1 className="teammissiontime">{formatTime(elapsedTime)}</h1>
            </div>
            <div className="missionstatus">
              <a href="https://missionstatus.example.com" target="_blank" rel="noopener noreferrer">
                <img src={missionstatusicon} alt="mission status icon" className="missionstatusicon" />
              </a>
              <h1 className="teammissionstatus">Landed</h1>
            </div>
            <div className="icons">
              <div className="missiontimebuttons" style={{ display: 'flex', gap: '10px' }}>
                <button className="restartbutton" onClick={handleRestart}>
                  <a href="https://restart.example.com" target="_blank" rel="noopener noreferrer">
                    <img src={restartmissiontime} alt="Restart Mission Time" className="restart" />
                  </a>
                </button>
                <button className="startbutton" onClick={handleStart}>
                  <a href="https://start.example.com" target="_blank" rel="noopener noreferrer">
                    <img src={startmissiontime} alt="Start Mission Time" className="start" />
                  </a>
                </button>
                <button className="stopbutton" onClick={handleStop}>
                  <a href="https://stop.example.com" target="_blank" rel="noopener noreferrer">
                    <img src={stopmissiontime} alt="Stop Mission Time" className="stop" />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="icons">
          <div className="flag">
            <a href="https://flag.example.com" target="_blank" rel="noopener noreferrer">
              <img src={flag} alt="Indian Flag" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
