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

const cancelStopButton = document.getElementById("cancel-stop-button");
const confirmStopButton = document.getElementById("confirm-stop-button");
const modalBg = document.querySelector(".modal-bg");
const modalBox = document.querySelector(".modal-box");

const showModal = () => {
  modalBg.style.opacity = "1";
  modalBg.style.pointerEvents = "auto";
  modalBox.style.transform = "scale(1)";
};
const hideModal = () => {
  modalBg.style.opacity = "0";
  modalBg.style.pointerEvents = "none";
  modalBox.style.transform = "scale(0.8)";
};

cancelStopButton.addEventListener("click", () => {
  hideModal();
});
confirmStopButton.addEventListener("click", () => {
  hideModal();
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
  showModal();
});
