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
        if (wordInput.value != '') {
            const wordBox = document.createElement('div');
            wordBox.classList.add('logField', 'word');
            console.log(wordInput.value);

            const hxr = requestToServer(wordInput.value);
            if (hxr.status == 200) {
                wordBox.textContent = wordInput.value;
                wordsParent.append(wordBox);
            }
        
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

        } else {
            console.log('ne ok');
        }
    });

    backMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/menu.html';
    });
});

function requestToServer(word){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://127.0.0.2:5000/regexGenerator/'+word, false);
  xhr.send();

  if (xhr.status != 200) {
    console.log(xhr.status + ': ' + xhr.statusText);
  } else {
    console.log(xhr.status + ': ' + xhr.statusText);
    console.log(xhr.response)
    return xhr;
  }
  
} 

function parseJsonByRegex(){
    
}

function addRegexInStorage(){

}




