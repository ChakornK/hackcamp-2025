let inter = setInterval(() => {
  if (document.body) {
    clearInterval(inter);
  } else {
    return;
  }

  const customStyles = `video {
    display: none !important;
  }
  img:not([alt*="profile picture"]) {
    display: none !important;
  }
  div[style*='max-width'] :is(h1,h2,h3,h4,h5,h6,span,p,a,button,svg),
  div[style*='max-width'] + div {
    filter: blur(4px) !important;
    pointer-events: none !important;
  }`;
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  const handle = () => {
    if (location.href.includes("instagram.com/direct")) {
      styleElement.textContent = "";
    } else {
      styleElement.textContent = customStyles;
    }
  };

  let lastUrl = location.href;
  new MutationObserver(() => {
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      handle();
    }
  }).observe(document, { subtree: true, childList: true });

  handle();
}, 50);
