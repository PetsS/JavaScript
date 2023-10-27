window.onload = init;

let signupForm = document.getElementById("signupForm");
let user = document.getElementById("inputUser");
let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPassword");
let passwordConfirm = document.getElementById("inputPasswordConfirm");
let iconUser = document.getElementById("inputUser-icon");
let commentUser = document.getElementById("signup-comment-user");
let iconEmail = document.getElementById("inputEmail-icon");
let passwordLevel = document.getElementById("inputPassword-level");
let iconPasswordConfirm = document.getElementById("inputPasswordConfirm-icon");
let submitButton = document.getElementById("submitButton");

let isUserNameOK = false;
let isEmailOK = false;
let isPasswordOK = false;
let isPasswordConfirmOK = false;

const userData = JSON.parse(localStorage.getItem("userdata"));

function init() {

    user.addEventListener("keyup", validateUsername);
    email.addEventListener("keyup", validateEmail);
    password.addEventListener("keyup", validatePassword);
    passwordConfirm.addEventListener("keyup", validatePasswordConfirm);
    submitButton.addEventListener("click", submitData);
    // createEmptyLocastorage();
}

function validateUsername() {
    let isValid = false;
    if (user.value.length < 1) {
        commentUser.style.visibility = "hidden";
        iconUser.style.visibility = "hidden";
    } else {
        if (user.value.length > 3) {
            commentUser.style.visibility = "hidden";
            iconUser.style.visibility = "visible";
            iconUser.setAttribute("class", "fa fa-fw fa-check");
            isValid = true;
        } else {
            commentUser.style.visibility = "visible";
            iconUser.style.visibility = "visible";
            iconUser.setAttribute("class", "fa fa-times");
        }
    }
    isUserNameOK = isValid;
    validateButton();
}

function validateEmail() {
    let isValid = false;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.value.length < 1) {
        iconEmail.style.visibility = "hidden";
    } else {
        if (email.value.match(regex)) {
            iconEmail.style.visibility = "visible";
            iconEmail.setAttribute("class", "fa fa-fw fa-check");
            isValid = true;
        } else {
            iconEmail.setAttribute("class", "fa fa-times");
            iconEmail.style.visibility = "visible";
        }
    }
    isEmailOK = isValid;
    validateButton();
}

function validatePassword() {
    let sCase, uCase, number, special, limit = false;
    let isValid = false;

    password.value.match(/[a-z]/) ? sCase = true : sCase = false;
    password.value.match(/[A-Z]/) ? uCase = true : uCase = false;
    password.value.match(/[0-9]/) ? number = true : number = false;
    password.value.match(/[!@#$%^&*]/) ? special = true : special = false;
    password.value.length >= 6 ? limit = true : limit = false;

    if (password.value.length < 1) {
        passwordLevel.style.visibility = "hidden";
    } else {
        passwordLevel.style.visibility = "visible";
        if (password.value.length < 3) {
            passwordLevel.innerText = "Faible";
            passwordLevel.style.color = "orange";
        } else if (password.value.length < 6) {
            passwordLevel.innerText = "Moyen";
            passwordLevel.style.color = "yellow";
        } else if (sCase && uCase && number && special && limit) {
            passwordLevel.innerText = "Fort";
            passwordLevel.style.color = "green";
        }
        isValid = true;
    }
    isPasswordOK = isValid;
    validateButton();
}

function validatePasswordConfirm() {
    let isValid = false;
    if (passwordConfirm.value.length < 1) {
        iconPasswordConfirm.style.visibility = "hidden";
    } else {
        if (password.value == passwordConfirm.value) {
            iconPasswordConfirm.setAttribute("class", "fa fa-fw fa-check");
            iconPasswordConfirm.style.visibility = "visible";
            isValid = true;
        } else {
            iconPasswordConfirm.setAttribute("class", "fa fa-times");
            iconPasswordConfirm.style.visibility = "visible";
        }
    }
    isPasswordConfirmOK = isValid;
    validateButton();
}

function validateButton() {
    if (isUserNameOK && isEmailOK && isPasswordOK && isPasswordConfirmOK) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function submitData() {
    let isUsernameExist = false;
    let isEmailExist = false;

    isUsernameExist = userData.some(e => e.username === user.value);
    isEmailExist = userData.some(e => e.email === email.value);

    if (!isUsernameExist) {
        if (!isEmailExist) {

            userData.push({
                "username": user.value,
                "email": email.value,
                "password": password.value
            });

            localStorage.setItem("userdata", JSON.stringify(userData));

            //reset la page
            signupForm.reset();
            submitButton.disabled = true;
            validateUsername();
            validateEmail();
            validatePassword();
            validatePasswordConfirm();

            //appel login page
            window.location.href = "login.html";

        } else {
            alert("L'email " + email.value + " est déjà utilisé. Veuillez saisir un nouvel email!");
            email.value = "";
            validateEmail();
        }
    } else {
        alert("L'utilisateur " + user.value + " est déjà utilisé. Veuillez saisir un nouvel nom d'utilisateur!");
        user.value = "";
        validateUsername();
    }
}

// function createEmptyLocastorage() {
//     let array = [];
//     array.push({
//         "username": "",
//         "email": "",
//         "password": ""
//     });

//     localStorage.setItem("userdata", JSON.stringify(array));
// }
