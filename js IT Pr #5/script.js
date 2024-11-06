function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

window.onload = function() {
    let username = getCookie('username');
    let email = getCookie('email');

    if (username && email) {
        window.location.href = 'user.html';
    }
};

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let errorMessage = document.getElementById('error-message');

    errorMessage.innerHTML = '';

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        errorMessage.innerHTML += 'Некоректний формат електронної пошти.<br>';
    } else if (email.split('@')[0].length < 3) {
        errorMessage.innerHTML += 'Перед символом @ має бути мінімум 3 символи.<br>';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.innerHTML += 'Пароль має містити щонайменше 6 символів, 1 велику літеру, 1 малу літеру та 1 цифру.<br>';
    }

    if (password !== confirmPassword) {
        errorMessage.innerHTML += 'Паролі не збігаються.<br>';
    }

    if (errorMessage.innerHTML === '') {
        function setCookie(name, value, days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            let expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        setCookie('username', username, 7);
        setCookie('email', email, 7);

        window.location.href = 'user.html';
    }
});