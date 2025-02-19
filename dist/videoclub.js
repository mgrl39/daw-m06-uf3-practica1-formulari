"use strict";
// Classe que representa un client del videoclub.
class Client {
    constructor(nom, naixement, email, password, pelicula, generes) {
        this.nom = nom;
        this.naixement = naixement;
        this.email = email;
        this.password = password;
        this.pelicula = pelicula;
        this.generes = generes;
    }
    get getNom() {
        return this.nom;
    }
    get getEmail() {
        return this.email;
    }
}
// Llista de clients i tipus de dades ClientData.
let clients = [];
// Funció per afegir un client a la llista i guardar-lo al localStorage.
const guardarClient = (client) => {
    clients.push(new Client(client.nom, client.naixement, client.email, client.password, client.pelicula, client.generes));
    localStorage.setItem("clients", JSON.stringify(clients));
    clients_map.set(client.nom, client.email);
};
// Validar si un mail es valid
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// Map que conté client i mail
const clients_map = new Map([
    ["Anna", "anna@example.com"],
    ["Joan", "joan@example.com"],
    ["Maria", "invalidemail"],
]);
// Arrays per a pel·lícules i videojocs
const movies = [];
const games = [];
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
    mostrarClients(clients_map);
}
;
// Event que s'executa quan el document s'ha carregat completament.
// S'utilitza un event listener per redirigir a la pàgina de formulari.
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("goToFormButton");
    if (!button)
        return;
    button.addEventListener("click", () => { window.location.href = "formulari.html"; });
});
// Carrega les dades del localStorage i les mostra. 
// Si hi ha dades, les parseja, afegint-les a la llista de clients.
window.addEventListener("load", () => {
    const existingClients = localStorage.getItem("clients");
    if (existingClients) {
        clients = JSON.parse(existingClients)
            .map((client) => new Client(client.nom, client.naixement, client.email, client.password, client.pelicula, client.generes));
    }
    ;
    clients.forEach(client => clients_map.set(client.getNom, client.getEmail));
    afegirClientNou();
    mostrarClients(clients_map);
});
// Funció per afegir un client nou.
// S'utilitza un URLSearchParams per obtenir les dades del formulari.
// Si algun camp no existeix, no es fa res.
function afegirClientNou() {
    const params = new URLSearchParams(window.location.search);
    const nom = params.get("nomComplet");
    const naixement = new Date(params.get("dataNaixement"));
    const email = params.get("emailPersona");
    const password = params.get("password");
    const pelicula = params.get("pelPreferida");
    const generes = params.get("generes");
    if (!nom || !naixement || !email || !password || !pelicula || !generes)
        return;
    let nouClient = { nom, naixement: new Date(naixement), email, password, pelicula, generes };
    guardarClient(nouClient);
}
//# sourceMappingURL=videoclub.js.map