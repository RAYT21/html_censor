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
                        localStorage['set0'] = JSON.parse(xhr.responseText).settings[0]
                        localStorage['set1'] = JSON.parse(xhr.responseText).settings[1]
                        localStorage['set2'] = JSON.parse(xhr.responseText).settings[2]
                        localStorage['set3'] = JSON.parse(xhr.responseText).settings[3]
                        window.location.href = '/frontend/html/menu.html';
                        localStorage["login"] = login;
                        localStorage["user_id"] = JSON.parse(xhr.responseText).result;
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

});