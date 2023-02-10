
//сохраниение исходной страницы
(function() {
    let page = document.documentElement.textContent;
    console.log(page);
    if (localStorage) { // Browser supports it
        localStorage.openPage = page;
    }
})();

// динамическое добавление элементов в DOM
function nodeInsertedCallback(event) {
    console.log(event.target.textContent);
    if (localStorage) { // Browser supports it
        localStorage.newPage = event;
    }
}




function cutTags(str) {
    //let regex = /( |<([^>]+)>)/ig;
    let regex = /[^А-Яа-я]/ig;
    return str.replace(regex, "");
}

function cutScripts(str){
    let regex = /<script([^`])*<\/script>/ig;
    return str.replace(regex, "");
}

function cutCSS(str){
    let regex = /(.|#)?([^{}]+)\{([^}]+)}/ig;
    return str.replace(regex, "");
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);