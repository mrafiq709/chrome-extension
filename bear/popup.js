document.addEventListener(
  "DOMContentLoaded",
  function () {
    // chrome.tabs.query(
    //   {
    //     active: true,
    //     lastFocusedWindow: true,
    //   },
    //   function (tabs) {
    //     // and use that tab to fill in out title and url
    //     let tab = tabs[0];
    //     chrome.tabs.sendMessage(tab.id, "Hi", setCount);
    //     // alert(tab.url);
    //   }
    // );

    // function setCount(res) {
    //   const div = document.createElement("div");
    //   div.textContent = `${res.count} bears`;
    //   document.body.appendChild(div);
    // }

    const bg = chrome.extension.getBackgroundPage();
    Object.keys(bg.bears).forEach(function (url) {
      const div = document.createElement("div");
      div.textContent = `${url}: ${bg.bears[url]}`;
      document.body.appendChild(div);
    });
  },
  false
);
