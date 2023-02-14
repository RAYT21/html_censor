
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
        reg(login, passwordHash)
    })
    function reg(login, passwordHash){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/accountManager/registration/'+ login + '&' + passwordHash, true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(JSON.parse(xhr.responseText).result == -1)
                        alert("Введённый логин уже используется.");
                    else{
                        alert("Регистрация прошла успешно! Войдите в аккаунт.");
                        window.location.href = '/frontend/html/index.html';
                    }
                    console.log(xhr.responseText);
                }
                else {
                    console.error(xhr.statusText);
                    alert("Сервер временно не доступен. Регистрация невозможна.")
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Сервер временно не доступен. Регистрация невозможна.")
        };
        xhr.send();
    }

    
    backMainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/index.html';
    });
});
