import { fetchAndRenderRaces } from "../../src/controllers/pistasController.js";
import { crearPista, obtenerNombresPistas, obtenerPistaPorId, actualizarPista, eliminarPista } from "../../src/controllers/pistasAdminController.js";

class Circuitos extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {

    this.innerHTML = /*html*/ `
          <style>
             @import url("http://localhost:5502/src/styles/menu.css");
          </style>
      <header class="nav-bar">
          <div class="logo">
            <img src="../../src/img/image.png" alt="F1 Logo"> Administrador
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
                <li><a href="../../src/views/Pilotos.html">Equipos</a></li>
                <li><a href="../../src/views/PistasAdmin.html">Circuitos</a></li>
                <li><a href="../../src/views/tabla.html">Resultados</a></li>
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
                <option value =1>Seleccione...</option>
                <option value =2>Testing</option>
                <option value = 3>Race</option>
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
              <input type="text" id="flagPista" accept="image/*">
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

            <button type="submit" class="submit-btn" id = "btnGuardar">Guardar</button>
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
          <label for="selectNameEdit">Name</label>
          <select id="selectNameEdit">
            <!-- Asegúrate de llenar estas opciones dinámicamente -->
          </select>
        </div>
        <div class="form-group">
          <button type="button" id="searchButton">Buscar</button>
        </div>
      </div>

      <!-- Los campos del modal -->
      <div class="form-group">
        <label for="roundPistaEdit">Round</label>
        <input type="text" id="roundPistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="typePistaEdit">Type</label>
        <select class ="selectsModals" id="typePistaEdit" disabled>
          <option>Seleccione...</option>
          <option>Testing</option>
          <option>Race</option>
        </select>
      </div>

      <div class="form-group">
        <label for="datesPistaEdit">Dates</label>
        <input type="text" id="datesPistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="monthPistaEdit">Month</label>
        <input type="text" id="monthPistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="countryPistaEdit">Country</label>
        <input type="text" id="countryPistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="flagPistaEdit">Flag</label>
        <input type="text" id="flagPistaEdit" accept="image/*" disabled>
      </div>

      <div class="form-group">
        <label for="titlePistaEdit">Title</label>
        <input type="text" id="titlePistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="subtitlePistaEdit">SubTitle</label>
        <input type="text" id="subtitlePistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="circuitImgPistaEdit">Circuit Image</label>
        <input type="text" id="circuitImgPistaEdit" accept="image/*" disabled>
      </div>

      <div class="form-group">
        <label for="longitudPistaEdit">Longitud</label>
        <input type="text" id="longitudPistaEdit" step="0.01" disabled>
      </div>

      <div class="form-group">
        <label for="vueltasPistaEdit">Número de vueltas</label>
        <input type="number" id="vueltasPistaEdit" disabled>
      </div>

      <div class="form-group">
        <label for="descripcionPistaEdit">Descripción</label>
        <textarea id="descripcionPistaEdit" rows="3" disabled></textarea>
      </div>

      <button type="submit" class="submit-btn" id = "edit-button">Editar</button>
    </form>
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
    eventosbtn();


  }
}

async function eventosbtn() {

  const btnEliminar = document.getElementById("eliminarBtn");
  btnEliminar.addEventListener("click", async (event) => {
    event.preventDefault();
    const id = document.getElementById("selectDelete").value;
    eliminarPista(id);
  })

  const editBtn = document.getElementById("edit-button");
  editBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita que la página se recargue o se envíe el formulario
    const id = document.getElementById("selectNameEdit").value;
    console.log("", id);
    const data = handleSaveClick("Edit");

    console.log("edit", data);
    actualizarPista(id, data)
      .then(response => console.log("Pista creada:", response))
      .catch(error => console.error("Error en la creación:", error));
  })

  const btnEdirS = document.getElementById("searchButton");
  btnEdirS.addEventListener("click", async () => {
    searchEdit()
  })

  document.getElementById("deleteRaceBtn").addEventListener("click", async () => {
    await fillEditSelect("selectDelete");
    await obtenerNombresPistas();
  })

  // Llamar la función cuando se haga clic en el botón de editar
  document.getElementById("editRaceBtn").addEventListener("click", async () => {
    await fillEditSelect("selectNameEdit");
    await obtenerNombresPistas();

    // document.getElementById("modalEdit").style.display = "block";
  });
  fetchAndRenderRaces();
  const saveBtn = document.getElementById("btnGuardar");
  saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const data = handleSaveClick();
    console.log(JSON.stringify(data));
    crearPista(data)
      .then(response => console.log("Pista creada:", response))
      .catch(error => console.error("Error en la creación:", error));


  });
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

async function fillEditSelect(idName = '') {
  try {
    const pistas = await obtenerNombresPistas(); // Obtiene la lista de nombres de pistas
    const selectEdit = document.getElementById(idName); // Selecciona el <select> del modal de edición

    // Limpiar opciones previas
    selectEdit.innerHTML = "<option value=''>Seleccione...</option>";

    // Agregar opciones dinámicamente
    pistas.forEach((pista) => {
      const option = document.createElement("option");
      option.value = pista.id;
      option.textContent = pista.title;
      selectEdit.appendChild(option);
    });

  } catch (error) {
    console.error("Error obteniendo nombres de pistas:", error);
  }
}

function handleSaveClick(edit = '') {

  // Genera los ids dinámicamente con el sufijo (si 'edit' está presente, agrega 'Edit' al id)
  return {
    round: document.getElementById(`roundPista${edit}`).value,
    type: document.getElementById(`typePista${edit}`).value,
    date: document.getElementById(`datesPista${edit}`).value,
    month: document.getElementById(`monthPista${edit}`).value,
    country: document.getElementById(`countryPista${edit}`).value,
    flag: document.getElementById(`flagPista${edit}`).value,
    title: document.getElementById(`titlePista${edit}`).value,
    subtitle: document.getElementById(`subtitlePista${edit}`).value,
    circuitImage: document.getElementById(`circuitImgPista${edit}`).value,
    longitud: document.getElementById(`longitudPista${edit}`).value,
    vueltas: document.getElementById(`vueltasPista${edit}`).value,
    descripcion: document.getElementById(`descripcionPista${edit}`).value,
  };
}


async function searchEdit() {
  // Obtener el valor del select
  const idPistaEdit = document.getElementById("selectNameEdit").value;
  if (!idPistaEdit) {
    alert("Por favor, selecciona una pista.");
    return;
  }

  // Llamar a la API para obtener los datos
  const dataGetEdit = await obtenerPistaPorId(idPistaEdit); // Suponiendo que esta función devuelve el objeto con los datos
  console.log(dataGetEdit); // Verifica la estructura del objeto

  if (!dataGetEdit) {
    alert("No se encontraron datos para esta pista.");
    return;
  }

  // Asignar los valores de dataGetEdit a los campos correspondientes
  const roundPista = document.getElementById("roundPistaEdit");
  const typePista = document.getElementById("typePistaEdit");
  const datesPistas = document.getElementById("datesPistaEdit");
  const month = document.getElementById("monthPistaEdit");
  const country = document.getElementById("countryPistaEdit");
  const flag = document.getElementById("flagPistaEdit");
  const title = document.getElementById("titlePistaEdit");
  const subtitle = document.getElementById("subtitlePistaEdit");
  const circuitImg = document.getElementById("circuitImgPistaEdit");
  const longitud = document.getElementById("longitudPistaEdit");
  const vueltas = document.getElementById("vueltasPistaEdit");
  const descripcion = document.getElementById("descripcionPistaEdit");

  // Asignar los valores al formulario
  roundPista.value = dataGetEdit.round || "";
  datesPistas.value = dataGetEdit.date || "";
  month.value = dataGetEdit.month || "";
  country.value = dataGetEdit.country || "";
  flag.value = dataGetEdit.flag || "";
  title.value = dataGetEdit.title || "";
  subtitle.value = dataGetEdit.subtitle || "";
  circuitImg.value = dataGetEdit.circuitImage || "";
  longitud.value = dataGetEdit.longitud || "";
  vueltas.value = dataGetEdit.vueltas || "";
  descripcion.value = dataGetEdit.descripcion || "";

  // Habilitar los campos para que el usuario pueda editarlos
  roundPista.disabled = false;
  typePista.disabled = false;
  datesPistas.disabled = false;
  month.disabled = false;
  country.disabled = false;
  flag.disabled = false;
  title.disabled = false;
  subtitle.disabled = false;
  circuitImg.disabled = false;
  longitud.disabled = false;
  vueltas.disabled = false;
  descripcion.disabled = false;

  // Mostrar el modal si no está visible
  document.getElementById("modalEdit").style.display = "block";
}

// // Agregar el evento de búsqueda
// document.getElementById("searchButton").addEventListener("click", searchEdit);





