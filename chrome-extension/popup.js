const timerCircle = document.getElementById("timer-circle");
const timerText = document.getElementById("timer-text");

let progress = 0;
let progressSeconds = 0;
const totalDuration = 25 * 60 * 1000; // 25 minutes
const updateInterval = 1000; // Update every 1s

let startTimestamp = 0;
let timeOffset = 0;

let timerInterval;
function updateTimer() {
  progressSeconds = Math.floor((Date.now() - startTimestamp + timeOffset) / 1000);
  progress = ((Date.now() - startTimestamp + timeOffset) / totalDuration) * 100;
  if (progress > 100) progress = 100;

  timerCircle.style.strokeDasharray = `${progress} ${100 - progress}`;
  timerText.textContent = `${Math.floor(progressSeconds / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((progressSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${((progressSeconds % 3600) % 60).toString().padStart(2, "0")}`;

  if (progress < 100) {
    timerInterval = setTimeout(updateTimer, updateInterval);
  }
}

// Initialize strokeDasharray
timerCircle.style.strokeDasharray = `0 100`;

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");

let running = false;
startButton.addEventListener("click", () => {
  clearTimeout(timerInterval);
  if (running) {
    startButton.innerText = "Start";
    timeOffset += Date.now() - startTimestamp;
    running = false;
    return;
  }
  startTimestamp = Date.now();
  startButton.innerText = "Pause";
  running = true;
  updateTimer();
});

stopButton.addEventListener("click", () => {
  clearTimeout(timerInterval);
  progress = 0;
  progressSeconds = 0;
  startTimestamp = 0;
  timeOffset = 0;
  running = false;
  startButton.innerText = "Start";
  timerCircle.style.strokeDasharray = `0 100`;
  timerText.textContent = "00:00:00";
});
