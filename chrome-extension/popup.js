const backendURL = "http://localhost:3000";
let progress = 0;
let progressSeconds = 0;
let totalDuration = 0; // 25 minutes
const updateInterval = 1000; // Update every 1s
let startTimestamp = 0;
let timeOffset = 0;
let timerInterval;
let running = false;

const timePresets = [25 * 60, 67];
let currentPreset = 0;
totalDuration = timePresets[0] * 1000;

let token = "";

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

const loginModalBg = document.getElementById("login-modal-bg");
const loginModalBox = document.getElementById("login-modal-box");
const loginButton = document.getElementById("login-button");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

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
    body: JSON.stringify({ timestamp: Date.now(), token }),
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
  currentPreset = (currentPreset + 1) % timePresets.length;
  startTimestamp = Date.now();
  timeOffset = 0;
  running = true;
  totalDuration = timePresets[currentPreset] * 60 * 1000;
  updateButtonVisibility();
  updateTimer();
}

function updateTimer() {
  if (progress == 0) {
    fetch(`${backendURL}/api/logging/startTime`, {
      method: "POST",
      body: JSON.stringify({ timestamp: Date.now(), token }),
    });
  }
  progressSeconds = Math.floor((Date.now() - startTimestamp + timeOffset) / 1000);
  const newProgress = ((Date.now() - startTimestamp + timeOffset) / totalDuration) * 100;
  if (progress == 0 && newProgress > 0) {
    if (currentPreset == 0) {
      chrome.runtime.sendMessage({ action: "register" });
    } else {
      chrome.runtime.sendMessage({ action: "unregister" });
    }
  }
  progress = newProgress;

  timerCircle.style.strokeDasharray = `${progress} ${100 - progress}`;
  timerText.textContent = `${Math.floor(progressSeconds / 3600)
    .toString()
    .padStart(2, "0")}:${Math.floor((progressSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0")}:${((progressSeconds % 3600) % 60).toString().padStart(2, "0")}`;

  if (progress < 100) {
    timerInterval = setTimeout(updateTimer, updateInterval);
    return;
  }
  if (progress >= 100) {
    resetTimer(timerInterval);
    startPomodoro();
  }
}

// Initialize strokeDasharray
timerCircle.style.strokeDasharray = `0 100`;

const showStopModal = () => {
  stopModalBg.style.opacity = "1";
  stopModalBg.style.pointerEvents = "auto";
  stopModalBox.style.transform = "scale(1)";
};
const hideStopModal = () => {
  stopModalBg.style.opacity = "0";
  stopModalBg.style.pointerEvents = "none";
  stopModalBox.style.transform = "scale(0.8)";
};

const showLoginModal = () => {
  loginModalBg.style.opacity = "1";
  loginModalBg.style.pointerEvents = "auto";
  loginModalBox.style.transform = "scale(1)";
};
const hideLoginModal = () => {
  loginModalBg.style.opacity = "0";
  loginModalBg.style.pointerEvents = "none";
  loginModalBox.style.transform = "scale(0.8)";
};

cancelStopButton.addEventListener("click", () => {
  hideStopModal();
});
confirmStopButton.addEventListener("click", () => {
  hideStopModal();
  resetTimer(timerInterval);
  chrome.runtime.sendMessage({ action: "unregister" });
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
  showStopModal();
});

updateButtonVisibility();

chrome.storage.local.get(["token"], (result) => {
  if (!result.token) {
    return showLoginModal();
  }
  fetch(`${backendURL}/api/auth/validateToken`, {
    method: "POST",
    body: JSON.stringify({ token: result.token }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.valid) {
        showLoginModal();
      } else {
        token = result.token;
      }
    });
});
loginButton.addEventListener("click", () => {
  const username = loginUsername.value;
  const password = loginPassword.value;

  if (!username || !password) {
    return alert("Please enter both username and password.");
  }
  fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        token = data.token;
        chrome.storage.local.set({ token: data.token }, () => {
          hideLoginModal();
        });
      } else {
        alert("Invalid username or password.");
      }
    });
});
