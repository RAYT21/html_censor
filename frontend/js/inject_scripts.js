

window.onload = async function()  { 
    console.log('Страница загружена, скрипт заинжектился.');
    let setZero = await chrome.storage.local.get(["settings"])


    if (setZero.settings[0] == '1'){
        console.log('Я внутри')
        getCensorPage();
    } else {
        console.log('Внутрь не путсили')
        console.log(setZero.settings)
    }

};


async function getCensorPage(){
    let page = document.documentElement.innerHTML;
    let user_id = await chrome.storage.local.get(["user_id"])
    console.log(user_id)
    console.log(user_id.user_id)
    let website_url = document.URL;

    let request = {
        analize_text: page,
        user_id: user_id.user_id,
        website_url: website_url
    };

    console.log(request)

    
    let response = await fetch('http://127.0.0.1:5000/contentChanger/changeContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)
    });
      
    let result = await response.json();
    if (result.result_response != false){
        if (result.reuslt != 'Content not changed' ){
            document.documentElement.innerHTML = result.result;
            console.log('КОНТЕНТ ИЗМЕНЕН ')
            console.log(result)
        }
        else {
            alert("Страница не содержит запрещенных слов!")
        }
    } else {
        alert("Произошла ошибка на сервере, просим прощения.")

    }
}

// document.addEventListener('DOMNodeInserted', async (e) => {
//     console.log('Страница загружена, скрипт заинжектился.');
//     let setZero = await chrome.storage.local.get(["settings"])


//     if (setZero.settings[0] == '1'){
//         console.log('Я внутри')
//         nodeInsertedCallback(e);
//     } else {
//         console.log('Внутрь не путсили')
//         console.log(setZero.settings)
//     }
// });

// // // динамическое добавление элементов в DOM
// async function nodeInsertedCallback(event) { 
//     let page = event.target.innerHTML;
    
//     let user_id = await chrome.storage.local.get(["user_id"]);
//     console.log(user_id)
//     console.log(user_id.user_id)
//     let website_url = document.URL;

//     let request = {
//         analize_text: page,
//         user_id: user_id.user_id,
//         website_url: website_url
//     };

//     console.log(request)

    
//     let response = await fetch('http://127.0.0.1:5000/contentChanger/changeContent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(request)
//     });
      
//     let result = await response.json();
//     if (result.result_response != false ){
//         if (result.reuslt != 'Content not changed' ){
//             event.target.innerHTML = result.result;
//             console.log('КОНТЕНТ ИЗМЕНЕН ')
//             console.log(result)
//         }
//         else {
//             alert("Втавленный элемент не содержит запрещенных слов!")
//         }
//     } else {
//         alert("Произошла ошибка на сервере, просим прощения.")

//     }
// }


