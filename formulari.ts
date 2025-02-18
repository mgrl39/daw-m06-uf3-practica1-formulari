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

const returnValue = (value: string): string => (d.getElementById(value) as HTMLInputElement).value.trim();
// const emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
// const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

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
    alert("validateForm");
    clearErrors();

    let hasErrors: boolean = false;
    const validations: Map<boolean, string> = new Map([
        [nomComplet.value.trim().length == 0, "error-nom"],
        [generes.selectedOptions.length == 0, "error-generes"],
        [!dataNaixement.value, "error-data"],
        [!isThisEmailValid(email.value), "error-email"],
        [!isThisPasswordValid(passwd.value), "error-password"],
        [favMovie.value.trim() == "", "error-pelicula"]
    ]);
    validations.forEach((errorId: string, condition: boolean) => {
        if (condition) {
            showError(errorId);
            hasErrors = true;
        }
    });
    if (!hasErrors)
        form.submit();
}