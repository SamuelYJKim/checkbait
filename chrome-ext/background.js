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
    chrome.tabs.query({active: true, currentWindow: true}, function() {
      chrome.tabs.executeScript(
        tab.id,
        {file: 'contentScript.js'});
      // chrome.tabs.executeScript(tab.id, {
      //       code: 'var response = ' + response
      //   }, function() {
      //       chrome.tabs.executeScript(tab.id, {file: 'content.js'});
      //   });
    });
      // console.log("tab", tab)
      // chrome.tabs.sendMessage(tab.id, {message: "open"}, function(response) {
      //   console.log(response.farewell);
      // });
  };

    // chrome.windows.create({ url: "popup.html", type: "popup" }, function (
    //   window
    // ) {});
    // requestUrl = "localhost:5000/" + url;
    // fetch(requestUrl, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    //   .then((response) => {
              // chrome.tabs.executeScript(tab.id, {
      //       code: 'var response = ' + response
      //   }, function() {
      //       chrome.tabs.executeScript(tab.id, {file: 'content.js'});
      //   });
    //   })

  
});


    // data = [
    //   0,
    //   "(CNN) Ten states reported their highest single-day tallies of new Covid-19 infections Friday, and the country reported its highest one-day total since July, as experts say a dangerous fall surge of coronavirus infections is well underway.\n'We are in a new wave of rising positivity in Covid-19 cases' Experts say Americans can help get the virus under control by heeding guidelines touted by officials for months: avoiding crowded settings, keeping a distance, keeping small gatherings outdoors, and wearing a mask.\nHours before the rally, health officials reported 1,791 new Covid-19 cases in a day.",
    //   [
    //     "vaccine",
    //     "harrowing",
    //     "states",
    //     "rally",
    //     "coronavirus",
    //     "cases",
    //     "number",
    //     "covid19",
    //     "highest",
    //     "reported",
    //     "virus",
    //     "officials",
    //     "health",
    //   ],
    // ];