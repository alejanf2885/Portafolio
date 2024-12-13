// src/js/gitAPI.js
const username = "alejanf2885";
const reposContainer = document.getElementById("repos-container");

// Función para obtener los repositorios
function fetchRepositories() {
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  fetch(reposUrl)
    .then((response) => response.json())
    .then((repos) => {
      repos.forEach((repo) => {
        const repoName = repo.name;

        // Excluir el repositorio "Portafolio"
        if (repoName === "Portafolio") return;

        const repoDescription = repo.description || "Sin descripción";
        const repoUrl = repo.html_url;

        // Obtener el número de commits
        fetchCommits(repoName)
          .then((numCommits) => {
            createCard(repoName, repoDescription, numCommits, repoUrl);
          })
          .catch((err) => {
            console.error(`Error al obtener commits para ${repoName}:`, err);
            createCard(repoName, repoDescription, "No disponible", repoUrl);
          });
      });
    })
    .catch((err) => {
      console.error("Error al obtener los repositorios:", err);
    });
}

// Función para obtener los commits de un repositorio
function fetchCommits(repoName) {
  const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits`;

  return fetch(commitsUrl)
    .then((response) => {
      if (!response.ok) throw new Error("No se pudo obtener los commits");
      return response.json();
    })
    .then((commits) => commits.length);
}

// Función para crear una card utilizando createElement
function createCard(repoName, repoDescription, numCommits, repoUrl) {
  // Crear elementos DOM para la card
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute('data-aos', 'flip-up');


  const title = document.createElement("h3");
  title.textContent = repoName;

  const description = document.createElement("p");
  description.textContent = repoDescription;

  const commitsContainer = document.createElement("div");
  commitsContainer.classList.add("commits-container");

  const commits = document.createElement("span");
  commits.innerHTML = `<i class="fa fa-code-fork"></i> ${numCommits}`;

  const eyeLink = document.createElement("a");
  eyeLink.href = repoUrl;
  eyeLink.target = "_blank"; // Abre el enlace en una nueva pestaña
  eyeLink.classList.add("repo-link");

  const eyeIcon = document.createElement("i");
  eyeIcon.classList.add("fa", "fa-eye");

  eyeLink.appendChild(eyeIcon);
  commitsContainer.appendChild(commits);
  commitsContainer.appendChild(eyeLink);

  // Añadir elementos al contenedor de la card
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(commitsContainer);

  // Añadir la card al contenedor principal
  reposContainer.appendChild(card);
}


// Inicializar Vanilla Tilt en las cards
document.addEventListener("DOMContentLoaded", () => {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 15,
    speed: 400,
  });
});

// Llamar a la función principal
fetchRepositories();