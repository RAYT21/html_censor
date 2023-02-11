document.addEventListener('DOMContentLoaded', () => {
    const backMainBtn = document.querySelector('.back-btn');
    const regBtn = document.querySelector('#register');
    const login = document.querySelector('#login');
    const password = document.querySelector('#password');
    const minLengthLogin = 4;
    const maxLengthLogin = 30;
    const minLengthPassword = 13;
    const maxLengthPassword = 40;
    regBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        if(!(login.value.length >= minLengthLogin && login.value.length <= maxLengthLogin && password.value.length >= minLengthPassword && password.value.length <= maxLengthPassword)){
            alert("Введенные данные некорректны.\n Длина логина должна составлять от 4 до 30 символов включительно.\n Длина пароля от 13 до 40 символов включительно.");
            return;
        }
        if (/[^a-zA-Z0-9]/.test(login.value) && /[^a-zA-Z0-9]/.test(password.value))
        {
            console.log("Есть недопустимые символы в логине", login.value);
            return;
        } 
             
        console.log("ебать " + login.value.length);
    })
    backMainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/index.html';
    });
    
});
function checkLogin(login) {
    
  }