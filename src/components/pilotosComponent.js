import { PilotosController } from '../../src/controllers/pilotoController.js';

class PilotosComponent extends HTMLElement {
  constructor() {
    super();
    this.controller = new PilotosController(this); // Pasar la referencia del componente al controlador
  }

  connectedCallback() {
    this.render();
    this.controller.getTeams();
    this.controller.getPilots();

    const searchInput = this.querySelector("#search-input");
    searchInput.addEventListener("input", () => this.controller.filterBySearch(searchInput.value.toLowerCase()));

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
      this.controller.getTeams();
      this.controller.getPilots();
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
            <li><a href="../../src/views/Pilotos.html">Equipos</a></li>
            <li><a href="../../src/views/pistas.html">Circuitos</a></li>
            <li><a href="../../src/views/tabla.html">Resultados</a></li>
            <li><a href="../../index.html">Menu inicio</a></li>
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
        <div class="modal-contentp">
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
}

customElements.define('pilotos-component', PilotosComponent);
