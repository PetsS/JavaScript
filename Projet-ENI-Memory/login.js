window.onload = init;

let signupForm = document.getElementById("signupForm");
let email = document.getElementById("inputEmail");
let password = document.getElementById("inputPassword");
let iconEmail = document.getElementById("inputEmail-icon");
let submitButton = document.getElementById("submitButton");

let isEmailOK = false;
let isPasswordOK = false;

let arrayTemp = [];

const userData = JSON.parse(localStorage.getItem("userdata"));
// const userConnected = JSON.parse(localStorage.getItem("userconnected"));

function init() {

    email.addEventListener("keyup", validateEmail);
    password.addEventListener("keyup", validatePassword);
    submitButton.addEventListener("click", submitData);
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
    let isValid = false;
    if (password.value.length > 0) {
        isValid = true;
    } else {
        isValid = false;
    }
    isPasswordOK = isValid;
    validateButton();
}

function validateButton() {
    if (isEmailOK && isPasswordOK) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function submitData() {
    let isEmailExist = false;
    let isPasswordExist = false;

    isEmailExist = userData.some(e => e.email === email.value);
    isPasswordExist = userData.some(e => e.password === password.value);



    if (isEmailExist) {
        if (isPasswordExist) {
            findUser();
            alert(email.value + " est connecté!");
            //appel profil page
            window.location.href = "profil.html";
        } else {
            alert("Erreur, mauvais mot de passe!");
            password.value = "";
        }
    } else {
        alert("Erreur, veuillez saisir votre email cerrectement!");
        email.value = "";
        validateEmail();
    }
}

function findUser() {
    let userName;
    let emailAdress;

    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email.value) {
            userName = userData[i].username;
            emailAdress = userData[i].email;
        }
    }
    
    arrayTemp.push({
        "username": userName,
        "email": emailAdress
    });

    localStorage.setItem("userconnected", JSON.stringify(arrayTemp));

}

