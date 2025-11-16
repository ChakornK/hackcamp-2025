let inter = setInterval(() => {
  if (document.body) {
    clearInterval(inter);
  } else {
    return;
  }
  let customStyles = `video {
    display: none !important;
  }`;
  if (!location.href.includes("music.youtube.com")) {
    customStyles += `
    img {
      display: none !important;
    }
    h1,h2,h3,h4,h5,h6,span,p,a,button {
      filter: blur(4px) !important;
      pointer-events: none !important;
    }`;
  }
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);
  styleElement.textContent = customStyles;
}, 50);
