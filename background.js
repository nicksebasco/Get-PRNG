chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
   chrome.tabs.executeScript(null, {"file": "script.js"});
});
chrome.runtime.onMessage.addListener(function(message){
  if (message.method === "captureRand" && message.message){
    chrome.runtime.sendMessage({method:"updateRand",func: message.message});
  }
  else{
    alert("I don't work.");
  }
});
