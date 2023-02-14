
//сохраниение исходной страницы
(function() {
    let page = document.documentElement.textContent;
    if (localStorage) { // Browser supports it
        localStorage.openPage = page;
    }
});

// динамическое добавление элементов в DOM
function nodeInsertedCallback(event) {
    if (localStorage) { // Browser supports it
        localStorage.newPage = event;
    }
}



document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

document.addEventListener('DOMContentLoaded', )