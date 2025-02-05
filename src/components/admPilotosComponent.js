import { PilotosController } from '../../src/controllers/pilotoController.js';
class AdmPilotosComponent extends HTMLElement {
  constructor() {
    super();
    this.controller = new PilotosController(this);
  }

  connectedCallback() {
    this.render();
    this.controller.getTeams();
    this.controller.getPilots();

    const searchInput = this.querySelector("#search-input");
    if (searchInput) {
      searchInput.addEventListener("input", () =>
        this.controller.filterBySearch(searchInput.value.toLowerCase())
      );
    }

    this.setupModalEvents();
  }

  setupModalEvents() {
    // Obtener elementos de los modales
    const modalAdd = this.querySelector("#modalAdd");
    const modalEdit = this.querySelector("#modalEdit");
    const modalDelete = this.querySelector("#modalDelete");

    const addRaceBtn = this.querySelector("#addRaceBtn");
    const editRaceBtn = this.querySelector("#editRaceBtn");
    const deleteRaceBtn = this.querySelector("#deleteRaceBtn");

    const closeAddModal = this.querySelector("#closeModalAdd");
    const closeEditModal = this.querySelector("#closeModalEdit");
    const closeDeleteModal = this.querySelector("#closeModalDelete");

    // Función para abrir modales
    const openModal = (modal) => {
      if (modal) modal.style.display = "block";
    };

    // Función para cerrar modales
    const closeModal = (modal) => {
      if (modal) modal.style.display = "none";
    };

    // Event listeners para abrir modales
    if (addRaceBtn) addRaceBtn.addEventListener("click", () => openModal(modalAdd));
    if (editRaceBtn) editRaceBtn.addEventListener("click", () => openModal(modalEdit));
    if (deleteRaceBtn) deleteRaceBtn.addEventListener("click", () => openModal(modalDelete));

    // Event listeners para cerrar modales
    if (closeAddModal) closeAddModal.addEventListener("click", () => closeModal(modalAdd));
    if (closeEditModal) closeEditModal.addEventListener("click", () => closeModal(modalEdit));
    if (closeDeleteModal) closeDeleteModal.addEventListener("click", () => closeModal(modalDelete));

    // Cerrar modal haciendo clic fuera de él
    [modalAdd, modalEdit, modalDelete].forEach((modal) => {
      if (modal) {
        modal.addEventListener("click", (event) => {
          if (event.target === modal) closeModal(modal);
        });
      }
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        @import url("http://localhost:5502/src/styles/pilotoStyles.css");
        @import url("http://localhost:5502/src/styles/menu.css");
        @import url("http://localhost:5502/src/styles/modal.css");
      </style>

      <header class="nav-bar">
        <div class="logo">
          <img src="../../src/img/image.png" alt="F1 Logo"> Administrador
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="../../src/views/vehiculos.html">Vehículos</a></li>
            <li><a href="../../src/views/admPilotos.html">Equipos</a></li>
            <li><a href="../../src/views/PistasAdmin.html">Circuitos</a></li>
            <li><a href="../../src/views/tabla.html">Resultados</a></li>
          </ul>
        </nav>
      </header>

      <div class="title-container">
        <div class="buttons-container">
          <h2>Escuderías</h2>
          <div class="buttons">
            <button class="btn btn-primary" id="addRaceBtn">ADD +</button>
            <button class="btn btn-primary" id="editRaceBtn">EDIT +</button>
            <button class="btn btn-primary" id="deleteRaceBtn">DELETE +</button>
          </div>
        </div>
        <div class="teams-container" id="teams-container"></div>
        <button id="show-all">Ver Todos los Equipos y Pilotos</button>
        <h2>Pilotos</h2>
        <div class="buttons-container">
          <div class="buttons">
            <button class="btn btn-primary" id="addRaceBtn">ADD +</button>
            <button class="btn btn-primary" id="editRaceBtn">EDIT +</button>
            <button class="btn btn-primary" id="deleteRaceBtn">DELETE +</button>
          </div>
        </div>
        <div class="grid-container" id="pilots-container"></div>
      </div>

      <!-- Modal Agregar -->
      <div id="modalAdd" class="modal">
        <div class="modal-content">
        <span class="close" id="closeModal">x</span>
        <h2>Nueva Escuderia</h2>
        <form class="form-container">
          <div class="form-group">
            <label for="roundPista">Id</label>
            <input type="text" id="idPiloto">
          </div>

          <div class="form-group">
          <label for="nombrePiloto">Nombre</label>
          <input type="text" id="nombrePiloto">
        </div>

          <div class="form-group">
          <label for="equipoPiloto">Equipo</label>
          <select id="equipoPiloto">
            <option value =1>Seleccione...</option>
          </select>
        </div>


        <div class="form-group">
        <label for="rolPiloto">Rol</label>
        <select id="rolPiloto">
          <option value =1>Seleccione...</option>
        </select>
      </div>

      <div class="form-group">
      <label for="imgPiloto">Imagen</label>
      <input type="text" id="imgPiloto">
    </div>


    

        <div class="form-group">
          <label for="datePiloto">Fecha de nacimiento</label>
          <input type="date" id="datePiloto">
        </div>

        <div class="form-group">
          <label for="paisPiloto">Pais</label>
          <input type="text" id="paisPiloto">
        </div>



    `;
  }
}


      // <!-- Modal Editar -->
      // <div id="modalEdit" class="modal">
      //   <div class="modal-content">
      //     <h2>Editar Piloto</h2>
      //     <form>
      //       <!-- Campos del formulario -->
      //       <button type="button" id="closeModalEdit" class="close-btn">Cerrar</button>
      //     </form>
      //   </div>
      // </div>

      // <!-- Modal Eliminar -->
      // <div id="modalDelete" class="modal">
      //   <div class="modal-content">
      //     <h2>Eliminar Piloto</h2>
      //     <p>¿Estás seguro de eliminar este piloto?</p>
      //     <button type="button" id="closeModalDelete" class="close-btn">Cerrar</button>
      //   </div>
      // </div>
customElements.define("adm-pilotos-form", AdmPilotosComponent);
