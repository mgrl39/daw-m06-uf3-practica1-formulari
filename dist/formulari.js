"use strict";
// Variables
const d = document;
const index = "index.html";
// Buttons principals
let goToIndexButton = d.getElementById("button");
let sendToIndexButton = d.getElementById("Enviar");
// Event Listeners
goToIndexButton.addEventListener('click', goToIndex);
sendToIndexButton.addEventListener('submit', sendToIndex);
// Functions
function goToIndex() {
    window.location.href = index;
}
function sendToIndex(e) {
    e.preventDefault();
    alert("XD");
}
// ===============
//  LOCAL STORAGE
// ===============
const returnValue = function (value) {
    return (d.getElementById(value).value);
};
let nomComplet = returnValue("nomComplet");
let email = returnValue("email");
let passwd = returnValue("contrasenya");
let naixementData = d.getElementById("dataNaixement");
let pelicula = d.getElementById("pellicula");
let genere = d.getElementById("genere");
localStorage.setItem("nom", nomComplet);
localStorage.setItem("email", email);
localStorage.setItem("passwd", passwd);
localStorage.setItem("data", JSON.stringify(naixementData));
localStorage.setItem("pelis", JSON.stringify(pelicula));
localStorage.setItem("genere", JSON.stringify(genere));
// No se si funcionara pero hago un alert pa enterarme de algo.
// alert(localStorage);
//# sourceMappingURL=formulari.js.map