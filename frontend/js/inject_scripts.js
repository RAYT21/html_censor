
// подгрузить на используемую страницу css, отправить на обработку html найти на нем запрещенку,
// изменить это на сервере и передать обратно, интегрировать полученный html в исходный
window.onload = function() { 
    console.log('Страница загружена, скрипт заинжектился.');

    

    //// Мусор --------------------------------------------------
    // const p = document.querySelectorAll("a, p, h1, h2, h3");
    // console.log(p.length);
    // const wordHide = "Строка";
    // for(let i = 0; i < p.length; i++){
    //     if(p[i].textContent.toLowerCase().includes(wordHide.toLowerCase())){
    //         const innerMouseOver = 'this.innerHTML="'+wordHide+'"';
    //         const innerMouseOut = 'this.innerHTML="HIDEN"';
    //         console.log(p[i].innerHTML);
    //         p[i].innerHTML = p[i].innerHTML.replace(wordHide, '<span style="background-color:#ff0000" onMouseOver=' + innerMouseOver + ' onMouseOut=' + innerMouseOut + '>HIDEN</span>');
    //     }
    // }
    //// Мусор --------------------------------------------------
};

// function injected_main() {
//     alert('Вот тут пишешь свой javascript код который будет жедать то, что нужно');
// }
// function injectHTML(){
//     let injectCSS='/frontend/css/inject_styles.css';
//     let text= '';
//     let hoverText='';
//     let hidden_setting='<span class="inject-text" text="DEFAULT TEXT" hover-text="NEW TEXT FROM ATTRIBUTE"></span>';
//     BROWSER_ACTION
// }

// <span class="inject-text" text="DEFAULT TEXT" hover-text="NEW TEXT FROM ATTRIBUTE"></span>