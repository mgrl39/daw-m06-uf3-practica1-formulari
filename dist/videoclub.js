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
    get getNom() {
        return this.nom;
    }
    get getEmail() {
        return this.email;
    }
}
let clients = JSON.parse(localStorage.getItem("clients") || "[]");
const guardarClient = (client) => {
    clients.push(new Client(client.nom, client.naixement, client.email, client.password, client.pelicula, client.generes));
    localStorage.setItem("clients", JSON.stringify(clients));
};
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//Map que conté client i mail
const clients_map = new Map([
    ["Anna", "anna@example.com"],
    ["Joan", "joan@example.com"],
    ["Maria", "invalidemail"],
]);
function convertMapToObject(map) {
    return (new Client(map.get("nom"), new Date(), map.get("email"), map.get("email").substring(1, 4) + "1234506A*", "La Haru al regne dels gats", "Misteri"));
}
// Arrays per a pel·lícules i videojocs
const movies = [];
const games = [];
// Funció fletxa per validar emails
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
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("goToFormButton");
    if (!button)
        return console.error("Botó no trobat.");
    const existingClients = localStorage.getItem("clients");
    if (!existingClients)
        localStorage.setItem("clients", JSON.stringify(clients));
    button.addEventListener("click", () => { window.location.href = "formulari.html"; });
});
window.addEventListener("load", loadInfo);
window.addEventListener("load", saveImportedInfo);
function loadInfo() {
    const existingClients = localStorage.getItem("clients");
    if (!existingClients) {
        for (const [name, email] of clients_map.entries()) {
            clients.push(convertMapToObject(new Map([[name, email]])));
        }
        localStorage.setItem("clients", JSON.stringify(clients));
    }
    else
        clients = JSON.parse(existingClients);
}
function saveImportedInfo() {
    const params = new URLSearchParams(window.location.search);
    const nouClient = {
        nom: params.get("nomComplet"),
        naixement: new Date(params.get("dataNaixement")),
        email: params.get("emailPersona"),
        password: params.get("password"),
        pelicula: params.get("pelPreferida"),
        generes: params.get("generes")
    };
    guardarClient(nouClient);
    mostrarClients(clients_map);
}
function mostrarClientNou() {
    const params = new URLSearchParams(window.location.search);
    const nom = params.get("nomComplet");
    const naixement = new Date(params.get("dataNaixement"));
    const email = params.get("emailPersona");
    const password = params.get("password");
    const pelicula = params.get("pelPreferida");
    const generes = params.get("generes");
    if (!nom || !naixement || !email || !password || !pelicula || !generes)
        return;
    const nouClient = {
        nom,
        naixement: new Date(naixement),
        email,
        password,
        pelicula,
        generes
    };
    guardarClient(nouClient);
}
//# sourceMappingURL=videoclub.js.map