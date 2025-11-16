const backendURL = "http://localhost:3000";
let progress = 0;
let progressSeconds = 0;
const totalDuration = 0.25 * 60 * 1000; // 25 minutes
const updateInterval = 1000; // Update every 1s
let startTimestamp = 0;
let timeOffset = 0;
let timerInterval;
let running = false;

const timerCircle = document.getElementById("timer-circle");
const timerText = document.getElementById("timer-text");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const notRunningButtons = document.getElementById("not-running-buttons");
const runningButtons = document.getElementById("running-buttons");
const cancelStopButton = document.getElementById("cancel-stop-button");
const confirmStopButton = document.getElementById("confirm-stop-button");
const stopModalBg = document.getElementById("stop-modal-bg");
const stopModalBox = document.getElementById("stop-modal-box");

function updateButtonVisibility() {
  if (running) {
    notRunningButtons.classList.add("hidden");
    runningButtons.classList.remove("hidden");
  } else {
    notRunningButtons.classList.remove("hidden");
    runningButtons.classList.add("hidden");
  }
}

function resetTimer(timerInterval) {
  fetch(`${backendURL}/api/logging/endTime`, {
    method: "POST",
    body: JSON.stringify({ timestamp: Date.now(), token: "test" }),
  });
  clearTimeout(timerInterval);
  progress = 0;
  progressSeconds = 0;
  startTimestamp = 0;
  timeOffset = 0;
  running = false;
  updateButtonVisibility();
  timerCircle.style.strokeDasharray = `0 100`;
  timerText.textContent = "00:00:00";
}

function startPomodoro() {
  //!!!
}

function updateTimer() {
  if (progress == 0) {
    fetch(`${backendURL}/api/logging/startTime`, {
      method: "POST",
      body: JSON.stringify({ timestamp: Date.now(), token: "test" }),
    });
  }
  progressSeconds = Math.floor((Date.now() - startTimestamp + timeOffset) / 1000);
  progress = ((Date.now() - startTimestamp + timeOffset) / totalDuration) * 100;

  timerCircle.style.strokeDasharray = `${progress} ${100 - progress}`;
  timerText.textContent = `${Math.floor(progressSeconds / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((progressSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${((progressSeconds % 3600) % 60).toString().padStart(2, "0")}`;

  if (progress < 100) {
    timerInterval = setTimeout(updateTimer, updateInterval);
  }

  if (progress >= 100) {
    resetTimer(timerInterval);
  }
}

// Initialize strokeDasharray
timerCircle.style.strokeDasharray = `0 100`;

const showModal = () => {
  stopModalBg.style.opacity = "1";
  stopModalBg.style.pointerEvents = "auto";
  stopModalBox.style.transform = "scale(1)";
};
const hideModal = () => {
  stopModalBg.style.opacity = "0";
  stopModalBg.style.pointerEvents = "none";
  stopModalBox.style.transform = "scale(0.8)";
};

cancelStopButton.addEventListener("click", () => {
  hideModal();
});
confirmStopButton.addEventListener("click", () => {
  hideModal();
  resetTimer(timerInterval);
});

startButton.addEventListener("click", () => {
  clearTimeout(timerInterval);
  startTimestamp = Date.now();
  running = true;
  updateButtonVisibility();
  updateTimer();
});

pauseButton.addEventListener("click", () => {
  clearTimeout(timerInterval);
  timeOffset += Date.now() - startTimestamp;
  running = false;
  updateButtonVisibility();
});

stopButton.addEventListener("click", () => {
  showModal();
});

updateButtonVisibility();
