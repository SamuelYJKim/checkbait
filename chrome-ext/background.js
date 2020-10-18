chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "check-bait",
    title: "CheckBait",
    contexts: ["all"],
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "check-bait") {
      console.log("info", info.linkUrl);
      if (info.linkUrl) {
        call_api(info.linkUrl, tab);
      }
    }
  });

  function call_api(url, tab) {
    requestUrl = "http://localhost:5000/clickbait/?url=" + url;
    fetch(requestUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          chrome.tabs.executeScript(
            tab.id,
            {
              code: "var response = " + JSON.stringify(data),
            },
            function () {
              chrome.tabs.executeScript(tab.id, { file: "contentScript.js" });
            }
          );
        });
      }
    });
  }
});
