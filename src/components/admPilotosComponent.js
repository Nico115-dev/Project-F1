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
  <a class ="btnAdminPilot" id= "addRaceBtn">Crear</a>
  <a class ="btnAdminPilot" id= "editRaceBtn">Editar</a>
  <a class ="btnAdminPilot" id= "deleteRaceBtn">Eliminar</a>
  </div>
  </div>
<div class="gallery" id="gallery">

<div class="stats-section">
      
</div>
  <!-- Modal de detalle -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2 id="modal-title">Detalles del vehículo</h2>
      <img id="modal-image" src="" alt="Imagen del vehículo" />

      <!-- Información adicional -->
      <div class="f1-details" id="modal-description">
    
      </div>
  </div>


  <div class="modal" id="modalAdd">
        <div class="modal-content">
          <span class="close" id="closeModal">x</span>
          <h2>Nueva pista</h2>
          <form class="form-container">
            <div class="form-group">
              <label for="roundPista">Round</label>
              <input type="text" id="roundPista">
            </div>


            <div class="modal" id="modalEdit">
            <div class="modal-content">
              <span class="close" id="closeEditModal">x</span>
              <h2>Editar pista</h2>
              <form class="form-container">
                <div class="busquedaEdit">
                  <div class="form-group">
                    <label for="selectNameEdit">Name</label>
                    <select id="selectNameEdit">
                      <!-- Asegúrate de llenar estas opciones dinámicamente -->
                    </select>
                  </div>
                  <div class="form-group">
                    <button type="button" id="searchButton">Buscar</button>
                  </div>
                </div>

                 <!-- Modal para eliminar -->
      <div class="modalDelete" id="modalDelete">
      <div class="modal-content">
        <span class="close" id="closeDeleteModal">x</span>
        <div class="busquedaEdit">
          <div class="form-group">
            <label for="selectDelete">Name</label>
        <select class = "selectsModals" id="selectDelete">
          <!-- Asegúrate de llenar estas opciones dinámicamente -->
        </select>
          </div>
        </div>
        <button type="submit" class="submit-btn" id ="eliminarBtn">Eliminar</button>
      </div>
    </div>
  `;
  obtenerVehiculos.call(this);
  }
}

customElements.define("adm-pilotos-form", AdmPilotosComponent);

document.addEventListener("DOMContentLoaded", () => {
  const modalAdd = document.getElementById("modalAdd");
  const modalEdit = document.getElementById("modalEdit");
  const modalDelete = document.getElementById("modalDelete");
  const addRaceBtn = document.getElementById("addRaceBtn");
  const editRaceBtn = document.getElementById("editRaceBtn");
  const deleteRaceBtn = document.getElementById("deleteRaceBtn");

  const closeAddModal = document.getElementById("closeModal");
  const closeEditModal = document.getElementById("closeEditModal");
  const closeDeleteModal = document.getElementById("closeDeleteModal");



  // Función para abrir el modal de agregar
  function openAddModal() {
    modalAdd.style.display = "block";

  }

  // Función para abrir el modal de editar
  function openEditModal() {
    modalEdit.style.display = "block";

  }

  // Función para abrir el modal de eliminar
  function openDeleteModal() {
    modalDelete.style.display = "block";

  }

  // Función para cerrar el modal
  function closeModalFunc(modal) {
    modal.style.display = "none";

  }

  // Obtener el formulario de agregar y el botón de guardar
  const formAdd = document.querySelector("#modalAdd form");


  // Función para manejar el envío del formulario


  // Event listeners
  addRaceBtn.addEventListener("click", openAddModal);
  editRaceBtn.addEventListener("click", openEditModal);
  deleteRaceBtn.addEventListener("click", openDeleteModal);

  closeAddModal.addEventListener("click", () => closeModalFunc(modalAdd));
  closeEditModal.addEventListener("click", () => closeModalFunc(modalEdit));
  closeDeleteModal.addEventListener("click", () => closeModalFunc(modalDelete));



  // Agregar el event listener al botón de guardar en el modal de agregar

});

