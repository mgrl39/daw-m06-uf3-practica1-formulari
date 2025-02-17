"use strict";
// Variables
const d = document;
const INDEX = "index.html";
// Buttons principals
let form = d.getElementById("formulari");
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
const returnValue = (value) => d.getElementById(value).value;
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
//# sourceMappingURL=formulari.js.map