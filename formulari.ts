// Variables
const d: Document = document;
const INDEX: string = "index.html";

const nomComplet: HTMLInputElement = d.getElementById("nomComplet") as HTMLInputElement;
const dataNaixement: HTMLInputElement = d.getElementById("dataNaixement") as HTMLInputElement;
const email: HTMLInputElement = d.getElementById("emailPersona") as HTMLInputElement;
const passwd: HTMLInputElement = d.getElementById("password") as HTMLInputElement;
const favMovie: HTMLInputElement = d.getElementById("favMovie") as HTMLInputElement;
const genres: HTMLSelectElement = d.getElementById("genres") as HTMLSelectElement;
const form: HTMLFormElement = d.getElementById("mainForm") as HTMLFormElement;

// Buttons principals
let goToIndexButton: HTMLButtonElement = d.getElementById("button") as HTMLButtonElement;
// let sendToIndexButton: HTMLInputElement = d.getElementById("Enviar") as HTMLInputElement;

// Event Listeners
// sendToIndexButton.addEventListener('submit', sendToIndex);
goToIndexButton.addEventListener('click', goToIndex);
form.addEventListener('submit', validateForm);

// Functions
function goToIndex(): void {
    window.location.href = INDEX;
}

const returnValue = (value: string): string => (d.getElementById(value) as HTMLInputElement).value.trim();

function sendToIndex(e: Event): void {
    e.preventDefault();
    inputIsInvalid();
    // localStorageSaver();
}

function inputIsInvalid(): void {
    console.log("FALTA IMPLEMENTAR");
}

// Funció per mostrar missatges d'error
const showError = (elementId: string, message: string): void => {
    const errorElement: HTMLSpanElement = document.getElementById(elementId) as HTMLSpanElement;
    errorElement.textContent = message;
};

function validateForm(e: Event): void {
    e.preventDefault();
    let valid: boolean = true;

    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");
    if (nomComplet.value.trim().length == 0) {
        showError("error-nom", "El nom no pot estar buit.");
        valid = false;
    }
    if (!dataNaixement.value) {
        showError("error-data", "La data de naixement no pot estar buida.");
        valid = false;
    }
    const emailRegex : RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordRegex : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!emailRegex.test(email.value)) {
        showError("error-email", "El correu no és vàlid.");
        valid = false;
    }
    if (!passwordRegex.test(passwd.value)) {
        showError("error-password", "La contrasenya no compleix els requisits.");
        valid = false;
    }
    if (favMovie.value.trim() == "") {
        showError("error-pelicula", "Has d'escollir una pel·lícula.");
        valid = false;
    }
    if (genres.selectedOptions.length == 0) {
        showError("error-genres", "Has de seleccionar almenys un gènere.");
        valid = false;
    }
    if (valid) {
        localStorageSaver();
        form.submit();
    }
}

function localStorageSaver(): void {
    localStorage.setItem("nomComplet", nomComplet.value.trim());
    localStorage.setItem("dataNaixement", dataNaixement.value);
    localStorage.setItem("emailPersona", email.value.trim());
    localStorage.setItem("password", passwd.value);
    localStorage.setItem("favMovie", favMovie.value);
    
    let genresSelected = Array.from(genres.selectedOptions).map(option => option.value);
    localStorage.setItem("genres", JSON.stringify(genresSelected));
}