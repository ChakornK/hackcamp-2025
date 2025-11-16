chrome.scripting.registerContentScripts([
  {
    id: "instagram-blocker",
    matches: ["https://*.instagram.com/*"],
    js: ["blockers/instagram.js"],
    runAt: "document_start",
    world: "MAIN",
    allFrames: true,
  },
  {
    id: "youtube-blocker",
    matches: ["https://*.youtube.com/*"],
    js: ["blockers/youtube.js"],
    runAt: "document_start",
    world: "MAIN",
    allFrames: true,
  },
  {
    id: "reddit-blocker",
    matches: ["https://*.reddit.com/*"],
    js: ["blockers/reddit.js"],
    runAt: "document_start",
    world: "MAIN",
    allFrames: true,
  },
]);
