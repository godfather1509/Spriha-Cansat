import React, { useState, useEffect } from 'react';
import "./navbar.css";
import logo from "/src/assets/sprihalogopng.png";
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
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

  useEffect(() => {
    const fetchGPSData = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toFixed(6));
            setLongitude(position.coords.longitude.toFixed(6));
          },
          (error) => console.error("Error getting location:", error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    };

    const interval = setInterval(fetchGPSData, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="navbar">
      <div className="centerinfo">
        <div className="logo">
          <a href="/" rel="noopener noreferrer">
            <img className="spriha" src={logo} alt="spriha logo" />
          </a>
        </div>
        <div className="teaminfo">
          <div className="rectangle">
            <div className="teamId">
              <img src={teamicon} alt="team icon" className="teamicon" />
              <h1 className="teamid"># 010</h1>
            </div>
            <div className="missiontime">
              <img src={missiontimeicon} alt="mission time icon" className="missiontimeicon" />
              <h1 className="teammissiontime">{formatTime(elapsedTime)}</h1>
            </div>
            <div className="missionstatus">
              <img src={missionstatusicon} alt="mission status icon" className="missionstatusicon" />
              <h1 className="teammissionstatus">Landed</h1>
            </div>
            <div className="icons">
              <div className="missiontimebuttons" style={{ display: 'flex', gap: '10px' }}>
                <button className="restartbutton" onClick={handleRestart}>
                  <img src={restartmissiontime} alt="Restart Mission Time" className="restart" />
                </button>
                <button className="startbutton" onClick={handleStart}>
                  <img src={startmissiontime} alt="Start Mission Time" className="start" />
                </button>
                <button className="stopbutton" onClick={handleStop}>
                  <img src={stopmissiontime} alt="Stop Mission Time" className="stop" />
                </button>
              </div>
              <div className='coordinates'>
                <p><span >Latitude:</span> {latitude ?? "Loading..."}</p>
                <p><span >Longitude:</span> {longitude ?? "Loading..."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
