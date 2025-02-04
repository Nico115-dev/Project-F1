class PodioF1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const data = [
      {
        position: "1°",
        teamLogo: "https://www.citypng.com/public/uploads/preview/hd-ferrari-logo-transparent-background-701751694773105xaxoflrdiu.png",
        driverName: "Charles Leclerc",
        role: "Lider",
        points: 25
      },
      {
        position: "2°",
        teamLogo: "https://brandlogos.net/wp-content/uploads/2022/07/mercedes-amg_petronas_f1-logo_brandlogos.net_lq7eb.png",
        driverName: "Lewis Hamilton",
        role: "Lider",
        points: 18
      },
      {
        position: "3°",
        teamLogo: "https://cdn-3.motorsport.com/images/mgl/Y99JQRbY/s8/red-bull-racing-logo-1.jpg",
        driverName: "Max Verstappen",
        role: "Lider",
        points: 15
      }
    ];
    this.shadowRoot.innerHTML = `
    <style>
      @import url("http://localhost:5502/src/styles/tabla.css");
      @import url("http://localhost:5502/src/styles/menu.css");
    </style>
    <header class="nav-bar">
      <div class="logo">
        <img src="../../src/img/image.png" alt="F1 Logo">
      </div>
      <nav>
        <ul>
          <li><a href="../../src/views/menu.html">Home</a></li>
          <li><a href="../../src/views/vehiculos.html">Vehículos</a></li>
          <li><a href="../../src/views/pilotos.html">Teams</a></li>
          <li><a href="../../src/views/pistas.html">Circuits</a></li>
          <li><a href="../../src/views/tabla.html">Resultados</a></li>
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
              <td><img src="${item.teamLogo}" alt="${item.teamLogo}" class="logo-equipo"></td>
              <td>${item.driverName}</td>
              <td>${item.role}</td>
              <td>${item.points}</td>
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

