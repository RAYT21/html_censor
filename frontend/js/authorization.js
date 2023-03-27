document.addEventListener('DOMContentLoaded', () => {
    authBtn = document.querySelector('.enter-button');
    authInputs = document.querySelectorAll('.logField');
    loginDivs = document.querySelectorAll('.userInfo');     
    const log = document.querySelector(".card")
    authBtn.addEventListener('click', (e) => {
        const login = authInputs[0].value;
        const password = authInputs[1].value;
        const correct = checkData(login,password)
        if(!correct)
            return;
        const passwordHash = sha256(password);
        const jsonPasLog = JSON.stringify({login,passwordHash});
        console.log("Хеш пароля - " + "<" + passwordHash + ">");
        console.log("Данные в json - " + "<" + jsonPasLog + ">");
        auth(login,passwordHash);
    });
    
    function auth(login, passwordHash){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/accountManager/authorization/'+ login + '&' + passwordHash, true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(JSON.parse(xhr.responseText).result == -1)
                        alert("Введены неверные данные.");
                    else{
                        window.location.href = '/frontend/html/menu.html';
                        localStorage["login"] = login;
                        localStorage["user_id"] = JSON.parse(xhr.responseText).result;
                        chrome.storage.local.set({ "user_id": JSON.parse(xhr.responseText).result})
                    }
                    console.log(xhr.responseText);
                }
                else {
                    console.error(xhr.statusText);
                    alert("Сервер временно не доступен. Авторизация невозможна.")
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Сервер временно не доступен. Авторизация невозможна.")
        };
        xhr.send();
    }
    
    if(localStorage.getItem("login") != null && localStorage.getItem("user_id") != null){
        window.location.href = '/frontend/html/menu.html';
    }


    // Мусор -----------------------------------------
    // const infoDs = document.querySelector('.card');
    // infoDs.addEventListener('click', (e)=>{
    //     chrome.tabs.query({active: true}, (tabs) => {
    //         const tab = tabs[0];
    //         if (tab) {
    //             chrome.scripting.executeScript(
    //                 {
    //                     target:{tabId: tab.id, allFrames: true},
    //                     func:grabImages
    //                 },
    //                 onResult
    //             )
    //         } else {
    //             alert("There are no active tabs")
    //         }
    //     })
    // })
    // function grabImages() {
    //     const images = document.querySelectorAll("p, h2, h1, a, h3");
    //     console.log(images.length);
    //     for(let i = 0; i < images.length; i++){
    //         images[i].textContent = "000";
    //     }
        

    //     return Array.from(images).map(image=>image.textContent);    
    // }
    // function onResult(frames) {
    //     // Если результатов нет
    //     if (!frames || !frames.length) { 
    //         alert("Could not retrieve images from specified page");
    //         return;
    //     }
    //     // Объединить списки URL из каждого фрейма в один массив
    //     const imageUrls = frames.map(frame=>frame.result)
    //                         .reduce((r1,r2)=>r1.concat(r2));
    //     // Скопировать в буфер обмена полученный массив  
    //     // объединив его в строку, используя возврат каретки 
    //     // как разделитель  
    //     window.navigator.clipboard
    //         .writeText(imageUrls.join("\n"))
    //         .then(()=>{
    //             // закрыть окно расширения после 
    //             // завершения
    //         });
    // }
    // Мусор -----------------------------------------
});