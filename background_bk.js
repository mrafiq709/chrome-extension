/**
 * Handles requests sent by the content script.  Shows an infobar.
 */
window.data = {};

/**
 * Receive Messages from content.js
 *
 * @param {*} request
 * @param {*} sender
 * @param {*} sendResponse
 */
function onRequest(request, sender, sendResponse) {
  // const notificationId = "id_" + sender.tab.id;

  console.log(request);

  // add data to window object to access it in popup.js file
  // window.data["count"] = request.count;
  // window.data["html"] = request.html;

  // const options = {
  //   type: "basic",
  //   iconUrl: "/images/get_started16.png",
  //   title: "Hey",
  //   message: request.count + " Google word",
  // };

  // const callback = (notificationId) =>
  //   console.log("notificationId: ", notificationId);

  // chrome.notifications.create(notificationId, options, callback);

  // chrome.browserAction.onClicked.addListener(function (tab) {
  //   chrome.tabs.executeScript(
  //     tab.id,
  //     {
  //       code: "var request = " + JSON.stringify(request),
  //     },
  //     function () {
  //       chrome.tabs.executeScript(tab.id, { file: "insert.js" });
  //     }
  //   );
  // });

  /**
   * Run insert.js to excute javascript code in background
   * pass parameters to insert.js with code part
   */
  // chrome.tabs.executeScript(
  //   sender.tab.id,
  //   {
  //     code: "var request = " + JSON.stringify(request),
  //   },
  //   function () {
  //     chrome.tabs.executeScript(sender.tab.id, { file: "insert.js" });
  //   }
  // );

  // Return nothing to let the connection be cleaned up.
  sendResponse({});
}

// Listen for the content script to send a message to the background page.
chrome.runtime.onMessage.addListener(onRequest);

// chrome.webNavigation.onCompleted.addListener(
//   function () {
//     alert("This is my favorite website!");
//   },
//   { url: [{ urlMatches: "https://www.google.com/" }] }
// );

// chrome.browserAction.onClicked.addListener(function (tab) {
//   // No tabs or host permissions needed!
//   console.log("Turning " + tab.url + " red!");
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"',
//   });
// });
