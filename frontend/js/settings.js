document.addEventListener('DOMContentLoaded', () => {

    const backFromSet = document.querySelector('#back');

    backFromSet.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/html/menu.html';
    });
    
});