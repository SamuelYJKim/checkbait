var style = document.createElement("link");
style.rel = "stylesheet";
style.type = "text/css";
style.href = chrome.extension.getURL("styles.css");
(document.head || document.documentElement).appendChild(style);

var title = response[0];
var isClickbait = response[1];
var summary = "<b>Summary:</b> " + response[2];
var keywords = "<b>Keywords:</b> " + response[3].join(', ');

// var title = "Sample Title";
// var isClickbait = 0;
// var summary =
//   "<b>summary:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
// var keywords = "<b>keywords:</b> the, fast, cat, goes, over, the, moon";

var bubbleDOM = document.createElement("div");
bubbleDOM.setAttribute("id", "container");

var titleDOM = document.createElement("i");
titleDOM.innerHTML = title;

var isClickbaitDOM = document.createElement("h1");
isClickbaitDOM.setAttribute("id", "mydivheader");

if (isClickbait === 0) {
  isClickbaitDOM.innerHTML = "Not Clickbait";
} else {
  isClickbaitDOM.innerHTML = "Clickbait";
}

var summaryDOM = document.createElement("p");
summaryDOM.innerHTML = summary;

var keywordsDOM = document.createElement("p");
keywordsDOM.innerHTML = keywords;

bubbleDOM.appendChild(isClickbaitDOM);
bubbleDOM.appendChild(titleDOM);
bubbleDOM.appendChild(document.createElement("br"))
bubbleDOM.appendChild(summaryDOM);
bubbleDOM.appendChild(keywordsDOM);

document.body.appendChild(bubbleDOM);

document.onclick = function (e) {
  if (e.target !== bubbleDOM && !bubbleDOM.contains(e.target)) {
    bubbleDOM.style.display = "none";
  }
};
