// PilotosController.js
export class PilotosController {
  constructor(component) {
    this.component = component;
  }

  async getTeams() {
    const apiUrl = "http://localhost:4000/equipos";
    const teamsContainer = this.component.querySelector("#teams-container");

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

  async getPilots(filterByTeam = null) {
    const apiUrl = "http://localhost:4000/pilotos";
    const pilotsContainer = this.component.querySelector("#pilots-container");

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

  showPilotModal(pilot) {
    const modal = this.component.querySelector("#modal");
    const pilotName = this.component.querySelector("#pilot-name");
    const pilotTeam = this.component.querySelector("#pilot-team");
    const pilotRole = this.component.querySelector("#pilot-role");
    const pilotBirthdate = this.component.querySelector("#pilot-birthdate");
    const pilotNationality = this.component.querySelector("#pilot-nationality");
    const pilotImg = this.component.querySelector("#pilot-img");

    pilotName.textContent = pilot.nombre;
    pilotTeam.textContent = pilot.equipo;
    pilotRole.textContent = pilot.rol;
    pilotBirthdate.textContent = pilot["fecha de nacimiento"];
    pilotNationality.textContent = pilot.Nacionalidad;
    pilotImg.src = pilot.imagen; 
    modal.style.display = "flex";
  }

  filterByTeamSelection(teamName) {
    const teamsContainer = this.component.querySelector("#teams-container");
    const showAllBtn = this.component.querySelector("#show-all");

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

  async filterBySearch(query) {
    const teamsContainer = this.component.querySelector("#teams-container");
    const pilotsContainer = this.component.querySelector("#pilots-container");

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
