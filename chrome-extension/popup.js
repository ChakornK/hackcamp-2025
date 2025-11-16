const timerCircle = document.getElementById("timer-circle");
const timerText = document.getElementById("timer-text");

let progress = 0;
let progressSeconds = 0;
const totalDuration = 25 * 60 * 1000; // 25 minutes
const updateInterval = 1000; // Update every 1s

function updateTimer() {
  progress += (updateInterval / totalDuration) * 100;
  progressSeconds += updateInterval / 1000;
  if (progress > 100) progress = 100;

  timerCircle.style.strokeDasharray = `${progress} ${100 - progress}`;
  timerText.textContent = `${Math.floor(progressSeconds / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((progressSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${((progressSeconds % 3600) % 60).toString().padStart(2, "0")}`;

  if (progress < 100) {
    setTimeout(updateTimer, updateInterval);
  }
}

// Initialize strokeDasharray
timerCircle.style.strokeDasharray = `0 100`;

// Start the timer
updateTimer();
