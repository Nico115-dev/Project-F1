import { obtenerVehiculos } from "../controllers/vehiculosController.js";

class VehiculosComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      @import url("http://localhost:5502/src/styles/vehiculosStyles.css");
      @import url("http://localhost:5502/src/styles/menu.css");
    </style>
   
        <!-- Los elementos de la galería se generarán dinámicamente con JavaScript -->
      </div>
    </div>
    <header class="nav-bar">
    <div class="logo">
      <img src="../../src/img/image.png" alt="F1 Logo">
    </div>
    <nav>
      <ul>
        <li><a href="../../src/views/menu.html">Home</a></li>
        <li><a href="../../src/views/vehiculos.html">Vehículos</a></li>
        <li><a href="#">Teams</a></li>
        <li><a href="#">Circuits</a></li>
      </ul>
    </nav>
  </header>
  <div class="gallery-container">
  <h2 class="gallery-title">Galería de Vehículos</h2>
  <div class="gallery" id="gallery">
    <!-- Modal de detalle -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2 id="modal-title">Detalles del vehículo</h2>
        <img id="modal-image" src="" alt="Imagen del vehículo" />
  
        <!-- Información adicional -->
        <div class="f1-details" id="modal-description">
          <p><strong>Nombre:</strong> Ferrari F1</p>
          <p><strong>Modelo:</strong> 2023</p>
          <p><strong>Fabricante:</strong> Ferrari</p>
        </div>
  
        <!-- Sección de estadísticas -->
        <div class="stats-section">
          <h5>Estadísticas del Vehículo:</h5>
          <div class="progress-bar">
            <div class="progress health" id="health-bar" style="width: 80%"></div> <!-- Barra de salud -->
          </div>
          <div class="progress-bar">
            <div class="progress attack" id="attack-bar" style="width: 70%"></div> <!-- Barra de ataque -->
          </div>
          <div class="progress-bar">
            <div class="progress speed" id="speed-bar" style="width: 90%"></div> <!-- Barra de velocidad -->
          </div>
        </div>
      </div>
    </div>
    `;
    obtenerVehiculos.call(this);
  }
}

customElements.define("vehiculos-component", VehiculosComponent);
