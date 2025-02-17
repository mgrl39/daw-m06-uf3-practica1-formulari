"use strict";
// Variables
const d = document;
const INDEX = "index.html";
const nomComplet = d.getElementById("nomComplet");
const dataNaixement = d.getElementById("dataNaixement");
const email = d.getElementById("emailPersona");
const passwd = d.getElementById("password");
const favMovie = d.getElementById("favMovie");
const genres = d.getElementById("genres");
const form = d.getElementById("mainForm");
// Buttons principals
let goToIndexButton = d.getElementById("button");
// let sendToIndexButton: HTMLInputElement = d.getElementById("Enviar") as HTMLInputElement;
// Event Listeners
// sendToIndexButton.addEventListener('submit', sendToIndex);
goToIndexButton.addEventListener('click', goToIndex);
form.addEventListener('submit', validateForm);
// Functions
function goToIndex() {
    window.location.href = INDEX;
}
const returnValue = (value) => d.getElementById(value).value.trim();
function sendToIndex(e) {
    e.preventDefault();
    inputIsInvalid();
    // localStorageSaver();
}
function inputIsInvalid() {
    console.log("FALTA IMPLEMENTAR");
}
// Funció per mostrar missatges d'error
const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
};
function validateForm(e) {
    e.preventDefault();
    let valid = true;
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    if (nomComplet.value.trim().length == 0) {
        showError("error-nom", "El nom no pot estar buit.");
        valid = false;
    }
    if (!dataNaixement.value) {
        showError("error-data", "La data de naixement no pot estar buida.");
        valid = false;
    }
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!emailRegex.test(email.value)) {
        showError("error-email", "El correu no és vàlid.");
        valid = false;
    }
    if (!passwordRegex.test(passwd.value)) {
        showError("error-password", "La contrasenya no compleix els requisits.");
        valid = false;
    }
    if (favMovie.value.trim() == "") {
        showError("error-pelicula", "Has d'escollir una pel·lícula.");
        valid = false;
    }
    if (genres.selectedOptions.length == 0) {
        showError("error-genres", "Has de seleccionar almenys un gènere.");
        valid = false;
    }
    if (valid) {
        localStorageSaver();
        form.submit();
    }
}
function localStorageSaver() {
    localStorage.setItem("nomComplet", nomComplet.value.trim());
    localStorage.setItem("dataNaixement", dataNaixement.value);
    localStorage.setItem("emailPersona", email.value.trim());
    localStorage.setItem("password", passwd.value);
    localStorage.setItem("favMovie", favMovie.value);
    let genresSelected = Array.from(genres.selectedOptions).map(option => option.value);
    localStorage.setItem("genres", JSON.stringify(genresSelected));
}
//# sourceMappingURL=formulari.js.map