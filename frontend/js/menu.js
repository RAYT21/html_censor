document.addEventListener('DOMContentLoaded', () => {
    const infoDivs = document.querySelectorAll('.user-info');
    const exitBtn = document.querySelector('#exit');
    infoDivs[1].textContent = localStorage.getItem("login");
    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem("login");
        localStorage.removeItem("user_id");
        localStorage.removeItem("words");
        window.location.href = '/frontend/html/index.html';
    });
    getUserWords(localStorage.getItem("user_id"));
    function getUserWords(user_id){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/accountManager/words/'+ user_id, true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(JSON.parse(xhr.responseText).result == false)
                        alert("Не удалось загрузить слова.");
                    else{
                        localStorage["words"] = xhr.responseText;
                    }
                    console.log(xhr.responseText);
                }
                else {
                    console.error(xhr.statusText);
                    alert("Сервер временно не доступен. Загрузка слов невозможна.")
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Сервер временно не доступен. Загрузка слов невозможна.")
        };
        xhr.send();
    }
});
