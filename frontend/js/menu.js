document.addEventListener('DOMContentLoaded', () => {
    const infoDivs = document.querySelectorAll('.user-info');
    const exitBtn = document.querySelector('#exit');
    infoDivs[1].textContent = localStorage.getItem("login");
    exitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem("login");
        localStorage.removeItem("user_id");
        window.location.href = '/frontend/html/index.html';
    });
});
