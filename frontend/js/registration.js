
document.addEventListener('DOMContentLoaded', () => {
    const backMainBtn = document.querySelector('.back-btn');
    const regBtn = document.querySelector('#register');
    const authInputs = document.querySelectorAll('.logField');

    regBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const login = authInputs[0].value;
        const password = authInputs[1].value;
        const correct = checkData(login,password)
        if(!correct)
            return;
        const passwordHash = sha256(password);
        const jsonPasLog = JSON.stringify({login,passwordHash});
        console.log("Хеш пароля - " + "<" + passwordHash + ">");
        console.log("Данные в json - " + "<" + jsonPasLog + ">");
        checkLogin(login, jsonPasLog)
    })
    
    function checkLogin(login, json){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/users/'+login, true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    if(xhr.responseText == "false")
                        register(json);
                    else
                        return;
                }
                else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Сервер не отвечает. Регистрация невозможна.")
        };
        xhr.send();
    }
    function register(json){
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:5000/users/newUser', true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    alert('Регистрация прошла успешно')
                }
                else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Сервер не отвечает. Регистрация невозможна.")
        };
        xhr.send(json);
    }

    
    backMainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/index.html';
    });
    
});
