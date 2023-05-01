// chrome.runtime.onInstalled.addListener(async () => {
//     let url = chrome.runtime.getURL("/frontend/html/index.html");
//     let tab = await chrome.tabs.create({ url });
// });
chrome.tabs.onUpdated.addListener(onUpdated);
function onUpdated(tabId, changeInfo,tab){
    localStorage.getItem("user_id").then((result) => {
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
// function filter() {
//     const images =  поапоапоалпола document.querySelectorAll("p, h2, h1, a, h3");
//     console.log( поапоапоалпола images.length);
//     for(let i = 0; i < images.length; i++){
//         images[i].textContent = "цензура";
//     } 
// }

// //сохраниение исходной страницы
// (function() {
//     let page = document.documentElement.textContent;
//     if (localStorage) { // Browser supports it
//         localStorage.openPage = page;
//     }
// })();

// // динамическое добавление элементов в DOM
// function nodeInsertedCallback(event) {
//     if (localStorage) { // Browser supports it
//         localStorage.newPage = event;
//     }
// }


// function cutTags(str) {
//     //let regex = /( |<([^>]+)>)/ig;
//     let regex = /[^А-Яа-я]/ig;
//     return str.replace(regex, "");
// }

// function cutScripts(str){
//     let regex = /<script([^`])*<\/script>/ig;
//     return str.replace(regex, "");
// }

// function cutCSS(str){
//     let regex = /(.|#)?([^{}]+)\{([^}]+)}/ig;
//     return str.replace(regex, "");
// }

// document.addEventListener('DOMNodeInserted', nodeInsertedCallback);