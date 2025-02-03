class AdmIndexComponent extends HTMLElement {
  constructor() {
    super();
    this.pilotData = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
    <header class="header">
    <h1>Panel de Administración F1</h1>
</header>

<div class="container">
    <div class="menu">
        <h3>Gestión</h3>
        <a href="../../src/views/admPilotos.html">Pilotos</a>
        <a href="#"> Pistas</a>
        <a href="#"> Equipos</a>
        <a href="#"> Autos</a>
    </div>
    
    <div class="content">
        <h2>Bienvenido al Panel de Administración</h2>
        <p>Desde aquí podrás gestionar pilotos, pistas, equipos y autos de la F1.</p>
    </div>      
</div>

<footer class="footer">
    <p>© 2025 F1 Admin Panel. Todos los derechos reservados.</p>
</footer>
    `;

   
  }

  
}

customElements.define("adm-index-form", AdmIndexComponent);
