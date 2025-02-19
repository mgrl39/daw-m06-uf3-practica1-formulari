class Client {
  private nom: string;
  private naixement: Date;
  private email: string;
  private password: string;
  private pelicula: string;
  private generes: string;

  constructor(nom: string, naixement: Date, email: string, password: string, pelicula: string, generes: string) {
    this.nom = nom;
    this.naixement = naixement;
    this.email = email;
    this.password = password;
    this.pelicula = pelicula;
    this.generes = generes;
  }

  get getNom(): string {
    return this.nom;
  }

  get getEmail(): string {
    return this.email;
  }

}

let clients: Client[] = JSON.parse(localStorage.getItem("clients") || "[]");

type ClientData = {
  nom: string;
  naixement: Date;
  email: string;
  password: string;
  pelicula: string;
  generes: string;
}

const guardarClient = (client: ClientData): void => { 
    clients.push(new Client(
        client.nom,
        client.naixement,
        client.email,
        client.password,
        client.pelicula,
        client.generes
    ));
    localStorage.setItem("clients", JSON.stringify(clients)); 
};

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//Map que conté client i mail
const clients_map: Map<string, string> = new Map<string, string>([
  ["Anna", "anna@example.com"],
  ["Joan", "joan@example.com"],
  ["Maria", "invalidemail"],
]);

function convertMapToObject(map: Map<string, string>): Client {
    return (new Client(map.get("nom")!, new Date(), map.get("email")!, map.get("email")!.substring(1, 4) + "1234506A*", "La Haru al regne dels gats", "Misteri"));
}

// Arrays per a pel·lícules i videojocs
const movies: string[] = [];
const games: string[] = [];

// Funció fletxa per validar emails

// Funció per mostrar clients
function mostrarClients(clients: Map<string, string>): void {
  const clientList = document.getElementById("clientList")!;
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

//Sobrecarrega de funcio afegirProducte, per afegir per input i per codi
function afegirProducte(): void;
function afegirProducte(producte: string, plataforma?: string): void;

//Funció per afegir videojoc o pel·licula
function afegirProducte(productName?: string, platform?: string): void {
  const input = document.getElementById("itemInput") as HTMLInputElement;

  // Utilizar valores de parámetros si se proporcionan, o del input si no
  const value = productName ? `${productName}${platform ? `,${platform}` : ""}` : input.value.trim();
  input.value = ""; // Buidar l'input després d'afegir

  //Comprovem si hi ha una coma per distingir entre videojoc i pel·licula
  if (value.includes(",")) {
    const [gameName, gamePlatform] = value.split(",").map(v => v.trim());
    if (gameName && gamePlatform) {
      games.push(gameName + "," + gamePlatform);
    }
  } else if (value) {
    movies.push(value);
  }
}

//Funció generica per escriure en la taula HTML. Si rep una array, imprimeix amb el seu titol i si rep les dos, ho imprimeix tot
function escriureTaula(titol: string, objectes: string[], objectes2?: string[]) {
  const tableContainer = document.getElementById("tableContainer")!;
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
function mostrarDades(tipus?: string): void {
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
function carregarDades(): void {
  afegirProducte("Final Fantasy X, PS2");
  afegirProducte("Pesadilla en Elm Street");
  mostrarClients(clients_map);
};

document.addEventListener("DOMContentLoaded", () => {
  const button: HTMLButtonElement = document.getElementById("goToFormButton") as HTMLButtonElement;
  if (!button) return console.error("Botó no trobat.");
  const existingClients: string | null = localStorage.getItem("clients");
  if (!existingClients) localStorage.setItem("clients", JSON.stringify(clients));
  button.addEventListener("click", () => { window.location.href = "formulari.html" });
});

window.addEventListener("load", loadInfo);
window.addEventListener("load", saveImportedInfo);

function loadInfo() : void {
  const existingClients: string | null = localStorage.getItem("clients");
  if (!existingClients)
  {
    for (const [name, email] of clients_map.entries()) {
      clients.push(convertMapToObject(new Map([[name, email]])));
    }
    localStorage.setItem("clients", JSON.stringify(clients));
  }
  else clients = JSON.parse(existingClients);
}

function saveImportedInfo() {
  const params : URLSearchParams = new URLSearchParams(window.location.search);
  const nouClient : ClientData = {
    nom: params.get("nomComplet")!,
    naixement: new Date(params.get("dataNaixement")!),
    email: params.get("emailPersona")!,
    password: params.get("password")!,
    pelicula: params.get("pelPreferida")!,
    generes: params.get("generes")!
  };
  guardarClient(nouClient);
  mostrarClients(clients_map);
}

function mostrarClientNou(): void {
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const nom: string = params.get("nomComplet")!;
  const naixement: Date = new Date(params.get("dataNaixement")!);
  const email: string = params.get("emailPersona")!;
  const password: string = params.get("password")!;
  const pelicula: string = params.get("pelPreferida")!;
  const generes: string = params.get("generes")!;

  if (!nom || !naixement || !email || !password || !pelicula || !generes) return;

  const nouClient: ClientData = {
    nom,
    naixement: new Date(naixement),
    email,
    password,
    pelicula,
    generes
  };
  guardarClient(nouClient);
}