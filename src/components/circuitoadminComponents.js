import { fetchAndRenderRaces } from "../../src/controllers/pistasController.js";

class Circuitos extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = /*html*/ `
      <header class="nav-bar">
        <div class="logo">
          <img src="../img/image.png" alt="F1 Logo">
        </div>
        <nav>
          <ul>
            <li><a href="../../src/views/menu.html">Home</a></li>
            <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
            <li><a href="../../src/views/pilotos.html">Teams</a></li>
            <li><a href="../../src/views/pistas.html">Circuitss</a></li>
          </ul>
        </nav>
      </header>

      <div class="container">
        <header>
          <div class="title">
            <h1>F1 Schedule 2025</h1>
            <p>2025 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</p>
          </div>
          <div class="buttons">
            <button class="btn btn-primary" id="addRaceBtn">
              <span>ADD</span>
              <span>+</span>
            </button>
            <button class="btn btn-primary" id="editRaceBtn">
              <span>EDIT</span>
              <span>+</span>
            </button>
            <button class="btn btn-primary" id="deleteRaceBtn">
              <span>DELETE</span>
              <span>+</span>
            </button>
          </div>
        </header>

        <div class="race-grid" id="raceGrid"></div>
      </div>

      <!-- Modal para agregar -->
      <div class="modal" id="modalAdd">
        <div class="modal-content">
          <span class="close" id="closeModal">x</span>
          <h2>Nueva pista</h2>
          <form class="form-container">
            <div class="form-group">
              <label for="roundPista">Round</label>
              <input type="text" id="roundPista">
            </div>

            <div class="form-group">
              <label for="typePista">Type</label>
              <select id="typePista">
                <option>Seleccione...</option>
                <option>Testing</option>
                <option>Race</option>
              </select>
            </div>

            <div class="form-group">
              <label for="datesPista">Dates</label>
              <input type="date" id="datesPista">
            </div>

            <div class="form-group">
              <label for="monthPista">Month</label>
              <input type="text" id="monthPista">
            </div>

            <div class="form-group">
              <label for="countryPista">Country</label>
              <input type="text" id="countryPista">
            </div>

            <div class="form-group">
              <label for="flagPista">Flag</label>
              <input type="url" id="flagPista" accept="image/*">
            </div>

            <div class="form-group">
              <label for="titlePista">Title</label>
              <input type="text" id="titlePista">
            </div>

            <div class="form-group">
              <label for="subtitlePista">SubTitle</label>
              <input type="text" id="subtitlePista">
            </div>

            <div class="form-group">
              <label for="circuitImgPista">Circuit Image</label>
              <input type="url" id="circuitImgPista" accept="image/*">
            </div>

            <div class="form-group">
              <label for="longitudPista">Longitud</label>
              <input type="number" id="longitudPista" step="0.01">
            </div>

            <div class="form-group">
              <label for="vueltasPista">Número de vueltas</label>
              <input type="number" id="vueltasPista">
            </div>

            <div class="form-group">
              <label for="descripcionPista">Descripción</label>
              <textarea id="descripcionPista" rows="3"></textarea>
            </div>

            <button type="submit" class="submit-btn">Guardar Configuración</button>
          </form>
        </div>
      </div>

      <!-- Modal para editar -->
      <div class="modal" id="modalEdit">
        <div class="modal-content">
          <span class="close" id="closeEditModal">x</span>
          <h2>Editar pista</h2>
          <form class="form-container">
            <div class="busquedaEdit">
              <div class="form-group">
                <label for="roundPista">Name</label>
                <select type="text" id="roundPista"></select>
              </div>
              <div class="form-group">
                <button type="button" id="searchButton">Buscar</button>
              </div>
            </div>

            <div class="form-group">
              <label for="roundPista">Round</label>
              <input type="text" id="roundPista" disabled>
            </div>

            <div class="form-group">
              <label for="typePista">Type</label>
              <select id="typePista" disabled>
                <option>Seleccione...</option>
                <option>Testing</option>
                <option>Race</option>
              </select>
            </div>

            <div class="form-group">
              <label for="datesPista">Dates</label>
              <input type="date" id="datesPista" disabled>
            </div>

            <div class="form-group">
              <label for="monthPista">Month</label>
              <input type="text" id="monthPista" disabled>
            </div>

            <div class="form-group">
              <label for="countryPista">Country</label>
              <input type="text" id="countryPista" disabled>
            </div>

            <div class="form-group">
              <label for="flagPista">Flag</label>
              <input type="url" id="flagPista" accept="image/*" disabled>
            </div>

            <div class="form-group">
              <label for="titlePista">Title</label>
              <input type="text" id="titlePista" disabled>
            </div>

            <div class="form-group">
              <label for="subtitlePista">SubTitle</label>
              <input type="text" id="subtitlePista" disabled>
            </div>

            <div class="form-group">
              <label for="circuitImgPista">Circuit Image</label>
              <input type="url" id="circuitImgPista" accept="image/*" disabled>
            </div>

            <div class="form-group">
              <label for="longitudPista">Longitud</label>
              <input type="number" id="longitudPista" step="0.01" disabled>
            </div>

            <div class="form-group">
              <label for="vueltasPista">Número de vueltas</label>
              <input type="number" id="vueltasPista" disabled>
            </div>

            <div class="form-group">
              <label for="descripcionPista">Descripción</label>
              <textarea id="descripcionPista" rows="3" disabled></textarea>
            </div>

            <button type="submit" class="submit-btn">Editar</button>
          </form>
        </div>
      </div>

      <!-- Modal para eliminar -->
      <div class="modalDelete" id="modalDelete">
        <div class="modal-content">
          <span class="close" id="closeDeleteModal">x</span>
          <div class="busquedaEdit">
            <div class="form-group">
              <label for="roundPista">Name</label>
              <select type="text" id="roundPista"></select>
            </div>
          </div>
          <button type="submit" class="submit-btn">Eliminar</button>
        </div>
      </div>
    `;

    fetchAndRenderRaces();
  }
}

customElements.define('circuitos-d', Circuitos);

document.addEventListener("DOMContentLoaded", fetchAndRenderRaces);

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

  const overlay = document.getElementById("modalOverlay");

  // Función para abrir el modal de agregar
  function openAddModal() {
    modalAdd.style.display = "block";
    overlay.style.display = "block";
  }

  // Función para abrir el modal de editar
  function openEditModal() {
    modalEdit.style.display = "block";
    overlay.style.display = "block";
  }

  // Función para abrir el modal de eliminar
  function openDeleteModal() {
    modalDelete.style.display = "block";
    overlay.style.display = "block";
  }

  // Función para cerrar el modal
  function closeModalFunc(modal) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  // Event listeners
  addRaceBtn.addEventListener("click", openAddModal);
  editRaceBtn.addEventListener("click", openEditModal);
  deleteRaceBtn.addEventListener("click", openDeleteModal);

  closeAddModal.addEventListener("click", () => closeModalFunc(modalAdd));
  closeEditModal.addEventListener("click", () => closeModalFunc(modalEdit));
  closeDeleteModal.addEventListener("click", () => closeModalFunc(modalDelete));

  // Close the modals when clicking outside of them (on overlay)
  overlay.addEventListener("click", () => {
    closeModalFunc(modalAdd);
    closeModalFunc(modalEdit);
    closeModalFunc(modalDelete);
  });
});
