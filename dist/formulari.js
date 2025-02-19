"use strict";
// Definició de variables principals
const d = document;
const INDEX = "index.html";
// Definició dels elements del formulari
let nomComplet;
let dataNaixement;
let email;
let passwd;
let pelPreferida;
let generes;
let form;
let goToIndexButton;
let cleanErrorsButton;
// Declaro un mapa que defineix el tipus de les validacions.
// Conté el missatge d'error per cada tipus de validació.
const errorTipus = new Map([
    ["error-nom", "El nom no pot estar buit."],
    ["error-data", "La data de naixement no pot estar buida."],
    ["error-email", "El correu no és vàlid."],
    ["error-password", "La contrasenya no compleix els requisits."],
    ["error-pelicula", "Has d'escollir una pel·lícula."],
    ["error-generes", "Has de seleccionar almenys un gènere."],
    ["error-default", "Ha hagut un error."]
]);
// Expressions regulars per validar mail i password.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
// Funcions per validar mail i password.
const isThisEmailValid = (email) => emailRegex.test(email);
const isThisPasswordValid = (password) => passwordRegex.test(password);
// Inicialització de les variables i afegim event listeners quan la pàgina es carregi.
// Inicialitza els elements del formular, afegeix listeners per validar formulari i esborrar errors.
// Validacio e temps real per email i password.
d.addEventListener('DOMContentLoaded', () => {
    initializeValues();
    if (form)
        form.addEventListener('submit', validateForm);
    if (goToIndexButton)
        goToIndexButton.addEventListener('click', goToIndex);
    if (cleanErrorsButton)
        cleanErrorsButton.addEventListener('click', (e) => {
            e.preventDefault();
            clearErrors();
        });
    email.addEventListener("blur", () => validateValue(email.value, emailRegex, "error-email"));
    email.addEventListener("input", () => validateValue(email.value, emailRegex, "error-email"));
    passwd.addEventListener("blur", () => validateValue(passwd.value, passwordRegex, "error-password"));
    passwd.addEventListener("input", () => validateValue(passwd.value, passwordRegex, "error-password"));
});
// Funcio per validar un camp
function validateValue(value, regex, errorId) {
    const errorElement = d.getElementById(errorId);
    errorElement.textContent = regex.test(value) ? "" : errorTipus.get(errorId);
}
// Listener per evitar que l'usuari pugui enviar el formulari sense validar.
d.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        validateForm(e);
    }
});
// Inicialització de les variables del formulari
function initializeValues() {
    nomComplet = d.getElementById("nomComplet");
    dataNaixement = d.getElementById("dataNaixement");
    email = d.getElementById("emailPersona");
    passwd = d.getElementById("password");
    pelPreferida = d.getElementById("pelPreferida");
    generes = d.getElementById("generes");
    form = d.getElementById("mainForm");
    goToIndexButton = d.getElementById("button");
    cleanErrorsButton = d.getElementById("cleanErrors");
}
// Funció per anar a l'índex (anar a la pàgina principal)
const goToIndex = (e) => {
    e.preventDefault();
    window.location.href = INDEX;
};
// Funció per esborrar els missatges d'error
function clearErrors() {
    const errorElements = Array.from(d.querySelectorAll(".error-message"));
    errorElements.forEach((element) => element.textContent = "");
}
// Funció per mostrar missatges d'error
const showError = (elementId) => {
    const errorElement = d.getElementById(elementId);
    if (errorElement) {
        const errorMessage = errorTipus.get(elementId);
        if (errorMessage)
            errorElement.textContent = errorMessage;
    }
};
// Funció per imprimir informació (no es fa servir pero es pot utilitzar per debugar)
function printInfo() {
    console.clear();
    console.log("Longitud del nom: ", nomComplet.value.trim().length);
    console.log("Nom complet: ", nomComplet.value.trim());
    console.log("Generes: ", generes.selectedOptions.length);
    console.log("Data de naixement: ", dataNaixement.value);
    console.log("Correu: ", isThisEmailValid(email.value));
    console.log("Contrasenya: ", isThisPasswordValid(passwd.value));
    console.log("Pel·lícula: ", pelPreferida.value.trim());
}
// Funció per validar el formulari abans d'enviar-lo
// Esborrem errors previs, definim les validacions i mostrem errors si hi ha.
// Si no hi ha errors, enviem el formulari.
function validateForm(e) {
    e.preventDefault();
    clearErrors();
    const validations = [
        { condition: !nomComplet.value.trim().length, errorId: "error-nom" },
        { condition: !dataNaixement.value, errorId: "error-data" },
        { condition: !pelPreferida.value.trim(), errorId: "error-pelicula" },
        { condition: !isThisEmailValid(email.value), errorId: "error-email" },
        { condition: !isThisPasswordValid(passwd.value), errorId: "error-password" },
        { condition: generes.selectedOptions.length == 0, errorId: "error-generes" },
    ];
    let errors = [];
    for (const validation of validations)
        if (validation.condition)
            errors.push(validation.errorId);
    errors.forEach(error => showError(error));
    if (errors.length == 0)
        form.submit();
}
//# sourceMappingURL=formulari.js.map