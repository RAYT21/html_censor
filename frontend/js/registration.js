document.addEventListener('DOMContentLoaded', () => {

    const backMainBtn = document.querySelector('.back-btn');

    backMainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/index.html';
    });
    
});