import { obtenerVehiculos } from "../controllers/vehiculosController.js";

class VehiculosComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
    <style>
      @import url("http://localhost:5502/src/styles/login.css");
      @import url("http://localhost:5502/src/styles/menu.css");
    </style>
    
    `;
    obtenerVehiculos.call(this);
  }
}

customElements.define("vehiculos-component", VehiculosComponent);
