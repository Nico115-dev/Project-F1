// import {
//   obtenerPilotos,
//   agregarPiloto,
//   eliminarPiloto,
// } from "../controllers/pilotoController.js";

// class PilotosComponent extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });

//     this.shadowRoot.innerHTML = /*html*/ `
//     <style>
//     @import url("http://localhost:5502/src/styles/vehiculosStyles.css");

//   </style>

//       <div>
//         <h3>Pilotos</h3>
//         <ul id="listaPilotos"></ul>
//         <input type="text" id="nombre" placeholder="Nombre del piloto">
//         <input type="text" id="equipo" placeholder="Equipo">
//         <button id="btnAgregar">Agregar Piloto</button>
//       </div>
//     `;
//   }

//   async connectedCallback() {
//     this.cargarPilotos();

//     this.shadowRoot
//       .getElementById("btnAgregar")
//       .addEventListener("click", async () => {
//         const nombre = this.shadowRoot.getElementById("nombre").value.trim();
//         const equipo = this.shadowRoot.getElementById("equipo").value.trim();

//         if (nombre && equipo) {
//           await agregarPiloto({ nombre, equipo });
//           this.cargarPilotos();
//         }
//       });
//   }

//   async cargarPilotos() {
//     const listaPilotos = this.shadowRoot.getElementById("listaPilotos");
//     listaPilotos.innerHTML = "";

//     const pilotos = await obtenerPilotos();
//     pilotos.forEach((piloto) => {
//       const item = document.createElement("li");
//       item.textContent = `${piloto.nombre} - ${piloto.equipo}`;

//       const btnEliminar = document.createElement("button");
//       btnEliminar.textContent = "Eliminar";
//       btnEliminar.addEventListener("click", async () => {
//         await eliminarPiloto(piloto.id);
//         this.cargarPilotos();
//       });

//       item.appendChild(btnEliminar);
//       listaPilotos.appendChild(item);
//     });
//   }
// }

// customElements.define("pilotos-component", PilotosComponent);
