
let save = document.getElementById("save");

save.addEventListener("click", async () => {
    alert(123);
    const tabId = await getTabId();
    await chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ['./js/content.js']
    });
});

async function getTabId() {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    return (tabs.length > 0) ? tabs[0].id : null;
}