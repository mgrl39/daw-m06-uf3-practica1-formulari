// Definició de les variables
const d: Document = document;
const INDEX: string = "index.html";

// Definició del tipus de les validacions
type Validation = {
    condition: boolean;
    errorId: string;
};

// Definició de les variables
let nomComplet: HTMLInputElement;
let dataNaixement: HTMLInputElement;
let email: HTMLInputElement;
let passwd: HTMLInputElement;
let pelPreferida: HTMLInputElement;
let generes: HTMLSelectElement;
let form: HTMLFormElement;
let goToIndexButton: HTMLButtonElement;
let cleanErrorsButton: HTMLButtonElement;

// Declaro un mapa que defineix el tipus de les validacions.
// Conté el missatge d'error per cada tipus de validació.
const errorTipus: Map<string, string> = new Map([
    ["error-nom", "El nom no pot estar buit."],
    ["error-data", "La data de naixement no pot estar buida."],
    ["error-email", "El correu no és vàlid."],
    ["error-password", "La contrasenya no compleix els requisits."],
    ["error-pelicula", "Has d'escollir una pel·lícula."],
    ["error-generes", "Has de seleccionar almenys un gènere."],
    ["error-default", "Ha hagut un error."]
]);

// Validacions: tenim el patró per a l'email i la password. Juntament amb la funció per a comprovar si és vàlid.
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const isThisEmailValid = (email: string): boolean => emailRegex.test(email);
const isThisPasswordValid = (password: string): boolean => passwordRegex.test(password);

// Inicialització de les variables i afegim event listeners.
d.addEventListener('DOMContentLoaded', () => {
    initializeValues();
    if (form) form.addEventListener('submit', validateForm);
    if (goToIndexButton) goToIndexButton.addEventListener('click', goToIndex);
    if (cleanErrorsButton) cleanErrorsButton.addEventListener('click', (e: Event) => {
        e.preventDefault();
        clearErrors();
    });
    email.addEventListener("blur", () => validateValue(email.value, emailRegex, "error-email"));
    email.addEventListener("input", () => validateValue(email.value, emailRegex, "error-email"));
    passwd.addEventListener("blur", () => validateValue(passwd.value, passwordRegex, "error-password"));
    passwd.addEventListener("input", () => validateValue(passwd.value, passwordRegex, "error-password"));
});

function validateValue(value: string, regex: RegExp, errorId: string) : void {
    const errorElement : HTMLSpanElement = d.getElementById(errorId)!;
    errorElement.textContent = regex.test(value) ? "" : errorTipus.get(errorId)!;
}

d.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key == "Enter") {
        e.preventDefault();
        validateForm(e);
    }
});


// Inicialització de les variables
function initializeValues(): void {
    nomComplet = d.getElementById("nomComplet") as HTMLInputElement;
    dataNaixement = d.getElementById("dataNaixement") as HTMLInputElement;
    email = d.getElementById("emailPersona") as HTMLInputElement;
    passwd = d.getElementById("password") as HTMLInputElement;
    pelPreferida = d.getElementById("pelPreferida") as HTMLInputElement;
    generes = d.getElementById("generes") as HTMLSelectElement
    form = d.getElementById("mainForm") as HTMLFormElement;
    goToIndexButton = d.getElementById("button") as HTMLButtonElement;
    cleanErrorsButton = d.getElementById("cleanErrors") as HTMLButtonElement;
}

// Funció per anar a l'índex
const goToIndex = (e: Event): void => {
    e.preventDefault();
    window.location.href = INDEX;
};

// Funció per esborrar errors
function clearErrors(): void {
    const errorElements: HTMLSpanElement[] = Array.from(d.querySelectorAll(".error-message"));
    //console.log(errorElements);
    //errorElements.forEach((element : HTMLSpanElement) => console.log(element.textContent));
    errorElements.forEach((element: HTMLSpanElement) => element.textContent = "");
}

// Funció per mostrar missatges d'error
const showError = (elementId: string): void => {
    const errorElement: HTMLSpanElement = d.getElementById(elementId) as HTMLSpanElement;
    if (errorElement) {
        const errorMessage: string | undefined = errorTipus.get(elementId);
        if (errorMessage) errorElement.textContent = errorMessage;
    }
};

// Funció per imprimir informació.
function printInfo(): void {
    console.clear();
    console.log("Longitud del nom: ", nomComplet.value.trim().length);
    console.log("Nom complet: ", nomComplet.value.trim());
    console.log("Generes: ", generes.selectedOptions.length);
    console.log("Data de naixement: ", dataNaixement.value);
    console.log("Correu: ", isThisEmailValid(email.value));
    console.log("Contrasenya: ", isThisPasswordValid(passwd.value));
    console.log("Pel·lícula: ", pelPreferida.value.trim());
}

// Funció per validar el formulari
function validateForm(e: Event): void {
    e.preventDefault();
    clearErrors();
    // printInfo();

    const validations: Validation[] = [
        { condition: !nomComplet.value.trim().length, errorId: "error-nom" },
        { condition: !dataNaixement.value, errorId: "error-data" },
        { condition: !pelPreferida.value.trim(), errorId: "error-pelicula" },
        { condition: !isThisEmailValid(email.value), errorId: "error-email" },
        { condition: !isThisPasswordValid(passwd.value), errorId: "error-password" },
        { condition: generes.selectedOptions.length == 0, errorId: "error-generes" },
    ];

    let errors: string[] = [];
    for (const validation of validations)
        if (validation.condition) errors.push(validation.errorId);

    // console.log(errors);
    errors.forEach(error => showError(error));
    if (errors.length == 0) form.submit();
}
