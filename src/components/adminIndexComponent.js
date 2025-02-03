class AdmIndexComponent extends HTMLElement {
  constructor() {
    super();
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


          <div class="cards-container">
              <div class="card" onclick="window.location.href='../../src/views/admPilotos.html'">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5KUhjGLC4kDdO4z9yMEhwee8DDUaQRXXkufXMOENmfjoxlazY2GE-imbg4GV6u4VXWu4&usqp=CAU" alt="Pilotos">
                  <div class="card-content">
                      <h3>Pilotos</h3>
                      <p>Gestiona la información de los pilotos de F1.</p>
                  </div>
              </div>

              <div class="card">
                  <img src="https://http2.mlstatic.com/D_NQ_NP_670353-MLM46745317223_072021-O.webp" alt="Pistas">
                  <div class="card-content">
                      <h3>Pistas</h3>
                      <p>Administra circuitos y pistas de carreras.</p>
                  </div>
              </div>

              <div class="card">
                  <img src="https://estaticos-cdn.prensaiberica.es/clip/c1a8473c-d90c-4f48-ac27-a9aff78291ec_source-aspect-ratio_default_0.jpg" alt="Equipos">
                  <div class="card-content">
                      <h3>Equipos</h3>
                      <p>Controla las escuderías y equipos de F1.</p>
                  </div>
              </div>

              <div class="card">
                  <img src="https://media.gq.com.mx/photos/62a755b63e77ab160cfb845f/3:2/w_3081,h_2054,c_limit/m314683.jpg" alt="Autos">
                  <div class="card-content">
                      <h3>Autos</h3>
                      <p>Gestiona la información de los monoplazas.</p>
                  </div>
              </div>
          </div>
      </div>


    `;
  }
}

customElements.define("adm-index-form", AdmIndexComponent);
