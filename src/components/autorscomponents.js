class autos extends HTMLElement {
    constructor(){

        super();
    }

    connectedCallback(){
        this.innerHTML = /*html*/`
     
       <header class="nav-bar">
        <div class="logo">
            <img src="../img/image.png" alt="F1 Logo">
        </div>
        <nav>
            <ul>
            <li><a href="../../src/views/menu.html">Home</a></li>
                <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
                <li><a href="../../src/views/pilotos.html">Teams</a></li>
                <li><a href="../../src/views/pistas.html">Circuitss</a></li>
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
                <button class="btn btn-primary">
                    GET READY!
                    <span>SEASON 2025</span>
                    <span>»</span>
                </button>
                <button class="btn btn-secondary">
                    <span>🗓</span>
                    SYNC CALENDAR
                </button>
            </div>
        </header>

        <div class="race-grid" id="raceGrid">
        </div>
    </div>

        `;
    }
}

customElements.define('autos-d',autos);

