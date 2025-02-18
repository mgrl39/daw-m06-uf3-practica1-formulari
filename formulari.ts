// Variables
const d: Document = document;
const INDEX: string = "index.html";

//const sendToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
let nomComplet: HTMLInputElement;
let dataNaixement: HTMLInputElement;
let email: HTMLInputElement;
let passwd: HTMLInputElement;
let favMovie: HTMLInputElement;
let generes: HTMLSelectElement;
let form: HTMLFormElement;
let goToIndexButton: HTMLButtonElement;

const errorTipus: Map<string, string> = new Map([
    ["error-nom", "El nom no pot estar buit."],
    ["error-data", "La data de naixement no pot estar buida."],
    ["error-email", "El correu no és vàlid."],
    ["error-password", "La contrasenya no compleix els requisits."],
    ["error-pelicula", "Has d'escollir una pel·lícula."],
    ["error-generes", "Has de seleccionar almenys un gènere."],
    ["error-default", "Ha hagut un error."]
]);

// <==> Validacions <==>
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const isThisEmailValid = (email: string): boolean => emailRegex.test(email);
const isThisPasswordValid = (password: string): boolean => passwordRegex.test(password);

// <==> Inicialització <==>
d.addEventListener('DOMContentLoaded', () => {
    initializeValues();
    if (form) form.addEventListener('submit', validateForm);
    if (goToIndexButton) goToIndexButton.addEventListener('click', goToIndex);
});

function initializeValues(): void {
    nomComplet = d.getElementById("nomComplet") as HTMLInputElement;
    dataNaixement = d.getElementById("dataNaixement") as HTMLInputElement;
    email = d.getElementById("emailPersona") as HTMLInputElement;
    passwd = d.getElementById("password") as HTMLInputElement;
    favMovie = d.getElementById("favMovie") as HTMLInputElement;
    generes = d.getElementById("generes") as HTMLSelectElement
    form = d.getElementById("mainForm") as HTMLFormElement;
    goToIndexButton = d.getElementById("button") as HTMLButtonElement;
}

// <==> Buttons principals <==>
function goToIndex(): void {
    window.location.href = INDEX;
}

// <==> Clear Errors <==>
function clearErrors(): void {
    nomComplet.value = "";
    dataNaixement.value = "";
    email.value = "";
    passwd.value = "";
    favMovie.value = "";
    generes.value = "";
    // form.reset();
    // document.querySelectorAll(".error").forEach(el => el.textContent = "");
}

type Validation = {
    condition: boolean;
    errorId: string;
};

// <==> Return Value <==>
const returnValue = (value: string): string => (d.getElementById(value) as HTMLInputElement).value.trim();

// <==> Send To Index <==>
function sendToIndex(e: Event): void {
    e.preventDefault();
    inputIsInvalid();
    // localStorageSaver();
}

function inputIsInvalid(): void {
    console.log("FALTA IMPLEMENTAR");
}

// Funció per mostrar missatges d'error
const showError = (elementId: string): void => {
    const errorElement: HTMLSpanElement = document.getElementById(elementId) as HTMLSpanElement;
    const errorMessage: string | undefined = errorTipus.get(elementId);
    if (errorMessage) errorElement.textContent = errorMessage;
};

function validateForm(e: Event): void {
    e.preventDefault();
    console.clear();
    console.log("Longitud del nom: ", nomComplet.value.trim().length);
    console.log("Nom complet: ", nomComplet.value.trim());
    console.log("Generes: ", generes.selectedOptions.length);
    console.log("Data de naixement: ", dataNaixement.value);
    console.log("Correu: ", isThisEmailValid(email.value));
    console.log("Contrasenya: ", isThisPasswordValid(passwd.value));
    console.log("Pel·lícula: ", favMovie.value.trim());
    clearErrors();

    let hasErrors: boolean = false;
    const validations: Validation[] = [
        { condition: !nomComplet.value.trim().length, errorId: "error-nom" },
        { condition: !dataNaixement.value, errorId: "error-data" },
        { condition: !favMovie.value.trim(), errorId: "error-pelicula" },
        { condition: !isThisEmailValid(email.value), errorId: "error-email" },
        { condition: !isThisPasswordValid(passwd.value), errorId: "error-password" },
        { condition: generes.selectedOptions.length == 0, errorId: "error-generes" },
    ];

    const errors: string[] = validations
        .filter(validation => validation.condition)
        .map(validation => validation.errorId);

    console.log(errors);
    errors.forEach(error => showError(error));
    if (errors.length == 0) form.submit();
}