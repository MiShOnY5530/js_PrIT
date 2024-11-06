function saveData() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthYear = document.getElementById('birthYear').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const skype = document.getElementById('skype').value;

    const currentYear = new Date().getFullYear();

    const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄє]+$/;
    const phoneRegex = /^[\d\s\-\(\)]{10,12}$/;

    if (!nameRegex.test(firstName) || firstName.length > 20) {
        alert('Invalid first name');
        return;
    }

    if (!nameRegex.test(lastName) || lastName.length > 20) {
        alert('Invalid last name');
        return;
    }

    if (birthYear < 1900 || birthYear > currentYear) {
        alert('Invalid birth year');
        return;
    }

    if (!gender) {
        alert('Please select a gender');
        return;
    }

    if (phone && !phoneRegex.test(phone)) {
        alert('Invalid phone number');
        return;
    }

    setCookie('firstName', firstName, 1);
    setCookie('lastName', lastName, 1);
    setCookie('birthYear', birthYear, 1);
    setCookie('gender', gender, 1);
    if (phone) setCookie('phone', phone, 1);
    if (skype) setCookie('skype', skype, 1);

    alert('Data saved!');
}

function setCookie(name, value, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function exitPage() {
    deleteCookie('firstName');
    deleteCookie('lastName');
    deleteCookie('birthYear');
    deleteCookie('gender');
    deleteCookie('phone');
    deleteCookie('skype');
    window.location.href = '/registration.html';
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

window.onload = function() {
    const firstName = getCookie('firstName');
    const lastName = getCookie('lastName');
    const birthYear = getCookie('birthYear');
    const gender = getCookie('gender');
    const phone = getCookie('phone');
    const skype = getCookie('skype');

    if (!firstName || !lastName || !birthYear || !gender) {
        window.location.href = '/registration.html';
    } else {
        document.getElementById('firstName').value = firstName;
        document.getElementById('lastName').value = lastName;
        document.getElementById('birthYear').value = birthYear;
        document.getElementById('gender').value = gender;
        if (phone) document.getElementById('phone').value = phone;
        if (skype) document.getElementById('skype').value = skype;
    }
};

function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
