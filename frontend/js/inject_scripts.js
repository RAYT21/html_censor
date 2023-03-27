// подгрузить на используемую страницу css, отправить на обработку html найти на нем запрещенку,
// изменить это на сервере и передать обратно, интегрировать полученный html в исходный


var wordsHide = "-1";
var innerMouseOut = 'this.innerHTML="HIDEN"';
chrome.storage.local.get("words").then((result) => {
    wordsHide = JSON.parse(result.words);
    
});
window.onload = function() { 
    console.log('Страница загружена, скрипт заинжектился.');
    assync();
};


async function assync(){
    let doc = document.querySelectorAll("a, h1, h2, h3, span, p, dd, yt-formatted-string");
    let divs = document.querySelectorAll("div");
    for (let i = 0; i < divs.length; i++) {
        console.log(divs[i]);
    }
    for (let j = 0; j < doc.length; j++) {
        splitter = doc[j].innerHTML.split(">");
        console.log(wordsHide.result)
        for (let i = 0; i < splitter.length; i++) {
            for (let k = 0; k < wordsHide.result.length; k++) {
                try{
                    if(splitter[i].includes("sd")){
                        console.log("das");
                    }
                    
                }catch{
                    continue;
                }
                if(splitter[i].includes(wordsHide.result[k]) & splitter[i].trim()[0] != "<" & !splitter[i].includes("innerHTML") & !splitter[i].includes("{")) 
                {
                    console.log(splitter[i]);
                    const innerMouseOver = 'this.innerHTML="'+ wordsHide.result[k] +'"';
                    buf = splitter[i];
                    splitter[i] = splitter[i].replace(wordsHide.result[k], '<span style="background-color:#ff0000" onMouseOver=' + innerMouseOver + ' onMouseOut=' + innerMouseOut + '>HIDEN</span>')
                    const badge = document.createElement("span");
                    badge.innerHTML = '<span style="background-color:#ff0000" onMouseOver=' + innerMouseOver + ' onMouseOut=' + innerMouseOut + '>HIDEN</span>';
                    // console.log(doc[j].textContent == wordsHide.result[k]);
                    // console.log("\tЗначение textContent = [" + doc[j].textContent + "]\tЗначение wordsHide = [" + wordsHide.result[k] + "]");
                    // console.log("Значение innerHTML - [" + doc[j].parentElement.children[0] + "]")
                    // let before = "";
                    // let after = "";
                    // if(doc[j].innerHTML.trim() == wordsHide.result[k]){
                    // }
                    // else{
                    //     if(doc[j].textContent.includes(wordsHide.result[k])){
                    //         if(doc[j].textContent.trim().indexOf(wordsHide.result[k]) != 0){
                    //             before = doc[j].textContent.substring(0,doc[j].textContent.indexOf(wordsHide.result[k]));
                    //         }
                    //         if((doc[j].textContent.trim().indexOf(wordsHide.result[k]) + wordsHide.result[k].length) != (0 + wordsHide.result[k].length)){
                    //             after = doc[j].textContent.substring((doc[j].textContent.indexOf(wordsHide.result[k]) + wordsHide.result[k].length), doc[j].textContent.length)
                    //         }
                    //     }
                    // }
                    // const beforeEl = document.createElement("span");
                    // const afterEl = document.createElement("span");
                    // beforeEl.textContent = before;
                    // afterEl.textContent = after;
                    elements = [];
                    const content = doc[j].textContent;
                    // console.log("Before - []   After - []   Childrens count - [" + doc[j].children.length + "]");
                    if(doc[j].children.length == 0){
                        if(content.trim().length != wordsHide.result[k].length){
                            if(content.trim().indexOf(wordsHide.result[k]) == 0){
                                elementAfterBadge = document.createElement("span");
                                elementAfterBadge.textContent = content.substring(wordsHide.result[k].length, content.length);
                                elements.push(badge,elementAfterBadge);
                            }
                            else{
                                if(content.trim().length == (content.trim().indexOf(wordsHide.result[k]) + wordsHide.result[k].length)){
                                    elementBeforeBadge = document.createElement("span");
                                    elementBeforeBadge.textContent = content.substring(0,content.indexOf(wordsHide.result[k]));
                                    elements.push(elementBeforeBadge, badge);
                                }
                                else{
                                    elementBeforeBadge = document.createElement("span");
                                    elementBeforeBadge.textContent = content.substring(0,content.indexOf(wordsHide.result[k]));
                                    elementAfterBadge = document.createElement("span");
                                    elementAfterBadge.textContent = content.substring(content.indexOf(wordsHide.result[k]) + wordsHide.result[k].length, content.length)
                                    elements.push(elementBeforeBadge, badge, elementAfterBadge);
                                }
                            }
                        }
                        else{
                            elements.push(badge);
                        }
                    }
                    bufContent = content;
                    for (let y = 0; y < doc[j].children.length; y++) {  
                    
                        if(bufContent.indexOf(doc[j].children[y].textContent) != 0){
                            if(bufContent.substring(0, bufContent.indexOf(doc[j].children[y].textContent)).includes(wordsHide.result[k])){
                                if(bufContent.indexOf(wordsHide.result[k]) == 0){
                                    elementTextAfterBadge = document.createElement("span")
                                    elementTextAfterBadge.textContent = bufContent.substring(bufContent.indexOf(wordsHide.result[k]) + wordsHide.result[k].length, bufContent.indexOf(doc[j].children[y].textContent));
                                    elements.push(badge, elementTextAfterBadge);
                                    bufContent = bufContent.substring(bufContent.indexOf(doc[j].children[y].textContent) + doc[j].children[y].textContent.length, bufContent.length);
                                }
                                else{
                                    elementTextBeforeBadge = document.createElement("span")
                                    elementTextAfterBadge = document.createElement("span")
                                    elementTextBeforeBadge.textContent = bufContent.substring(0,bufContent.indexOf(wordsHide.result[k]));
                                    elementTextAfterBadge.textContent = bufContent.substring(bufContent.indexOf(wordsHide.result[k]) + wordsHide.result[k].length, bufContent.indexOf(doc[j].children[y].textContent));
                                    elements.push(elementTextBeforeBadge, badge, elementTextAfterBadge)
                                    bufContent = bufContent.substring(bufContent.indexOf(doc[j].children[y].textContent) + doc[j].children[y].textContent.length, bufContent.length);
                                }
                            }
                            else{
                                elementTextBeforeChildren = document.createElement("span")
                                elementTextBeforeChildren.textContent = bufContent.substring(0, bufContent.indexOf(doc[j].children[y].textContent))
                                elements.push(elementTextBeforeChildren);
                                bufContent = bufContent.substring(bufContent.indexOf(doc[j].children[y].textContent) + doc[j].children[y].textContent.length, bufContent.length)
                            }
                            elements.push(doc[j].children[y]);
                        }
                
                    }
                    while (doc[j].firstChild) {
                        doc[j].removeChild(doc[j].firstChild);
                    }
                    for (let y = 0; y < elements.length; y++) {
                        doc[j].appendChild(elements[y]);
                    }
                    // if(!doc[j].innerHTML.includes(badge.innerHTML)){
                    //     if(before == "" & after == ""){
                    //         doc[j].insertAdjacentElement("afterbegin", badge);
                    //     }
                    //     if(before != "" & after != ""){
                    //         doc[j].insertAdjacentElement("afterbegin", beforeEl);
                    //         doc[j].insertAdjacentElement("beforeend", badge);
                    //         doc[j].insertAdjacentElement("beforeend", afterEl);
                    //     }
                    //     if(before == "" & after != ""){
                    //         doc[j].insertAdjacentElement("afterbegin", badge);
                    //         doc[j].insertAdjacentElement("beforeend", afterEl);
                    //     }
                    //     if(before != "" & after == ""){
                    //         doc[j].insertAdjacentElement("afterbegin", beforeEl);
                    //         doc[j].insertAdjacentElement("beforeend", badge);
                    //     }
                    // }
                }
            }
        }
    }
}


document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

// // динамическое добавление элементов в DOM
function nodeInsertedCallback(event) { 
    let trg = event.target.innerHTML;
    if(wordsHide == "-1"){
        return;
    }
    try{
        if(trg.includes(">")){      
        }
    }
    catch{
        return;
    }
    
    splitter = trg.split(">");
    for (let i = 0; i < splitter.length; i++) {
        for (let k = 0; k < wordsHide.result.length; k++) {
            try{
                if(splitter[i].includes(wordsHide.result[k])){
                }
            }
            catch{
                continue;
            }
            if(splitter[i].includes(wordsHide.result[k]) & splitter[i].trim()[0] != "<" & !splitter[i].includes("innerHTML") & !splitter[i].includes("{")) 
            {
                const innerMouseOver = 'this.innerHTML="'+ wordsHide.result[k] +'"';
                buf = splitter[i];
                splitter[i] = splitter[i].replace(wordsHide.result[k], '<span style="background-color:#ff0000" onMouseOver=' + innerMouseOver + ' onMouseOut=' + innerMouseOut + '>HIDEN</span>')
                event.target.innerHTML = event.target.innerHTML.replace(buf, splitter[i]);
            }
        }
    }  
}


// function injected_main() {
//     alert('Вот тут пишешь свой javascript код который будет жедать то, что нужно');
// }
// function injectHTML(){
//     let injectCSS='/frontend/css/inject_styles.css';
//     let text= '';
//     let hoverText='';
//     let hidden_setting='<span class="inject-text" text="DEFAULT TEXT" hover-text="NEW TEXT FROM ATTRIBUTE"></span>';
//     BROWSER_ACTION
// }

// <span class="inject-text" text="DEFAULT TEXT" hover-text="NEW TEXT FROM ATTRIBUTE"></span>