let inter = setInterval(() => {
  if (document.body) {
    clearInterval(inter);
  } else {
    return;
  }

  const customStyles = `video, img, shreddit-player-2, shreddit-ad-post, devvit-post, shreddit-aspect-ratio {
    display: none !important;
  }
  div {
    filter: blur(4px) !important;
    pointer-events: none !important;
  }`;
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  styleElement.textContent = customStyles;
}, 50);
