/* global chrome */
function saveOptions(e) {
  e.preventDefault();
  const userId = document.querySelector("#userId").value;
  const apiKey = document.querySelector("#apiKey").value;
  chrome.storage.sync.set({
    userId,
    apiKey,
  });
}

function restoreOptions() {
  chrome.storage.sync
    .get({userId: '', apiKey: ''}, ({ userId, apiKey }) => {
      document.querySelector("#userId").value = userId;
      document.querySelector("#apiKey").value = apiKey;
    })
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
