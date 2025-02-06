
import { PilotosController } from '../../src/controllers/pilotoController.js';
import {obtenerPilotosSinEquipo} from "../../src/controllers/admPilotosController.js";
import {saveTeam, obtenerNombresEscuderias, getTeamById, actualizarEscuderia, deleteTeam} from "../../src/controllers/escuderiaController.js";

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
    opcEsc();
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        @import url("../../src/styles/pilotoStyles.css");
        @import url("../../src/styles/menu.css");
        @import url("../../src/styles/modal.css");
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
        <button class="btn btn-primary" id="addRaceBtnE">ADD +</button>
        <button class="btn btn-primary" id="editRaceBtnE">EDIT +</button>
        <button class="btn btn-primary" id="deleteRaceBtnE">DELETE +</button>
      </div>
    </div>

    <div class="teams-container" id="teams-container"></div>
    <button id="show-all">Ver Todos los Equipos y Pilotos</button>
    <h2>Pilotos</h2>
    <div class="buttons-container">
      <div class="buttons">
        <button class="btn btn-primary" id="addRaceBtnP">ADD +</button>
        <button class="btn btn-primary" id="editRaceBtnP">EDIT +</button>
        <button class="btn btn-primary" id="deleteRaceBtnP">DELETE +</button>
      </div>
    </div>
    <div class="grid-container" id="pilots-container"></div>

    <div id="modalAddE" class="modal">
    <div class="modal-content">
        <span class="close" id="closeModalAddE">x</span>
        <h2>Nueva Escudería</h2>
        <form class="form-container">

            <div class="form-group">
                <label for="nomEsc">Nombre</label>
                <input type="text" id="NameEsc">
            </div>

            <div class="form-group">
                <label for="paisEsc">País</label>
                <input type="text" id="paisEsc">
            </div>

            <div class="form-group">
                <label for="motorEsc">Motor</label>
                <input type="text" id="motorEsc">
            </div>

            
            <div class="form-group">
                <label for="logoEsc">Logo</label>
                <input type="text" id="logoEsc">
            </div>

            <div class="form-group">
            <label for="pilotosEsc">Pilotos</label>
            <select id="pilotosEsc" class = "selectContainer">
                <option  readonly>Seleccione...</option>
            </select>
            </div>
            <div class="form-group">
            <label for="logoEsc">Seleccionados</label>
            <input type="text"  id="pilotosSeleccionados" placeholder = "Seleccione uno o mas pilotos" >
        </div>
        
           
        <button type="submit" class="submit-btn" id="btnGuardarEsc">Guardar</button>
        </div>


      
        </form>
    </div>
</div>

      </div>
      </div>
      <div id="modalEditE" class="modal">
      <div class="modal-content">
      <span class="close" id="closeModalEditE">x</span>
      <h2>Editar Escudería</h2>
      <form class="form-container">
      <div class="busquedaEdit">
        <div class="form-group">
          <label for="selectNameEdit">Nombre</label>
          <select id="selectNameEsc" class = "selectContainer" >
          </select>
        </div>

        <div class="form-group">
          <button type="button" id="searchButtonEsc">Buscar</button>
        </div>
      

      </div>

      <div class="form-group">
      <label for="NameEsc">Nombre</label>
      <input id="NameEscE" disabled>

    </div>
      <div class="form-group">
      <label for="paisEsc">País</label>
      <input type="text" id="paisEscE" disabled>
  </div>

  <div class="form-group">
      <label for="motorEsc">Motor</label>
      <input type="text" id="motorEscE"disabled>
  </div>

  
  <div class="form-group">
      <label for="logoEsc">Logo</label>
      <input type="text" id="logoEscE" disabled>
  </div>



  <div class="form-group">
  <label for="pilotosSeleccionadosE">Seleccionados</label>
  <input type="text"  id="pilotosSeleccionadosE" disabled>
</div>
<button type="submit" class="submit-btn" id="btnGuardarEscE">Guardar</button>
      </div>
      </div>

      <div id="modalDeleteE" class="modal">
      <div class="modal-content">
      <span class="close" id="closeModalDeleteE">x</span>
      <h2>Eliminar Escudería</h2>
      <div class="busquedaEdit">
      <div class="form-group">
      <label for="selectDeleteEsc">Name</label>
      <select class = "selectsModals" id="selectDeleteEsc">
  </select>
    </div>
  </div>
  <button type="submit" class="submit-btn" id ="eliminarBtnEsc">Eliminar</button>
</div>
      </div>
      </div>

      <div id="modalAddP" class="modal">
        <div class="modal-content">
        <span class="close" id="closeModalAddP">x</span>
        <h2>Nuevo Piloto</h2>
  
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
          <select id="equipoPiloto" class = "selectContainer">
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

        <button type="submit" class="submit-btn" id = "btnGuardar">Guardar</button></div></div>

      <div id="modalEditP" class="modal"><div class="modal-content"><span class="close" id="closeModalEditP">x</span><h2>Editar Piloto</h2></div></div>
      <div id="modalDeleteP" class="modal"><div class="modal-content"><span class="close" id="closeModalDeleteP">x</span><h2>Eliminar Piloto</h2></div></div>
    `;
  }


  setupModalEvents() {
    // Obtener elementos de los modales
    const modalAddE = this.querySelector("#modalAddE");
    const modalEditE = this.querySelector("#modalEditE");
    const modalDeleteE = this.querySelector("#modalDeleteE");

    const modalAddP = this.querySelector("#modalAddP");
    const modalEditP = this.querySelector("#modalEditP");
    const modalDeleteP = this.querySelector("#modalDeleteP");

    // Botones para abrir modales
    const addRaceBtnE = this.querySelector("#addRaceBtnE");
    const editRaceBtnE = this.querySelector("#editRaceBtnE");
    const deleteRaceBtnE = this.querySelector("#deleteRaceBtnE");

    const addRaceBtnP = this.querySelector("#addRaceBtnP");
    const editRaceBtnP = this.querySelector("#editRaceBtnP");
    const deleteRaceBtnP = this.querySelector("#deleteRaceBtnP");

    // Botones para cerrar modales
    const closeAddModalE = this.querySelector("#closeModalAddE");
    const closeEditModalE = this.querySelector("#closeModalEditE");
    const closeDeleteModalE = this.querySelector("#closeModalDeleteE");

    const closeAddModalP = this.querySelector("#closeModalAddP");
    const closeEditModalP = this.querySelector("#closeModalEditP");
    const closeDeleteModalP = this.querySelector("#closeModalDeleteP");

    // Función para abrir modales
    const openModal = (modal) => {
      if (modal) modal.style.display = "block";
    };

    // Función para cerrar modales
    const closeModal = (modal) => {
      if (modal) modal.style.display = "none";
    };

    // Event listeners para abrir modales
    if (addRaceBtnE) addRaceBtnE.addEventListener("click", () => openModal(modalAddE));
    if (editRaceBtnE) editRaceBtnE.addEventListener("click", () => openModal(modalEditE));
    if (deleteRaceBtnE) deleteRaceBtnE.addEventListener("click", () => openModal(modalDeleteE));

    if (addRaceBtnP) addRaceBtnP.addEventListener("click", () => openModal(modalAddP));
    if (editRaceBtnP) editRaceBtnP.addEventListener("click", () => openModal(modalEditP));
    if (deleteRaceBtnP) deleteRaceBtnP.addEventListener("click", () => openModal(modalDeleteP));

    // Event listeners para cerrar modales
    if (closeAddModalE) closeAddModalE.addEventListener("click", () => closeModal(modalAddE));
    if (closeEditModalE) closeEditModalE.addEventListener("click", () => closeModal(modalEditE));
    if (closeDeleteModalE) closeDeleteModalE.addEventListener("click", () => closeModal(modalDeleteE));

    if (closeAddModalP) closeAddModalP.addEventListener("click", () => closeModal(modalAddP));
    if (closeEditModalP) closeEditModalP.addEventListener("click", () => closeModal(modalEditP));
    if (closeDeleteModalP) closeDeleteModalP.addEventListener("click", () => closeModal(modalDeleteP));

    document.addEventListener("DOMContentLoaded", function () {
      const selectPilotos = document.getElementById("pilotosEsc");
      const inputPilotosSeleccionados = document.getElementById("pilotosSeleccionados");
      let pilotosSeleccionados = [];

      selectPilotos.addEventListener("change", () => {
          const seleccionado = selectPilotos.value;

          // Evitar duplicados
          if (!pilotosSeleccionados.includes(seleccionado)) {
              pilotosSeleccionados.push(seleccionado);
              inputPilotosSeleccionados.value = pilotosSeleccionados.join(", ");
          }
      });
  });
  }
}

//#region funciones Escuderia
async function llenarEditEsc() {
  const idEsc = document.getElementById("selectNameEsc").value;
  if (!idEsc) {
    alert("Por favor, selecciona una pista.");
    return;
  }
    const dataGetEdit = await getTeamById(idEsc);
    console.log(dataGetEdit);

    if (!dataGetEdit) {
      alert("No se encontraron datos para esta pista.");
      return;
    }

    const nombre = document.getElementById("NameEscE");
    const pais = document.getElementById("paisEscE");
    const motor = document.getElementById("motorEscE");
    const logo = document.getElementById("logoEscE");
    const Seleccionados = document.getElementById("pilotosSeleccionadosE");

    
    nombre.value = dataGetEdit.nombre || "";
    pais.value = dataGetEdit.pais || "";
    motor.value = dataGetEdit.motor || "";
    logo.value = dataGetEdit.logo || "";
    Seleccionados.value = dataGetEdit.pilotos || "";
  
    nombre.disabled = false;
    pais.disabled = false;
    motor.disabled = false;
    logo.disabled = false;
    Seleccionados.disabled = false;
}

async function llenarSelectEsc(id = '', fun) {
  const sinEquipo  = await fun();
  console.log("obtener", sinEquipo);
  const selectEsc = document.getElementById(id);
  selectEsc.innerHTML = "<option value=''>Seleccione...</option>";

  sinEquipo.forEach(piloto => {
    const option = document.createElement("option");
    option.value = piloto.id;
    option.textContent = piloto.nombre;
    selectEsc.appendChild(option);
  });
}

async function opcEsc(){

  const btnEliminarEsc = document.getElementById("eliminarBtnEsc");
  btnEliminarEsc.addEventListener("click", async(event) => {
    event.preventDefault()
    const idEli = document.getElementById("selectDeleteEsc").value;
    deleteTeam(idEli);
  })

 
  const btnSaveEditEs = document.getElementById("btnGuardarEscE");
  btnSaveEditEs.addEventListener("click", async(event) => {
    const idEscEdit = document.getElementById("selectNameEsc").value;
    console.log("ides", idEscEdit)
    event.preventDefault();
    const data = await obtenerInfoEscuderia("E");
    console.log("", data);
    actualizarEscuderia(idEscEdit, data)
  })
  const btnEditEsc = document.getElementById("searchButtonEsc");
  btnEditEsc.addEventListener("click", async(event) => {
    llenarEditEsc();
  })


  llenarSelectEsc("selectNameEsc", obtenerNombresEscuderias);
  llenarSelectEsc("pilotosEsc",obtenerPilotosSinEquipo );
  llenarSelectEsc("selectDeleteEsc",obtenerNombresEscuderias);
  const btnAggEsc = document.getElementById("btnGuardarEsc");
  btnAggEsc.addEventListener("click", async (event) =>{
    event.preventDefault();
    const escuderia  = await obtenerInfoEscuderia();
    saveTeam(escuderia)
  })
 
}

async function obtenerInfoEscuderia(add = '') {
  const pilotosSeleccionados = document.getElementById(`pilotosSeleccionados${add}`).value;
  const pilotos = pilotosSeleccionados.split(",").map(piloto => piloto.trim());

  return {
    nombre: document.getElementById(`NameEsc${add}`).value, 
    pais: document.getElementById(`paisEsc${add}`).value,  
    motor: document.getElementById(`motorEsc${add}`).value,  
    pilotos: pilotos, 
    logo: document.getElementById(`logoEsc${add}`).value  
  };
}

//#endregion


customElements.define("adm-pilotos-form", AdmPilotosComponent);