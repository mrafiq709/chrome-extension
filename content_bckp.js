var regex = /Google/gi;
matches = document.body.innerText.match(regex);

var txt = document.body.innerHTML;

var payload = {
  count: matches ? matches.length : 0, // Pass the number of matches back.
  html: txt,
};
chrome.runtime.sendMessage(payload);
