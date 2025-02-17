"use strict";
class Client {
    constructor(nom, naixement, email, password, pelicula, generes) {
        this.nom = nom;
        this.naixement = naixement;
        this.email = email;
        this.password = password;
        this.pelicula = pelicula;
        this.generes = generes;
    }
}
//Map que conté client i mail
const clients = new Map([
    ["Anna", "anna@example.com"],
    ["Joan", "joan@example.com"],
    ["Maria", "invalidemail"],
]);
// Arrays per a pel·lícules i videojocs
const movies = [];
const games = [];
// Funció fletxa per validar emails
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// Funció per mostrar clients
function mostrarClients(clients) {
    const clientList = document.getElementById("clientList");
    // Netejar llista anterior
    clientList.innerHTML = "";
    //Comprovem cada valor de cada clau si el mail es correcte i si ho és, ho escrivim al HTML
    clients.forEach((value, key) => {
        if (isValidEmail(value)) {
            const li = document.createElement("li");
            li.textContent = `${key}: ${value}`;
            clientList.appendChild(li);
        }
    });
}
//Funció per afegir videojoc o pel·licula
function afegirProducte(productName, platform) {
    const input = document.getElementById("itemInput");
    // Utilizar valores de parámetros si se proporcionan, o del input si no
    const value = productName ? `${productName}${platform ? `,${platform}` : ""}` : input.value.trim();
    input.value = ""; // Buidar l'input després d'afegir
    //Comprovem si hi ha una coma per distingir entre videojoc i pel·licula
    if (value.includes(",")) {
        const [gameName, gamePlatform] = value.split(",").map(v => v.trim());
        if (gameName && gamePlatform) {
            games.push(gameName + "," + gamePlatform);
        }
    }
    else if (value) {
        movies.push(value);
    }
}
//Funció generica per escriure en la taula HTML. Si rep una array, imprimeix amb el seu titol i si rep les dos, ho imprimeix tot
function escriureTaula(titol, objectes, objectes2) {
    const tableContainer = document.getElementById("tableContainer");
    // Netejar informació anterior
    tableContainer.innerHTML = "";
    //Creem taula i capçalera amb les dades corresponents
    const table = document.createElement("table");
    const header = document.createElement("tr");
    header.innerHTML = objectes2 ? "<th>Pel·lícules</th><th>Videojocs</th>" : "<th>" + titol + "</th>";
    table.appendChild(header);
    //Agafem el màxim entre les dos llistes per veure fins quin punt hem de recorrer
    const maxLength = Math.max(objectes.length, objectes2 ? objectes2.length : 0);
    //Creem per cada posició una fila i l'afegim
    for (let i = 0; i < maxLength; i++) {
        const row = document.createElement("tr");
        row.innerHTML = objectes2 ? `<td>${objectes[i] || ""}</td><td>${objectes2[i] || ""}</td>` : `<td>${objectes[i]}</td>`;
        table.appendChild(row);
    }
    tableContainer.appendChild(table);
}
// Funció per mostrar les dades segons el que cliquin
function mostrarDades(tipus) {
    switch (tipus) {
        case "Pel·licules":
            escriureTaula(tipus, movies);
            break;
        case "Videojocs":
            escriureTaula(tipus, games);
            break;
        default:
            escriureTaula("", movies, games);
            break;
    }
}
// Mostrar clients quan es carrega la pàgina
function carregarDades() {
    afegirProducte("Final Fantasy X, PS2");
    afegirProducte("Pesadilla en Elm Street");
    mostrarClients(clients);
}
;
document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("goToFormButton");
    if (button)
        button.addEventListener("click", () => { window.location.href = "formulari.html"; });
});
//# sourceMappingURL=videoclub.js.map