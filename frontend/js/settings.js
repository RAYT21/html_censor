document.addEventListener('DOMContentLoaded', () => {

    const backFromSet = document.querySelector('#back');
    const settings = document.querySelectorAll('.toggle-checkbox'); 

    backFromSet.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/frontend/html/menu.html';
    });
    

    settings.forEach((set, i) => {
        set.addEventListener('click', (e) => {

            if (set.checked) {
                localStorage.setItem(`set${i}`, '1');
            } else {
                localStorage.setItem(`set${i}`, '0');
            }

            if (JSON.parse(localStorage.getItem(`set${i}`))) {
                set.checked = true;
            } else {
                set.checked = false;
            }

            const settingString = localStorage.getItem('set0') + localStorage.getItem('set1') + localStorage.getItem('set2') + localStorage.getItem('set3');
            sendSettings(settingString)
        });

        if (JSON.parse(localStorage.getItem(`set${i}`))) {
            set.checked = true;
        } else {
            set.checked = false;
        }
    });

    async function sendSettings(settings){
        await fetch('http://127.0.0.1:5000/accountManager/settings/'+ localStorage.getItem("user_id") + '&' + settings);
    } 

});