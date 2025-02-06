import { obtenerVehiculos } from "../controllers/vehiculosController.js";
import { getVehiculos, saveVehiculo, obtenerNombresVehiculos, deleteVehiculo} from "../../src/controllers/adminVehiculosController.js";
import { obtenerNombresEscuderias} from "../../src/controllers/escuderiaController.js";

class AdmVehiculosComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupModalEvents();
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        @import url("../../src/styles/adminVehiculo.css");
        @import url("../../src/styles/menu.css");
        @import url("../../src/styles/modal.css");
      </style>

      <header class="nav-bar">
        <div class="logo">
          <img src="../../src/img/image.png" alt="F1 Logo"> Administrador
        </div>
        <nav>
          <ul>
            <li><a href="../../src/views/admMenu.html">Home</a></li>
            <li><a href="../../src/views/admVehiculos.html">Vehiculos</a></li>
            <li><a href="../../src/views/admPilotos.html">Equipos</a></li>
            <li><a href="../../src/views/PistasAdmin.html">Circuitos</a></li>
            <li><a href="../../index.html">Menu inicio</a></li>
 
          </ul>
        </nav>
      </header>

      <div class="gallery-container">
        <h2 class="gallery-title">Galería de Vehículos</h2>
        <div class="buttons-container">
          <div class="buttons">
            <button class="btn btn-primary" id="addRaceBtnE">ADD +</button>
            <button class="btn btn-primary" id="editRaceBtnE">EDIT +</button>
            <button class="btn btn-primary" id="deleteRaceBtnE">DELETE +</button>
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
          </div>

          <div id="modalAddE" class="modal">
          <div class="modal-content">
            <span class="close" id="closeModalAddE">&times;</span>
            <h2>Agregar Vehículo</h2>
            <form class="form-container">
            <div class="form-group">
    
              <div class="busquedaEdit">
              <div class="form-group">
                  <label for="equipoVeh">Equipo</label>
                  <select class="selectsModals" id="equipoVeh"></select>
              </div>
          </div>
            </div>
            
            <div class="form-group">
              <label for="modeloVeh">Modelo</label>
              <input type="text" id="modeloVeh" placeholder="Ejemplo: RB20">
            </div>
            
            <div class="form-group">
              <label for="motorVeh">Motor</label>
              <input type="text" id="motorVeh" placeholder="Ejemplo: Honda">
            </div>
            
            <div class="form-group">
              <label for="velocidadMaxVeh">Velocidad Máxima (km/h)</label>
              <input type="number" id="velocidadMaxVeh" placeholder="Ejemplo: 355">
            </div>
            
            <div class="form-group">
              <label for="aceleracionVeh">Aceleración 0-100 km/h (segundos)</label>
              <input type="number" id="aceleracionVeh" step="0.1" placeholder="Ejemplo: 2.5">
            </div>
            
            <div class="form-group">
              <label for="pilotosVeh">Pilotos</label>
              <input type="text" id="pilotosVeh" placeholder="Ejemplo: 1, 2">
            </div>
        
            <div class="form-group">
              <label for="imagen1Veh">Imagen 1</label>
              <input type="url" id="imagen1Veh" placeholder="URL de la imagen">
            </div>
        
            <div class="form-group">
              <label for="imagen2Veh">Imagen 2</label>
              <input type="url" id="imagen2Veh" placeholder="URL de la imagen">
            </div>
        
           
            <div class="form-group">
              <label for="velocidadPromedioNormal">Velocidad Promedio (km/h) - Conducción Normal</label>
              <input type="number" id="velocidadPromedioNormal" placeholder="Ejemplo: 320">
            </div>
            
            <div class="form-group">
              <label for="consumoCombustibleNormalSeco">Consumo Combustible (seco) - Conducción Normal</label>
              <input type="number" id="consumoCombustibleNormalSeco" step="0.1" placeholder="Ejemplo: 1.9">
            </div>
            
            <div class="form-group">
              <label for="desgasteNeumaticosNormalSeco">Desgaste Neumáticos (seco) - Conducción Normal</label>
              <input type="number" id="desgasteNeumaticosNormalSeco" step="0.1" placeholder="Ejemplo: 1.5">
            </div>
            
          
            <div class="form-group">
              <label for="velocidadPromedioAgresiva">Velocidad Promedio (km/h) - Conducción Agresiva</label>
              <input type="number" id="velocidadPromedioAgresiva" placeholder="Ejemplo: 340">
            </div>
            
            <div class="form-group">
              <label for="consumoCombustibleAgresivaSeco">Consumo Combustible (seco) - Conducción Agresiva</label>
              <input type="number" id="consumoCombustibleAgresivaSeco" step="0.1" placeholder="Ejemplo: 2.4">
            </div>
            
            <div class="form-group">
              <label for="desgasteNeumaticosAgresivaSeco">Desgaste Neumáticos (seco) - Conducción Agresiva</label>
              <input type="number" id="desgasteNeumaticosAgresivaSeco" step="0.1" placeholder="Ejemplo: 2.2">
            </div>
            
  
      
            <div class="form-group">
              <label for="velocidadPromedioAhorro">Velocidad Promedio (km/h) - Ahorro de Combustible</label>
              <input type="number" id="velocidadPromedioAhorro" placeholder="Ejemplo: 300">
            </div>
            
            <div class="form-group">
              <label for="consumoCombustibleAhorroSeco">Consumo Combustible (seco) - Ahorro de Combustible</label>
              <input type="number" id="consumoCombustibleAhorroSeco" step="0.1" placeholder="Ejemplo: 1.6">
            </div>
            
            <div class="form-group">
              <label for="desgasteNeumaticosAhorroSeco">Desgaste Neumáticos (seco) - Ahorro de Combustible</label>
              <input type="number" id="desgasteNeumaticosAhorroSeco" step="0.1" placeholder="Ejemplo: 1">
            </div>
              
              <button type="submit" class="submit-btn" id = "btnGuardar">Guardar</button>
            </form>
          </div>
        </div>
      


          <div id="modalEditE" class="modal">
            <div class="modal-contentVeh">
              <span class="close" id="closeModalEditE">&times;</span>
              <h2>Editar Vehículo</h2>
              <div class="busquedaEdit">
              <div class="form-group">
                  <label for="selectNameVehi">Nombre</label>
                  <select id="selectNameVehi" class="selectContainer"></select>
              </div>
  
              <div class="form-group">
                  <button type="button" id="searchButton">Buscar</button>
              </div>

              
          </div>
            </div>
          </div>

          <div id="modalDeleteE" class="modal">
            <div class="modal-contentVeh">
              <span class="close" id="closeModalDeleteE">&times;</span>
              <h2>Eliminar Vehículo</h2>
              <form class="form-container">
       
              <div class="busquedaEdit">
                         <div class="form-group">
                             <label for="selectDeleteP">Nombre</label>
                             <select class="selectsModals" id="selectDeleteP"></select>
                         </div>
                     </div>
                     <button type="submit" class="submit-btn" id="eliminarBtnP">Eliminar</button>    </form>
             </div>
      </div>
    `;
    obtenerVehiculos.call(this);
    opc();
  }



  setupModalEvents() {
    // Obtener los modales y botones
    const modalAddE = this.querySelector("#modalAddE");
    const modalEditE = this.querySelector("#modalEditE");
    const modalDeleteE = this.querySelector("#modalDeleteE");

    const addRaceBtnE = this.querySelector("#addRaceBtnE");
    const editRaceBtnE = this.querySelector("#editRaceBtnE");
    const deleteRaceBtnE = this.querySelector("#deleteRaceBtnE");

    const closeAddModalE = this.querySelector("#closeModalAddE");
    const closeEditModalE = this.querySelector("#closeModalEditE");
    const closeDeleteModalE = this.querySelector("#closeModalDeleteE");

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

    // Event listeners para cerrar modales
    if (closeAddModalE) closeAddModalE.addEventListener("click", () => closeModal(modalAddE));
    if (closeEditModalE) closeEditModalE.addEventListener("click", () => closeModal(modalEditE));
    if (closeDeleteModalE) closeDeleteModalE.addEventListener("click", () => closeModal(modalDeleteE));

    // Cerrar modal al hacer clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
      if (event.target === modalAddE) closeModal(modalAddE);
      if (event.target === modalEditE) closeModal(modalEditE);
      if (event.target === modalDeleteE) closeModal(modalDeleteE);
    });
  }
}

async function opc() {
  const btnEliminar = document.getElementById("eliminarBtnP");
  btnEliminar.addEventListener("click", (event) => {
    event.preventDefault();
    const idDel = document.getElementById("selectDeleteP").value;

    deleteVehiculo(idDel)
  })
  
  const data = await getVehiculos();
  console.log("ss", data);

  llenarSelectEsc("equipoVeh", obtenerNombresEscuderias )
  llenarSelectEsc("selectDeleteP", obtenerNombresVehiculos)
  

  const btnGuardar = document.getElementById("btnGuardar");
  btnGuardar.addEventListener("click", (event)=>{
    event.preventDefault();
    const data =   obtenerData()
    saveVehiculo(data)
  })

}

async function llenarSelectEsc(id = '', fun) {
  const sinEquipo = await fun();
  const selectEsc = document.getElementById(id);
  selectEsc.innerHTML = "<option value=''>Seleccione...</option>";

  sinEquipo.forEach(equipo => {
    const option = document.createElement("option");
    option.value = equipo.id;
    option.textContent = equipo.nombre;
    selectEsc.appendChild(option);
  });
}

function obtenerData(edit = '') {
  return {
    equipo: document.getElementById(`equipoVeh${edit}`).value,
    modelo: document.getElementById(`modeloVeh${edit}`).value,
    motor: document.getElementById(`motorVeh${edit}`).value,
    velocidadMaxima: document.getElementById(`velocidadMaxVeh${edit}`).value,
    aceleracion: document.getElementById(`aceleracionVeh${edit}`).value,
    pilotos: document.getElementById(`pilotosVeh${edit}`).value,
    imagen1: document.getElementById(`imagen1Veh${edit}`).value,
    imagen2: document.getElementById(`imagen2Veh${edit}`).value,

    // Rendimiento Conducción Normal
    velocidadPromedioNormal: document.getElementById(`velocidadPromedioNormal${edit}`).value,
    consumoCombustibleNormalSeco: document.getElementById(`consumoCombustibleNormalSeco${edit}`).value,
    desgasteNeumaticosNormalSeco: document.getElementById(`desgasteNeumaticosNormalSeco${edit}`).value,

    // Rendimiento Conducción Agresiva
    velocidadPromedioAgresiva: document.getElementById(`velocidadPromedioAgresiva${edit}`).value,
    consumoCombustibleAgresivaSeco: document.getElementById(`consumoCombustibleAgresivaSeco${edit}`).value,
    desgasteNeumaticosAgresivaSeco: document.getElementById(`desgasteNeumaticosAgresivaSeco${edit}`).value,

    // Rendimiento Ahorro Combustible
    velocidadPromedioAhorro: document.getElementById(`velocidadPromedioAhorro${edit}`).value,
    consumoCombustibleAhorroSeco: document.getElementById(`consumoCombustibleAhorroSeco${edit}`).value,
    desgasteNeumaticosAhorroSeco: document.getElementById(`desgasteNeumaticosAhorroSeco${edit}`).value,
  };
}


customElements.define("adm-vehiculos-form", AdmVehiculosComponent);
