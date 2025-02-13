"use strict";
// Variables
const d = document;
const index = "index.html";
let goToIndexButton = d.getElementById("button");
let sendToIndexButton = d.getElementById("Enviar");
let nomComplet = d.getElementById("nom").value;
let naixementData = d.getElementById("dataNaixement");
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
localStorage.setItem("nom", nomComplet);
localStorage.setItem("data", JSON.stringify(naixementData));
//# sourceMappingURL=formulari.js.map