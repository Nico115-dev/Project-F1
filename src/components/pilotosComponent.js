class PilotosComponent extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.render();
      this.getPilots();
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
          <li><a href="../../src/views/pilotos.html">Teams</a></li>
          <li><a href="../../src/views/pistas.html">Circuits</a></li>
        </ul>
      </nav>
    </header>
    <div class="title-container">
      <h1>Galería de Pilotos</h1>
    </div>
        <div class="grid-container" id="pilots-container">
      </div>
        <div id="modal" class="modal">
          <div class="modal-content">
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
  
    // Asegúrate de que 'getPilots' esté correctamente definida
    async getPilots() {
      const apiUrl = "http://localhost:4000/pilotos";
      const pilotsContainer = this.querySelector("#pilots-container");
      const modal = this.querySelector("#modal");
      const pilotName = this.querySelector("#pilot-name");
      const pilotTeam = this.querySelector("#pilot-team");
      const pilotRole = this.querySelector("#pilot-role");
      const pilotBirthdate = this.querySelector("#pilot-birthdate");
      const pilotNationality = this.querySelector("#pilot-nationality");
      const closeModal = this.querySelector("#close-modal");
  
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Cerrar el modal
      });
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) { // Verificar si la respuesta es exitosa
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const pilots = await response.json();
        pilotsContainer.innerHTML = ""; // Limpiar el contenedor de pilotos
  
        // Iterar sobre los pilotos y crear las tarjetas
        pilots.forEach((pilot) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${pilot.imagen}" alt="${pilot.nombre}" class="piloto-img">
            <h3>${pilot.nombre}</h3>
            <p>${pilot.equipo}</p>
          `;
  
          // Mostrar el modal con la información del piloto al hacer clic en la tarjeta
          card.addEventListener("click", () => {
            pilotName.textContent = pilot.nombre;
            pilotTeam.textContent = pilot.equipo;
            pilotRole.textContent = pilot.rol;
            pilotBirthdate.textContent = pilot["fecha de nacimiento"];
            pilotNationality.textContent = pilot.Nacionalidad;
            modal.style.display = "flex"; // Mostrar el modal
          });
  
          pilotsContainer.appendChild(card); 
        });
      } catch (error) {
        console.error("Error fetching pilots:", error);
      }
    }
  }
  
  customElements.define('pilotos-component', PilotosComponent);
  