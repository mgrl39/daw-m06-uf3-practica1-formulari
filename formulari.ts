// Variables
const d: Document = document;
const INDEX: string = "index.html";

const nomComplet : HTMLInputElement = d.getElementById("nomComplet") as HTMLInputElement;
const dataNaixement : HTMLInputElement = d.getElementById("dataNaixement") as HTMLInputElement;
const email : HTMLInputElement = d.getElementById("emailPersona") as HTMLInputElement;
const passwd : HTMLInputElement = d.getElementById("password") as HTMLInputElement;
const favMovie : HTMLInputElement = d.getElementById("favMovie") as HTMLInputElement;
const genres : HTMLSelectElement = d.getElementById("genres") as HTMLSelectElement;
const form : HTMLFormElement = d.getElementById("mainForm") as HTMLFormElement;

// Buttons principals
let goToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
// let sendToIndexButton: HTMLInputElement = d.getElementById("Enviar") as HTMLInputElement;

// Event Listeners
// sendToIndexButton.addEventListener('submit', sendToIndex);
goToIndexButton.addEventListener('click', goToIndex);
form.addEventListener('submit', sendToIndex);

// Functions
function goToIndex() {
    window.location.href = INDEX;
}

const returnValue = (value: string): string => (d.getElementById(value) as HTMLInputElement).value.trim();

function sendToIndex(e: Event) {
    e.preventDefault();
    inputIsInvalid();
    localStorageSaver();
}

function inputIsInvalid() {
    console.log("FALTA IMPLEMENTAR");
}

function localStorageSaver() : void
{
    localStorage.setItem("nom", returnValue("nomComplet"));
    localStorage.setItem("email", returnValue("email"));
    localStorage.setItem("passwd", returnValue("passwd"));
    localStorage.setItem("data", returnValue("dataNaixement"));
    localStorage.setItem("pelis", returnValue("favMovie"));

    let genere: HTMLSelectElement = d.getElementById("genere") as HTMLSelectElement;
    let genereOptions: string[] = Array.from(genere.selectedOptions).map(option => option.value);
    localStorage.setItem("genere", JSON.stringify(genereOptions));
}

document.addEventListener("DOMContentLoaded", eventsInitializator);



function eventsInitializator() : void {
    
}