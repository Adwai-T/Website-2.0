//Format Html add to all html

//Select Elements
const root = document.documentElement;
const body = document.getElementsByTagName('body')[0];
const container = document.getElementById("container");
const content = document.getElementById("content");
const index = document.getElementById("index");
const indexList = document.getElementById("index-list");

//--- Origin for window messages
const localOrigin = "http://localhost:4200/";//dev
const productionOrigin = "https://adwait.in/";//prod

// --- Add Formate css and highlighter.js
const formatCss = document.createElement("link");
formatCss.rel = "stylesheet";
formatCss.href = "../../css/format.css";
document.head.appendChild(formatCss);

hljs.highlightAll();

// - set initial value to visible
index.style.visibility = "hidden";

const indexToggle = document.createElement("button");
indexToggle.id = "index-toggle";
indexToggle.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/></svg>';
container.appendChild(indexToggle);

const indexUpButton = document.createElement("button");
indexUpButton.id = "indexUp";
indexUpButton.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>';

const indexDownButton = document.createElement("button");
indexDownButton.id = "indexDown";
indexDownButton.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>';

index.appendChild(indexUpButton);
index.appendChild(indexDownButton);

let indexBoundingBox = indexList.getClientRects();

// -- Index visibility
const elementVisibilityToggle = function (element) {
  if (element.style.visibility === "hidden") {
    element.style.visibility = "visible";
  } else {
    element.style.visibility = "hidden";
  }
}
const hideIndex = function () {
  index.style.visibility = "hidden";
}
indexToggle.onclick = function (e) {
  elementVisibilityToggle(index);
};
// -- hide index on click on content or container
content.onclick = function (e) {
  hideIndex();
}

//--- Index Scroll ScrollWheel And Buttons
const indexButtonScrollSpeed = 100; //in px
let indexScrollSpeed = 50;
let indexListTop = 0; //Track total scroll
let indexScrolledPercentage=0;

const checkIfElementHasVerticalScroll = function (element) {
  return element.scrollHeight > element.clientHeight;
}
const checkIfElementHasHorizontalScroll = function (element) {
  return element.scrollWidth > element.clientWidth;
}

const getIndexScrollPercentage = function () {
  indexScrolledPercentage= (indexList.getClientRects()[0].y / root.clientHeight);
  return indexScrolledPercentage;
}

const disableElementScrolling = function (element) {
  element.classList.add('disable-element-scroll-y');
}
const enableElementScrolling = function (element) {
  element.classList.remove('disable-element-scroll-y');
}

const indexScrollUp = function (speed) {
  if(indexList.getClientRects()[0].y < 0) {
    indexListTop += speed;
    indexList.style.top = indexListTop + "px";
    // console.log(getIndexScrollPercentage());
  }
}

const indexScrollDown = function (speed) {
  if (
    indexList.getClientRects()[0].bottom > root.clientHeight
  ) {
    indexListTop -= speed;
    indexList.style.top = indexListTop + "px";
    // console.log(getIndexScrollPercentage());
  }
}

//-- Button Scroll
indexUpButton.onclick = function (e) {
  indexScrollUp(indexButtonScrollSpeed);
};

indexDownButton.onclick = function (e) {
  indexScrollDown(indexButtonScrollSpeed);
};

// -- Wheel Scroll
let isMouseOverIndex = false;

indexList.onmouseover = function (e) {
  disableElementScrolling(body);
  isMouseOverIndex = true;
}
indexList.onmouseleave = function (e) {
  isMouseOverIndex = false;
  enableElementScrolling(body);
}

index.onwheel = function (e) {
  if(isMouseOverIndex && e.deltaY == 100) {
    indexScrollDown(indexScrollSpeed);
  }
  else {
    indexScrollUp(indexScrollSpeed);
  }
}

//-- Add index scrollbar
// const indexScroll = document.createElement("div");
// indexScroll.id = "index-scroll";
// index.appendChild(indexScroll);

// --- Light and Dark Mode Switch ---

const nightSvg = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M11.1,12.08C8.77,7.57,10.6,3.6,11.63,2.01C6.27,2.2,1.98,6.59,1.98,12c0,0.14,0.02,0.28,0.02,0.42 C2.62,12.15,3.29,12,4,12c1.66,0,3.18,0.83,4.1,2.15C9.77,14.63,11,16.17,11,18c0,1.52-0.87,2.83-2.12,3.51 c0.98,0.32,2.03,0.5,3.11,0.5c3.5,0,6.58-1.8,8.37-4.52C18,17.72,13.38,16.52,11.1,12.08z"/></g><path d="M7,16l-0.18,0C6.4,14.84,5.3,14,4,14c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.62,0,2.49,0,3,0c1.1,0,2-0.9,2-2 C9,16.9,8.1,16,7,16z"/></g></g></svg>';
const daySvg = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>';

// - css sheets
const lightThemeCodeCss = document.createElement("link");
lightThemeCodeCss.rel = "stylesheet";
lightThemeCodeCss.href = "../../css/harmonic16-light.min.css";
const darkThemeCodeCss = document.createElement("link");
darkThemeCodeCss.rel = "stylesheet";
darkThemeCodeCss.href = "../../css/harmonic16-dark.min.css";

const themeSwitch = document.createElement("div");
themeSwitch.id = "theme-switch";
container.appendChild(themeSwitch);

const themeSwitchToggle = document.createElement("div");
themeSwitchToggle.id = "theme-switch-toggle";
container.appendChild(themeSwitchToggle);

//Theme mode get set opposite to what is
//set here when on theme change is called later
let themeMode = "dark";
// if(localStorage.getItem('theme') === "dark") {
//   themeMode =  'light';
//   themeSwitchToggle.style.left = 85 + 'px';
// } 

themeSwitch.addEventListener("click", onThemeChange);

function onThemeChange() {
  let boundingRectToggle = themeSwitchToggle.getClientRects();
  let boundingRect = themeSwitch.getClientRects();
  if (themeMode === "light") {
    themeMode = "dark";
    themeSwitchToggle.style.left = boundingRectToggle[0].left + 25 + "px";
    lightThemeCodeCss.remove();
    document.head.appendChild(darkThemeCodeCss);
    applyDarkThemeColors();
    localStorage.setItem('theme', 'dark');
    if(window.location.href.includes('localhost')) {
      window.top.postMessage("iframe-dark-theme", localOrigin);
    } else {
      window.top.postMessage("iframe-dark-theme", productionOrigin);
    }
  } else {
    themeMode = "light";
    themeSwitchToggle.style.left = boundingRectToggle[0].left - 25 + "px";
    darkThemeCodeCss.remove();
    document.head.appendChild(lightThemeCodeCss);
    applyLightThemeColors();
    localStorage.setItem('theme', 'light');
    if(window.location.href.includes('localhost')) {
      window.top.postMessage("iframe-light-theme", localOrigin);
    } else {
      window.top.postMessage("iframe-light-theme", productionOrigin);
    }
  }
}
onThemeChange();
themeSwitchToggle.style.left = 50 + 'px';

function applyLightThemeColors() {
  root.style.setProperty("--color1", "#7284A8");//quotes-bg, samp
  root.style.setProperty("--color2", "#353535"); //foreground
  root.style.setProperty("--color3", "#284b63"); //h1, button
  root.style.setProperty("--color4", "#d9d9d9"); //samp-bg
  root.style.setProperty("--color5", "#ffffff"); //
}


function applyDarkThemeColors() {
  root.style.setProperty("--color1", "#d9d9d9"); //quotes-bg, samp
  root.style.setProperty("--color2", "#f8f8f2"); //Foreground
  root.style.setProperty("--color3", "#ff79c6"); // h1, button
  root.style.setProperty("--color4", "#284b63"); //samp-bg
  root.style.setProperty("--color5", "#282a36"); //content-bg
}


// --- Copy code to clip board
function copyToClipBoardEventHandler(e) {
  // navigator.clipboard.writeText(copyText.value);
  // console.log(e.srcElement.parentElement.childNodes[0].innerText);
  navigator.clipboard.writeText(e.srcElement.parentElement.childNodes[0].innerText);
}

// --- Add copy to clipboard button to code
function copyToClipBoardAttachButtons () {
  const allCodeBlocks = document.querySelectorAll('pre');
  for(let code of allCodeBlocks) {
    let copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerText = 'Copy'
    copyButton.addEventListener('click', copyToClipBoardEventHandler);
    code.appendChild(copyButton);
  }
}
copyToClipBoardAttachButtons();

//--- Mobile specific
if(screen.availWidth < 768) {
  //- Resize the index on mobile devices
  indexList.style.minHeight = window.innerHeight;
  indexList.style.minWidth = window.innerWidth;

  //- Click on index element to hide index on phone
  indexList.onclick = function (e) {
    hideIndex();
    enableElementScrolling(body);
  }
}

// --- Notification
const activeNotifications = [];
const notificationContainer = document.createElement("div");
notificationContainer.id = "notification-container";
container.appendChild(notificationContainer);

const addNotification = function (message, time) {
}