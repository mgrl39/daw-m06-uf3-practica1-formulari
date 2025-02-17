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
form.addEventListener('submit', sendToIndex);
// Functions
function goToIndex() {
    window.location.href = INDEX;
}
const returnValue = (value) => d.getElementById(value).value.trim();
function sendToIndex(e) {
    e.preventDefault();
    inputIsInvalid();
    localStorageSaver();
}
function inputIsInvalid() {
    console.log("FALTA IMPLEMENTAR");
}
function localStorageSaver() {
    localStorage.setItem("nom", returnValue("nomComplet"));
    localStorage.setItem("email", returnValue("email"));
    localStorage.setItem("passwd", returnValue("passwd"));
    localStorage.setItem("data", returnValue("dataNaixement"));
    localStorage.setItem("pelis", returnValue("favMovie"));
    let genere = d.getElementById("genere");
    let genereOptions = Array.from(genere.selectedOptions).map(option => option.value);
    localStorage.setItem("genere", JSON.stringify(genereOptions));
}
document.addEventListener("DOMContentLoaded", eventsInitializator);
function eventsInitializator() {
}
//# sourceMappingURL=formulari.js.map