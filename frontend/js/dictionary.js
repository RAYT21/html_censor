document.addEventListener('DOMContentLoaded', () => {

    const wordsParent = document.querySelector('.dictionary-container');
    const plusBtn = document.querySelector('.plus-btn');
    const wordInput = document.querySelector('.add-word');
    const backMenuBtn = document.querySelector('#back-to-menu');
    const importBtn = document.querySelector('.import-btn');
    const backMainBtn = document.querySelector('#back-to-main');
    const exportBtn = document.querySelector('.export-btn');


    // Add and remove words

    plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addWord();
    });
    function addWord(){
        if (wordInput.value != '') {
            const wordBox = document.createElement('div');
            wordBox.classList.add('logField', 'word');
            console.log(wordInput.value);
            const word = wordInput.value;
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://127.0.0.1:5000/regexGenerator/'+wordInput.value, true);
    
            xhr.onload = (e) => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        wordBox.textContent = word;
                        wordsParent.append(wordBox);
        
                        wordInput.value = '';

                        wordBox.addEventListener('mouseenter', () => {
                            wordBox.classList.add('red');
                        });
                        wordBox.addEventListener('mouseleave', () => {
                            wordBox.classList.remove('red');
                        });
                        wordBox.addEventListener('click', () => {
                            wordBox.remove();
                        });
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
    backMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/menu.html';
    });
});



function parseJsonByRegex(){
    
}

function addRegexInStorage(){

}




