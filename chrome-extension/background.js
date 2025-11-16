let registered = false;

const register = () => {
  if (registered) return;
  registered = true;
  chrome.scripting.registerContentScripts([
    {
      id: "instagram-blocker" + Date.now(),
      matches: ["https://*.instagram.com/*"],
      js: ["blockers/instagram.js"],
      runAt: "document_start",
      world: "MAIN",
      allFrames: true,
    },
    {
      id: "youtube-blocker" + Date.now(),
      matches: ["https://*.youtube.com/*"],
      js: ["blockers/youtube.js"],
      runAt: "document_start",
      world: "MAIN",
      allFrames: true,
    },
    {
      id: "reddit-blocker" + Date.now(),
      matches: ["https://*.reddit.com/*"],
      js: ["blockers/reddit.js"],
      runAt: "document_start",
      world: "MAIN",
      allFrames: true,
    },
  ]);
};

const unregister = async () => {
  if (!registered) return;
  registered = false;
  const scripts = await chrome.scripting.getRegisteredContentScripts();
  const scriptIds = scripts.map((script) => script.id);
  chrome.scripting.unregisterContentScripts({ ids: scriptIds });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "register") {
    register();
    console.log("Registered");
  } else if (request.action === "unregister") {
    unregister();
    console.log("Unregistered");
  }
});
