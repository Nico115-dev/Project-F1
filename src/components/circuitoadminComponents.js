import { fetchAndRenderRaces } from "../../src/controllers/pistasController.js";
import {crearPista, obtenerNombresPistas,obtenerPistaPorId} from "../../src/controllers/pistasAdminController.js";

class Circuitos extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
  
    this.innerHTML = /*html*/ `
          <style>
             @import url("http://localhost:5502/src/styles/menu.css");
          </style>
      <<header class="nav-bar">
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
                <select type="text" id="selectNameEdit"></select>
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

            <button type="submit" class="editar-btn">Editar</button>
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
              <select type="text" id="selectDelete"></select>
            </div>
          </div>
          <button type="submit" class="elimnar-btn">Eliminar</button>
        </div>
      </div>
    `;
    eventosbtn();
 
  }
}

async function eventosbtn() {
    const btnEdirS = document.getElementById("searchButton");
    btnEdirS.addEventListener("click", async() => {
        searchEdit()
    })

 // Llamar la función cuando se haga clic en el botón de editar
document.getElementById("editRaceBtn").addEventListener("click", async () => {
    await fillEditSelect();
    await obtenerNombresPistas();

    document.getElementById("modalEdit").style.display = "block";
});
    fetchAndRenderRaces();
    const saveBtn = document.getElementById("btnGuardar");
    saveBtn.addEventListener("click", (event)=>{
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
  
    // Close the modals when clicking outside of them (on overlay)
    overlay.addEventListener("click", () => {
      closeModalFunc(modalAdd);
      closeModalFunc(modalEdit);
      closeModalFunc(modalDelete);
    });
  
    // Agregar el event listener al botón de guardar en el modal de agregar

  });

  async function fillEditSelect() {
    try {
        const pistas = await obtenerNombresPistas(); // Obtiene la lista de nombres de pistas
        const selectEdit = document.getElementById("selectNameEdit"); // Selecciona el <select> del modal de edición

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

  function handleSaveClick() {
    return {
      round: document.getElementById("roundPista").value,
      type: document.getElementById("typePista").value,
      date: document.getElementById("datesPista").value,
      month: document.getElementById("monthPista").value,
      country: document.getElementById("countryPista").value,
      flag: document.getElementById("flagPista").value,
      title: document.getElementById("titlePista").value,
      subtitle: document.getElementById("subtitlePista").value,
      circuitImg: document.getElementById("circuitImgPista").value,
      longitud: document.getElementById("longitudPista").value,
      vueltas: document.getElementById("vueltasPista").value,
      descripcion: document.getElementById("descripcionPista").value,
    };
  }

async function searchEdit ( ){
    const idPistaEdit = document.getElementById("selectNameEdit").value;
    const dataGetEdit =await  obtenerPistaPorId(idPistaEdit);
    console.log("aaa", dataGetEdit);
    const typePista =  document.getElementById("typePista")
    const roundPista= document.getElementById("roundPista")
    const  datesPitas= document.getElementById("datesPista")
    const month= document.getElementById("monthPista")
    const conutry= document.getElementById("countryPista")
    const flag= document.getElementById("flagPista")
    const titlePista= document.getElementById("titlePista")
    const subtitle= document.getElementById("subtitlePista")
    const imagen= document.getElementById("circuitImgPista")
    const longitud= document.getElementById("longitudPista")
    const vueltas= document.getElementById("vueltasPista")
    const desc= document.getElementById("descripcionPista")

    typePista.value=  JSON.stringify(dataGetEdit).round
  }
  

  
