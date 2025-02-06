import { getPodio } from "../controllers/simulacionController.js";

class PodioF1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.loadPodioData();
  }

  async loadPodioData() {
    try {
      const podioData = await getPodio();
      // Ordenar los equipos de mayor a menor por puntos
      let sorted = podioData.sort((a, b) => b.puntos - a.puntos);
      // Tomar los tres equipos con mayor puntaje
      let top3 = sorted.slice(0, 3);
      const positions = ["1°", "2°", "3°"];
      top3 = top3.map((item, index) => ({ ...item, position: positions[index] }));
      this.renderPodio(top3);
    } catch (error) {
      console.error("Error al cargar el podio:", error);
      this.shadowRoot.innerHTML = `<p>Error al cargar los datos del podio.</p>`;
    }
  }

  renderPodio(data) {
    this.shadowRoot.innerHTML = /*html*/`
    <style>
       .nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    z-index: 1000;
  }
  
  .logo img {
    height: 40px;
    width: auto;
  }
  
  /* Navegación */
  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  
  nav a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  nav a:hover {
    color: #e10600; /* Color rojo F1 */
  }
body {
  font-family: 'Audiowide', sans-serif;
    background: radial-gradient(circle at center, #001F3F, #000428);
    color: white;
    margin: 0;
    padding-top: 80px;
  }
  
  .tabla-podios {
    width: 80%;
    margin: 100px auto;
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  h1 {
    text-align: center;
    padding: 20px;
    color: #ff0000; /* Rojo brillante */
  }
  
  /* Estilo de la tabla */
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  
  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #ff0000;
    color: white;
  }
  
  td {
    background-color: #222222;
    color: white;
  }
  
  /* Estilo para los logos de los equipos */
  .logo-equipo {
    max-width: 50px;
    max-height: 50px;
    object-fit: contain; 
    margin-left: 0 !important;
  }
  
  /* Estilos para las filas */
  tr:nth-child(odd) {
    background-color: #2d2d2d;
  }
  
  tr:nth-child(even) {
    background-color: #333333;
  }
  
  tr:hover {
    background-color: #444444;
    color: #ff4c00;
  }
  
  td, th {
    font-size: 16px;
    font-weight: bold;
  }
  
    </style>
    <header class="nav-bar">
      <div class="logo">
        <img src="../../src/img/image.png" alt="F1 Logo">
      </div>
      <nav>
        <ul>
          <li><a href="../../src/views/menu.html">Home</a></li>
          <li><a href="../../src/views/vehiculos.html">Vehículos</a></li>
          <li><a href="../../src/views/Pilotos.html">Equipos</a></li>
          <li><a href="../../src/views/pistas.html">Circuitos</a></li>
          <li><a href="../../src/views/tabla.html">Resultados</a></li>
          <li><a href="../../index.html">Menu inicio</a></li>
        </ul>
      </nav>
    </header>
    <div class="tabla-podios">
      <h1>Tabla de Podios - F1</h1>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Logo del Equipo</th>
            <th>Nombre del Piloto</th>
            <th>Rol</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td>${item.position}</td>
              <td><img src="${item.teamLogo}" alt="${item.equipo}" class="logo-equipo"></td>
              <td>${item.driverName || item.equipo}</td>
              <td>${item.role || ""}</td>
              <td>${item.puntos}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;  
  }
}
// Insertar el componente en el DOM
// const container = document.getElementById('podiumContainer');
// const podium = document.createElement('podio-f1');
// container.appendChild(podium);

// Registrar el componente como un custom element
customElements.define('podio-f1', PodioF1);

