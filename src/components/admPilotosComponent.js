import { getPilots, savePilot, deletePilot } from "../../src/controllers/admPilotosController.js";
import { obtenerVehiculos } from "../controllers/vehiculosController.js";
class AdmPilotosComponent extends HTMLElement {
  constructor() {
    super();
    this.pilotos = [];
    this.render();
  }

  render() {
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
     <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
     <li><a href="../../src/views/Pilotos.html">Equipos</a></li>
     <li><a href="../../src/views/pistas.html">Circuitos</a></li>
     <li><a href="../../src/views/tabla.html">Resultados</a></li>
    </ul>
  </nav>
</header>
<div class="gallery-container">
<div class="gallery-admin-pilot">
<h2 class="gallery-title">Galería de Vehículos</h2>
<div class="btn-admin-pilot">
  <a class ="btnAdminPilot">Crear</a>
  <a class ="btnAdminPilot">Editar</a>
  <a class ="btnAdminPilot">Eliminar</a>
  </div>
  </div>
<div class="gallery" id="gallery">
  <!-- Modal de detalle -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2 id="modal-title">Detalles del vehículo</h2>
      <img id="modal-image" src="" alt="Imagen del vehículo" />

      <!-- Información adicional -->
      <div class="f1-details" id="modal-description">
      
      </div>

      <div class="stats-section">
      
    </div>
  </div>
  `;
  obtenerVehiculos.call(this);
  }
}

customElements.define("adm-pilotos-form", AdmPilotosComponent);



