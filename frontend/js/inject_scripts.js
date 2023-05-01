window.onload = function() { 
    console.log('Страница загружена, скрипт заинжектился.');
    getCensorPage();
};


async function getCensorPage(){
    let page = document.innerHTML;
    let user_id = localStorage.getItem("user_id");
    let website_url = document.URL;

    let request = {
        analize_text: page,
        user_id: user_id,
        website_url: website_url
    };

    
    let response = await fetch('http://127.0.0.1:5000/contentChanger/changeContent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)
    });
      
    let result = await response.json();
    if (result.result_response != 'False'){
        if (result.reuslt != 'Content not changed' ){
            document.innerHTML = result.result;
        }
        else {
            alert("Страница не содержит запрещенных слов!")
        }
    } else {
        alert("Произошла ошибка на сервере, просим прощения.")

    }
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

// // динамическое добавление элементов в DOM
async function nodeInsertedCallback(event) { 
    let page = event.target.innerHTML;
    
    let user_id = localStorage.getItem("user_id");
    let website_url = document.URL;

    let request = {
        analize_text: page,
        user_id: user_id,
        website_url: website_url
    };

    
    let response = await fetch('http://127.0.0.1:5000/contentChanger/changeContent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)
    });
      
    let result = await response.json();
    if (result.result_response != 'False' ){
        if (result.reuslt != 'Content not changed' ){
            event.target.innerHTML = result.result;
        }
        else {
            alert("Втавленный элемент не содержит запрещенных слов!")
        }
    } else {
        alert("Произошла ошибка на сервере, просим прощения.")

    }
}


