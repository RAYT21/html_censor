const minLengthLogin = 4;
const maxLengthLogin = 30;
const minLengthPassword = 13;
const maxLengthPassword = 40;
function checkData(loginVal,passwordVal){
    if(!(loginVal.length >= minLengthLogin && loginVal.length <= maxLengthLogin && passwordVal.length >= minLengthPassword && passwordVal.length <= maxLengthPassword)){
        alert("Введенные данные некорректны.\n Длина логина должна составлять от " + minLengthLogin + " до " + maxLengthLogin + " символов включительно.\n Длина пароля от " + minLengthPassword + " до " + maxLengthPassword + " символов включительно.");
        return false;
    }
    if (/[^a-zA-Z0-9]/.test(loginVal) && /[^a-zA-Z0-9]/.test(password.value))
    {
        alert("Введенные данные некорректны.В логине или пароле имеются недопустимые символы")
        return false;
    } 
    return true;
}