"use strict";
// Variables
const d = document;
const INDEX = "index.html";
//const sendToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
let nomComplet;
let dataNaixement;
let email;
let passwd;
let favMovie;
let generes;
let form;
let goToIndexButton;
const errorTipus = new Map([
    ["error-nom", "El nom no pot estar buit."],
    ["error-data", "La data de naixement no pot estar buida."],
    ["error-email", "El correu no és vàlid."],
    ["error-password", "La contrasenya no compleix els requisits."],
    ["error-pelicula", "Has d'escollir una pel·lícula."],
    ["error-generes", "Has de seleccionar almenys un gènere."],
    ["error-default", "Ha hagut un error."]
]);
// <==> Validacions <==>
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const isThisEmailValid = (email) => emailRegex.test(email);
const isThisPasswordValid = (password) => passwordRegex.test(password);
// <==> Inicialització <==>
d.addEventListener('DOMContentLoaded', () => {
    initializeValues();
    if (form)
        form.addEventListener('submit', validateForm);
    if (goToIndexButton)
        goToIndexButton.addEventListener('click', goToIndex);
});
function initializeValues() {
    nomComplet = d.getElementById("nomComplet");
    dataNaixement = d.getElementById("dataNaixement");
    email = d.getElementById("emailPersona");
    passwd = d.getElementById("password");
    favMovie = d.getElementById("favMovie");
    generes = d.getElementById("generes");
    form = d.getElementById("mainForm");
    goToIndexButton = d.getElementById("button");
}
// <==> Buttons principals <==>
function goToIndex() {
    window.location.href = INDEX;
}
// <==> Clear Errors <==>
function clearErrors() {
    nomComplet.value = "";
    dataNaixement.value = "";
    email.value = "";
    passwd.value = "";
    favMovie.value = "";
    generes.value = "";
    // form.reset();
    // document.querySelectorAll(".error").forEach(el => el.textContent = "");
}
// <==> Return Value <==>
const returnValue = (value) => d.getElementById(value).value.trim();
// <==> Send To Index <==>
function sendToIndex(e) {
    e.preventDefault();
    inputIsInvalid();
    // localStorageSaver();
}
function inputIsInvalid() {
    console.log("FALTA IMPLEMENTAR");
}
// Funció per mostrar missatges d'error
const showError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    const errorMessage = errorTipus.get(elementId);
    if (errorMessage)
        errorElement.textContent = errorMessage;
};
function validateForm(e) {
    e.preventDefault();
    alert("validateForm");
    clearErrors();
    let hasErrors = false;
    const validations = new Map([
        [nomComplet.value.trim().length == 0, "error-nom"],
        [generes.selectedOptions.length == 0, "error-generes"],
        [!dataNaixement.value, "error-data"],
        [!isThisEmailValid(email.value), "error-email"],
        [!isThisPasswordValid(passwd.value), "error-password"],
        [favMovie.value.trim() == "", "error-pelicula"]
    ]);
    validations.forEach((errorId, condition) => {
        if (condition) {
            showError(errorId);
            hasErrors = true;
        }
    });
    if (!hasErrors)
        form.submit();
}
//# sourceMappingURL=formulari.js.map