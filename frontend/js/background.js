// chrome.runtime.onInstalled.addListener(async () => {
//     let url = chrome.runtime.getURL("/frontend/html/index.html");
//     let tab = await chrome.tabs.create({ url });
// });
self.chrome.tabs.onUpdated.addListener(onUpdated);
function onUpdated(tabId, changeInfo,tab){
    self.chrome.storage.sync.get("user_id").then((result) => {
        if(result.user_id != "-1"){
            self.chrome.scripting.executeScript(
                {
                    target:{tabId: tabId, allFrames:true},
                    files:["/frontend/js/inject_scripts.js"]
                }
            )
        }
    });
}
