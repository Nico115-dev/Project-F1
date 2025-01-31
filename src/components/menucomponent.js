class menu extends HTMLElement {
    constructor(){

        super();
    }

    connectedCallback(){
        this.innerHTML =`

          <header class="nav-bar">
        <div class="logo">
            <img src="src/img/image.png" alt="F1 Logo">
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Drivers</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">Circuitss</a></li>
            </ul>
        </nav>
    </header>
    <main class="content">
        <div class="sidebar">
            <h2>Top</h2>
            <div class="stats-line"></div>
            <div class="stats-line"></div>
            <div class="stats-line"></div>
        </div>
        <section class="main-section">
            <div class="filters">
                <h3>News</h3>
                <div class="filter-line"></div>
                <div class="filter-line"></div>
                <div class="filter-line"></div>
            </div>
            <div class="cards-container">
                <div class="card">CARRERAS</div>
                <div class="card">VEHÍCULOS</div>
                <div class="card">PILOTOS</div>
            </div>
        </section>
    </main>
     
      
        `;
    }
}

customElements.define('menu-d',menu);

