document.addEventListener('DOMContentLoaded', () => {
    authBtn = document.querySelector('.enter-button');
    authInputs = document.querySelectorAll('.logField');

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
    });
    
});