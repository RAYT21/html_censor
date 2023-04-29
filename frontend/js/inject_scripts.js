// подгрузить на используемую страницу css, отправить на обработку html найти на нем запрещенку,
// изменить это на сервере и передать обратно, интегрировать полученный html в исходный

window.onload = function() { 
    console.log('Страница загружена, скрипт заинжектился.');
    getCensorPage();
};


function getCensorPage(){
    let page = document.innerHTML;
    //send on server
    //get server request
    document.innerHTML = serverResponse;
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

// // динамическое добавление элементов в DOM
function nodeInsertedCallback(event) { 
    let trg = event.target.innerHTML;
    //   send o
    event.target.innerHTML = serverResponse;
}


