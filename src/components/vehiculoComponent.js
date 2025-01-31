import { obtenerVehiculos } from "../controllers/vehiculosController.js";

class VehiculosComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      @import url("http://localhost:5502/src/styles/vehiculosStyles.css");
    </style>

    <div class="gallery" id="gallery">
      <!-- Los elementos de la galería se generarán dinámicamente con JavaScript -->
    </div>
    `;
  }

  async connectedCallback() {
    await obtenerVehiculos.call(this);
  }
}

customElements.define("vehiculos-component", VehiculosComponent);
