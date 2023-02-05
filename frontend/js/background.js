
//сохраниение исходной страницы
(function() {
    let page = document.documentElement.textContent;
    console.log(page);
    if (localStorage) { // Browser supports it
        localStorage.openPage = page;
    }
})();

// динамическое добавление элементов в DOM
function nodeInsertedCallback(event) {
    console.log(event.target.textContent);
    if (localStorage) { // Browser supports it
        localStorage.newPage = event;
    }
}


function currentContext(event){
    let words = ["банан", "помидор"];
    event.target.textContent = text.toLowerCase().replace(" ", "");

    let distance = function (a,b){
        let n = a.length;
        let m = b.length;
        if (n > m){
            [a , b] = [b, a];
            [n , m] = [m, n];
        }
        let currentRow = [...Array(n+1).keys()];
        for (let i = 1; i < m+1; i++) {
            [previousRow, currentRow] = [currentRow, [i] + [0] * n];
            for (let j = 1; j < n+1; j++) {
                [add, deleter, changer] = [previousRow[j]+1,currentRow[j-1]+1,previousRow[j-1]];
                if (a[j-1] != b[i-1]){
                    changer++;
                }
                currentRow[j] = Math.min(add,deleter,changer);
            }
        }
        return currentRow[n];
    }

    dict =   {'а' : ['а', 'a', '@'],
        'б' : ['б', '6', 'b'],
        'в' : ['в', 'b', 'v'],
        'г' : ['г', 'r', 'g'],
        'д' : ['д', 'd'],
        'е' : ['е', 'e'],
        'ё' : ['ё', 'e'],
        'ж' : ['ж', 'zh', '*'],
        'з' : ['з', '3', 'z'],
        'и' : ['и', 'u', 'i'],
        'й' : ['й', 'u', 'i'],
        'к' : ['к', 'k', 'i{', '|{'],
        'л' : ['л', 'l', 'ji'],
        'м' : ['м', 'm'],
        'н' : ['н', 'h', 'n'],
        'о' : ['о', 'o', '0'],
        'п' : ['п', 'n', 'p'],
        'р' : ['р', 'r', 'p'],
        'с' : ['с', 'c', 's'],
        'т' : ['т', 'm', 't'],
        'у' : ['у', 'y', 'u'],
        'ф' : ['ф', 'f'],
        'х' : ['х', 'x', 'h' , '}{'],
        'ц' : ['ц', 'c', 'u,'],
        'ч' : ['ч', 'ch'],
        'ш' : ['ш', 'sh'],
        'щ' : ['щ', 'sch'],
        'ь' : ['ь', 'b'],
        'ы' : ['ы', 'bi'],
        'ъ' : ['ъ'],
        'э' : ['э', 'e'],
        'ю' : ['ю', 'io'],
        'я' : ['я', 'ya']
    }

    for (const [key, value] of Object.entries(dict)) {
        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < text.length; j++) {
                if (value[i]  === text[j]){
                    text = text.replace(text[j], value[i])
                }
            }
        }
    }
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < text.length; j++) {
            let fragment = text.slice(j , j+words[i].length);
        }
        if (distance(fragment,words[i]) <= words[i].length*0.25){
            document.q
        }

    }
}

function cutTags(str) {
    //let regex = /( |<([^>]+)>)/ig;
    let regex = /[^А-Яа-я]/ig;
    return str.replace(regex, "");
}

function cutScripts(str){
    let regex = /<script([^`])*<\/script>/ig;
    return str.replace(regex, "");
}

function cutCSS(str){
    let regex = /(.|#)?([^{}]+)\{([^}]+)}/ig;
    return str.replace(regex, "");
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);