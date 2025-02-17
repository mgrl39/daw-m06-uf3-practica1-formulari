// Variables
const d: Document = document;
const INDEX: string = "index.html";

// Buttons principals
let form: HTMLFormElement = d.getElementById("formulari") as HTMLFormElement;
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