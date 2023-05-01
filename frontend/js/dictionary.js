document.addEventListener('DOMContentLoaded', () => {

    const wordsParent = document.querySelector('.dictionary-container');
    const plusBtn = document.querySelector('.plus-btn');
    const wordInput = document.querySelector('.add-word');
    const backMenuBtn = document.querySelector('#back-to-menu');
    const importBtn = document.querySelector('.import-btn');
    const exportBtn = document.querySelector('.export-btn');

    onLoad();
    // Add and remove words

    plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addWord();
    });
    exportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getUserStatistic();
    });
    function onLoad(){
        if(localStorage.getItem("words") != null)
        {
            console.log(localStorage.getItem("words"))
            const words = localStorage.getItem("words").split(',');
            for(let i = 0; i < words.length; i++){
            const wordBox = document.createElement('div');
            wordBox.classList.add('logField', 'word');
            const word = words[i];
            wordBox.textContent = word;
            wordsParent.append(wordBox);
            wordBox.addEventListener('mouseenter', () => {
                wordBox.classList.add('red');
            });
            wordBox.addEventListener('mouseleave', () => {
                wordBox.classList.remove('red');
            });
            wordBox.addEventListener('click', () => {
                deleteWord(wordBox);
                });
            }
        
        }
    }
    async function getUserStatistic(){
        let response = await fetch('http://127.0.0.1:5000/userStatistic/statistic/'+ localStorage.getItem("user_id"))
        let commit =  await response.json()

        if (commit.res_bool == 'False'){
            alert(commit.result)
            return
        }  

        const download = (jsoniiii, filename) => {
            const data = JSON.stringify(jsoniiii)
            const link = document.createElement('a')
        
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
            link.setAttribute('download', filename || 'data.json')
            link.style.display = 'none'
        
            document.body.appendChild(link)
        
            link.click()
        
            document.body.removeChild(link)
        }

        download(commit.result)
    }
    function addWord(){
        if (wordInput.value != '') {
            const wordBox = document.createElement('div');
            wordBox.classList.add('logField', 'word');
            console.log(wordInput.value);
            const word = wordInput.value;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:5000/accountManager/words/' + localStorage.getItem("user_id") + "&" + wordInput.value, true);
    
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if(JSON.parse(xhr.responseText).result == true){
                            wordInput.value = '';
                            console.log(xhr.responseText);
                            wordBox.textContent = word;
                            wordsParent.append(wordBox);
                            localStorage["words"] = (localStorage.getItem("words") == null ? word : localStorage.getItem("words") +','+word) ;
        
                            wordBox.addEventListener('mouseenter', () => {
                                wordBox.classList.add('red');
                            });
                            wordBox.addEventListener('mouseleave', () => {
                               wordBox.classList.remove('red');
                            });
                            wordBox.addEventListener('click', () => {
                               deleteWord(wordBox);
                            });
                        }
                        else{
                            alert("Ошибка сервера, слово не было создано.");
                        }

                    }
                    else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.onerror = (e) => {
                console.error(xhr.statusText);
                alert("Слово - <" + word + "> не было создано - сервер не отвечает.")
            };
            xhr.send();
            

        } else {
            console.log('ne ok');
        }
    }
    function deleteWord(wordBox){
        word = wordBox.textContent
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/accountManager/deleteWord/' + localStorage.getItem("user_id") + "&" + word, true);

        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(JSON.parse(xhr.responseText).result == true){
                        console.log(xhr.responseText);

                        let wordsInStorage = localStorage.getItem("words").split(',')
                        let resultArray = []
                        wordsInStorage.forEach(element => {
                            if (element != word) {
                                resultArray.push(element)
                            }
                        }); 
                        if (resultArray.length > 0){
                            localStorage["words"] = resultArray
                        } else {
                            localStorage.removeItem("words")
                        } 
                        wordBox.remove();
                    }
                    else{
                        alert("Ошибка сервера, слово не было удалено.");
                    }

                }
                else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
            alert("Слово - <" + word + "> не было удалено - сервер не отвечает.")
        };
        xhr.send();
    } 
    backMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/menu.html';
    });
});





