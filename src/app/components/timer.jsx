"use client"

import React, { useState, useEffect, useRef } from 'react';
import './timer.css';

export default function Timer() {
  const [progress, setProgress] = useState(0);
  const [progressSeconds, setProgressSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const startTimestampRef = useRef(0);
  const timeOffsetRef = useRef(0);
  const timerIntervalRef = useRef(null);

  const totalDuration = 25 * 60 * 1000; // 25 minutes
  const updateInterval = 1000; // Update every 1s

  const updateTimer = () => {
    const elapsed = Date.now() - startTimestampRef.current + timeOffsetRef.current;
    const newProgressSeconds = Math.floor(elapsed / 1000);
    const newProgress = (elapsed / totalDuration) * 100;

    setProgressSeconds(newProgressSeconds);
    setProgress(newProgress);

    if (newProgress < 100) {
      timerIntervalRef.current = setTimeout(updateTimer, updateInterval);
    } else {
      // Timer completed
      resetTimer();
    }
  };

  const resetTimer = () => {
    if (timerIntervalRef.current) {
      clearTimeout(timerIntervalRef.current);
    }
    setProgress(0);
    setProgressSeconds(0);
    startTimestampRef.current = 0;
    timeOffsetRef.current = 0;
    setRunning(false);
  };

  const handleStart = () => {
    if (timerIntervalRef.current) {
      clearTimeout(timerIntervalRef.current);
    }
    startTimestampRef.current = Date.now();
    setRunning(true);
    updateTimer();
  };

  const handlePause = () => {
    if (timerIntervalRef.current) {
      clearTimeout(timerIntervalRef.current);
    }
    timeOffsetRef.current += Date.now() - startTimestampRef.current;
    setRunning(false);
  };

  const handleStopClick = () => {
    setShowModal(true);
  };

  const handleCancelStop = () => {
    setShowModal(false);
  };

  const handleConfirmStop = () => {
    setShowModal(false);
    resetTimer();
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearTimeout(timerIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = ((seconds % 3600) % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="timer-component">
      <div className="bg-lightgrey-50 shadow-md hover:shadow-xl p-8 border-2 border-lightgrey-50 rounded-3xl transition-shadow">
        <div className="timer-circle-container">
          <svg viewBox="15 15 70 70" width="250">
            <circle 
              stroke="#e0e0e0" 
              strokeWidth="5.5" 
              cx="50" 
              cy="50" 
              r="25" 
              fill="none" 
            />
            <circle
              transform="rotate(-90 50 50)"
              strokeLinecap="round"
              stroke="#4989ea"
              strokeWidth="5.5"
              cx="50"
              cy="50"
              r="25"
              fill="none"
              pathLength="100"
              style={{
                strokeDasharray: `${progress} ${100 - progress}`,
                transition: 'stroke-dasharray 1s linear'
              }}
            />
            <text 
              fontSize="9" 
              x="50" 
              y="50" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="#333"
            >
              {formatTime(progressSeconds)}
            </text>
          </svg>
        </div>

        {!running ? (
          <div className="timer-action-buttons">
            <button className="timer-button blue" onClick={handleStart}>
              Start
            </button>
          </div>
        ) : (
          <div className="timer-action-buttons">
            <button className="timer-button blue" onClick={handlePause}>
              Pause
            </button>
            <button className="timer-button gray" onClick={handleStopClick}>
              Stop
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div 
          className="timer-modal-bg show"
          onClick={handleCancelStop}
        >
          <div 
            className="timer-modal-box show"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Stopping the timer will record your current progress.</p>
            <div className="timer-action-buttons">
              <button className="timer-button gray" onClick={handleCancelStop}>
                Cancel
              </button>
              <button className="timer-button blue" onClick={handleConfirmStop}>
                Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}