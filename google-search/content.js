var regex = /Google/gi;
matches = document.body.innerText.match(regex);
if (matches) {
  var payload = {
    count: matches.length, // Pass the number of matches back.
  };
  chrome.runtime.sendMessage(payload);
}
