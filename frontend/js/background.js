chrome.tabs.onUpdated.addListener(onUpdated);
function onUpdated(tabId, changeInfo,tab){
    chrome.storage.local.get(["user_id"]).then((result) => {
        console.log('Message insert ' + result.user_id)
        if(result.user_id != "-1"){
            chrome.scripting.executeScript(
                {
                    target:{tabId: tabId, allFrames:true},
                    files:["/frontend/js/inject_scripts.js"]
                }
            )
        }
    });
}