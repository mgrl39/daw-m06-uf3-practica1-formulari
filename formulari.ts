// Variables
const d: Document = document;
const index: string = "index.html";

// Buttons principals
let goToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
let sendToIndexButton: HTMLInputElement = d.getElementById("Enviar") as HTMLInputElement;

// Event Listeners
goToIndexButton.addEventListener('click', goToIndex);
sendToIndexButton.addEventListener('submit', sendToIndex);

// Functions
function goToIndex() {
    window.location.href = index;
}

function sendToIndex(e: Event) {
    e.preventDefault();
    alert("XD");
}

// ===============
//  LOCAL STORAGE
// ===============
const returnValue = function (value: string): string {
    return ((d.getElementById(value) as HTMLInputElement).value);
}

let nomComplet: string = returnValue("nomComplet");
let email: string = returnValue("email");
let passwd: string = returnValue("contrasenya");
let naixementData: HTMLSpanElement = d.getElementById("dataNaixement") as HTMLSpanElement;
let pelicula: HTMLDataListElement = d.getElementById("pellicula") as HTMLDataListElement;
let genere: HTMLSelectElement = d.getElementById("genere") as HTMLSelectElement;

localStorage.setItem("nom", nomComplet);
localStorage.setItem("email", email);
localStorage.setItem("passwd", passwd);
localStorage.setItem("data", JSON.stringify(naixementData));
localStorage.setItem("pelis", JSON.stringify(pelicula));
localStorage.setItem("genere", JSON.stringify(genere));
// No se si funcionara pero hago un alert pa enterarme de algo.
// alert(localStorage);