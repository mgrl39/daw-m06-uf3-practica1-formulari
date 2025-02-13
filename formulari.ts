// Variables
const d: Document = document;
const index: string = "index.html";

let goToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
let sendToIndexButton: HTMLInputElement = d.getElementById("Enviar") as HTMLInputElement;
let nomComplet : string = (d.getElementById("nom")as HTMLInputElement).value;
let naixementData : HTMLSpanElement = d.getElementById("dataNaixement") as HTMLSpanElement;

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

localStorage.setItem("nom",  nomComplet);
localStorage.setItem("data",  JSON.stringify(naixementData));