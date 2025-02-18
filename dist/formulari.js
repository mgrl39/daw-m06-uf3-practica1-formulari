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
    console.clear();
    console.log("Longitud del nom: ", nomComplet.value.trim().length);
    console.log("Nom complet: ", nomComplet.value.trim());
    console.log("Generes: ", generes.selectedOptions.length);
    console.log("Data de naixement: ", dataNaixement.value);
    console.log("Correu: ", isThisEmailValid(email.value));
    console.log("Contrasenya: ", isThisPasswordValid(passwd.value));
    console.log("Pel·lícula: ", favMovie.value.trim());
    clearErrors();
    let hasErrors = false;
    const validations = [
        { condition: !nomComplet.value.trim().length, errorId: "error-nom" },
        { condition: !dataNaixement.value, errorId: "error-data" },
        { condition: !favMovie.value.trim(), errorId: "error-pelicula" },
        { condition: !isThisEmailValid(email.value), errorId: "error-email" },
        { condition: !isThisPasswordValid(passwd.value), errorId: "error-password" },
        { condition: generes.selectedOptions.length == 0, errorId: "error-generes" },
    ];
    const errors = validations
        .filter(validation => validation.condition)
        .map(validation => validation.errorId);
    console.log(errors);
    errors.forEach(error => showError(error));
    if (errors.length == 0)
        form.submit();
}
//# sourceMappingURL=formulari.js.map