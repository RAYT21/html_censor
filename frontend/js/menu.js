document.addEventListener('DOMContentLoaded', () => {
    const infoDivs = document.querySelectorAll('.user-info');
    const exitBtn = document.querySelector('#exit');
    infoDivs[1].textContent = localStorage.getItem("login");
    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem("login");
        localStorage.removeItem("user_id");
        localStorage.removeItem("words");
        localStorage.removeItem("set0");localStorage.removeItem("set1");
        localStorage.removeItem("set2");localStorage.removeItem("set3");

        self.chrome.storage.local.set({ user_id: -1 }).then(() => {
            console.log("Value is set to " + value);
        });
          
        self.chrome.storage.local.get(["user_id"]).then((result) => {
            console.log("Value currently is " + result.user_id);
        });

        window.location.href = '/frontend/html/index.html';
    });
    getUserWords(localStorage.getItem("user_id"));
    function getUserWords(user_id){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/accountManager/words/'+ user_id, true);
    
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(JSON.parse(xhr.responseText).result == false){

                    }
                    else{
                        let array =  JSON.parse(xhr.responseText);
                        localStorage["words"] = array.result;
                    }
                }
                else {
                    console.error(xhr.statusText);
                    alert("Сервер временно не доступен. Загрузка слов невозможна.")
                }
            }
        };
        xhr.onerror = (e) => {
            alert("Сервер временно не доступен. Загрузка слов невозможна.")
        };
        xhr.send();
    }
});
