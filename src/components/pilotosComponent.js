class PilotosComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.getTeams();
    this.getPilots();

    const searchInput = this.querySelector("#search-input");
    searchInput.addEventListener("input", () => this.filterBySearch(searchInput.value.toLowerCase()));

    const closeModalBtn = this.querySelector("#close-modal");
    const modal = this.querySelector("#modal");
    const showAllBtn = this.querySelector("#show-all");

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    showAllBtn.addEventListener("click", () => {
      this.getTeams();
      this.getPilots();
      showAllBtn.style.display = "none";
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        @import url("http://localhost:5502/src/styles/pilotoStyles.css");
        @import url("http://localhost:5502/src/styles/menu.css");
      </style>

      <header class="nav-bar">
        <div class="logo">
          <img src="../../src/img/image.png" alt="F1 Logo">
        </div>
        <nav>
          <ul>
            <li><a href="../../src/views/menu.html">Home</a></li>
            <li><a href="../../src/views/vehiculos.html">Vehículos</a></li>
            <li><a href="../../src/views/Pilotos.html">Teams</a></li>
            <li><a href="../../src/views/pistas.html">Circuits</a></li>
            <li><a href="../../src/views/tabla.html">Resultados</a></li>
          </ul>
        </nav>
      </header>

      <div class="title-container">
        <h1>Galería de Equipos Y Pilotos</h1>
        <input type="text" id="search-input" placeholder="Buscar piloto o equipo...">
      </div>

      <h2>Escuderías</h2>
      <div class="teams-container" id="teams-container"></div>

      <button id="show-all">Ver Todos los Equipos y Pilotos</button>

      <h2>Pilotos</h2>
      <div class="grid-container" id="pilots-container"></div>

      <div id="modal" class="modal">
        <div class="modal-content">
          <img id="pilot-img" src="" alt="Imagen del piloto" class="modal-img"> <!-- Imagen del piloto -->
          <h2 id="pilot-name"></h2>
          <p><strong>Equipo:</strong> <span id="pilot-team"></span></p>
          <p><strong>Rol:</strong> <span id="pilot-role"></span></p>
          <p><strong>Fecha de Nacimiento:</strong> <span id="pilot-birthdate"></span></p>
          <p><strong>Nacionalidad:</strong> <span id="pilot-nationality"></span></p>
          <button id="close-modal" class="close-btn">Cerrar</button>
        </div>
      </div>
    `;
  }

  async getTeams() {
    const apiUrl = "http://localhost:4000/equipos";
    const teamsContainer = this.querySelector("#teams-container");

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const teams = await response.json();
      teamsContainer.innerHTML = "";

      teams.forEach((team) => {
        const card = document.createElement("div");
        card.className = "team-card";
        card.setAttribute("data-nombre", team.nombre);
        card.innerHTML = `
          <img src="${team.logo}" alt="${team.nombre}" class="team-logo">
        `;

        card.addEventListener("click", () => {
          this.filterByTeamSelection(team.nombre);
        });

        teamsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  }

  filterByTeamSelection(teamName) {
    const teamsContainer = this.querySelector("#teams-container");
    const showAllBtn = this.querySelector("#show-all");
  
    // Llamar a la función para obtener los pilotos del equipo seleccionado
    this.getPilots(teamName);
  
    // Eliminar todos los equipos que no sean el seleccionado
    teamsContainer.querySelectorAll(".team-card").forEach(card => {
      if (card.getAttribute("data-nombre") !== teamName) {
        card.remove(); // Elimina el logo del equipo no seleccionado
      }
    });
  
    // Mostrar el botón para ver todos los equipos
    showAllBtn.style.display = "block";
  }

  showPilotModal(pilot) {
    const modal = this.querySelector("#modal");
    const pilotName = this.querySelector("#pilot-name");
    const pilotTeam = this.querySelector("#pilot-team");
    const pilotRole = this.querySelector("#pilot-role");
    const pilotBirthdate = this.querySelector("#pilot-birthdate");
    const pilotNationality = this.querySelector("#pilot-nationality");
    const pilotImg = this.querySelector("#pilot-img"); // Imagen del piloto

    pilotName.textContent = pilot.nombre;
    pilotTeam.textContent = pilot.equipo;
    pilotRole.textContent = pilot.rol;
    pilotBirthdate.textContent = pilot["fecha de nacimiento"];
    pilotNationality.textContent = pilot.Nacionalidad;
    pilotImg.src = pilot.imagen; // Asignamos la imagen del piloto
    modal.style.display = "flex";
  }

  async getPilots(filterByTeam = null) {
    const apiUrl = "http://localhost:4000/pilotos";
    const pilotsContainer = this.querySelector("#pilots-container");

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const pilots = await response.json();
      pilotsContainer.innerHTML = "";

      const filteredPilots = filterByTeam ? pilots.filter(pilot => pilot.equipo === filterByTeam) : pilots;

      filteredPilots.forEach((pilot) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${pilot.imagen}" alt="${pilot.nombre}" class="piloto-img">
          <h3>${pilot.nombre}</h3>
          <p>${pilot.equipo}</p>
        `;

        card.addEventListener("click", () => {
          this.showPilotModal(pilot);
        });

        pilotsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching pilots:", error);
    }
  }

  async filterBySearch(query) {
    const teamsContainer = this.querySelector("#teams-container");
    const pilotsContainer = this.querySelector("#pilots-container");

    const teamCards = teamsContainer.querySelectorAll(".team-card");
    const pilotCards = pilotsContainer.querySelectorAll(".card");

    teamCards.forEach(card => {
      const teamName = card.getAttribute("data-nombre").toLowerCase();
      card.style.display = teamName.includes(query) ? "block" : "none";
    });

    pilotCards.forEach(card => {
      const pilotName = card.querySelector("h3").textContent.toLowerCase();
      const pilotTeam = card.querySelector("p").textContent.toLowerCase();

      card.style.display = (pilotName.includes(query) || pilotTeam.includes(query)) ? "block" : "none";
    });
  }
}

customElements.define('pilotos-component', PilotosComponent);
