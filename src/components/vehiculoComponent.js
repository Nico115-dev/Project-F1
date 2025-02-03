import { obtenerVehiculos } from "../controllers/vehiculosController.js";

class VehiculosComponent extends HTMLElement {
  constructor(){

    super();
}

connectedCallback(){

    this.innerHTML = /*html*/ `
    <style>
      @import url("http://localhost:5502/src/styles/vehiculosStyles.css");
    </style>
 <div class="gallery" id="gallery">

 <div id="modal" class="modal">
   <div class="modal-content">
     <span class="close">&times;</span>
     <h2 id="modal-title"></h2>
     <img id="modal-image" src="" alt="" />
     <p id="modal-description"></p>
   </div>
 </div>
 
 <!-- Los elementos de la galería se generarán dinámicamente con JavaScript -->
</div>
    `;

     obtenerVehiculos.call(this);
  }


}

customElements.define("vehiculos-component", VehiculosComponent);
