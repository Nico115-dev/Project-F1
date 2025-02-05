class menu extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/`
            <header class="nav-bar">
                <div class="logo">
                    <img src="../../src/img/image.png" alt="F1 Logo">
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
                        <li><a href="../../src/views/Pilotos.html">Equipos</a></li>
                        <li><a href="../../src/views/pistas.html">Circuitos</a></li>
                        <li><a href="../../src/views/tabla.html">Resultados</a></li>
                    </ul>
                </nav>
            </header>

            <main class="content">
            <div class="sidebar">
                <h2>Top News</h2>
                    <div class="news-article">
                    <h4>El Mercedes de F1 de Fangio y Moss se vendió por 42,75 millones.</h4>
                    <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/Miscellaneous/6c3c3bfa23315f58eebec3a3690e3f71eac7459b" alt="Mercedes F1" class="news-image">
                <p>Fangio ganó el GP de Buenos Aires de 1955 con el Mercedes-Benz W 196 R.</p>
            </div>
            <div class="news-article">
                    <h4>Antonelli aprueba el examen de conducir antes de debutar en F1 con Mercedes</h4>
                    <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/trackside-images/2024/Formula_1_Testing_in_Abu_Dhabi/2189164326" alt="Mercedes F1" class="news-image">
                <p>Kimi Antonelli está a pocas semanas de debutar en la Fórmula 1.</p>
            </div>
        </div>


                <section class="main-section">
                    <div class="filters">
                        <h3>News</h3>
                        <div class="news-container">
                            <div class="news-article">
                                <h4>Zhou regresa a Ferrari como piloto reserva para la temporada 2025 tras su salida de Kick Sauber</h4>
                                <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/fom-website/2025/Miscellaneous/zhou-ferrari-2025" alt="Zhou Guanyu Ferrari" class="news-image">
                                <p>Ferrari ha anunciado el regreso de Zhou Guanyu como piloto reserva para la temporada 2025, que se suma a la reserva del equipo junto al titular Antonio Giovinazzi.</p>
                            </div>

                            <div class="news-article">
                                <h4>Moët & Chandon vuelve a ser el champán oficial de la Fórmula 1</h4>
                                <img src="https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/campaign/support-partner/moet%20chandon/Formula%201%20header%20templates%20(6)" alt="Champagne F1" class="news-image">
                                <p>La Fórmula 1 y LVMH inician su histórica asociación global de 10 años, y la emblemática marca de champán de lujo Moët & Chandon volverá a ser el champán oficial de la Fórmula 1, uniendo al deporte en la celebración de cada victoria.</p>
                            </div>
                        </div>
                    </div>

                    <div class="cards-container">
                        <a href="../../src/views/simulacion.html" class="card">INICIAR SIMULACION</a>
                        <a href="../../src/views/vehiculos.html" class="card">VEHÍCULOS</a>
                        <a href="../../src/views/Pilotos.html" class="card">PILOTOS</a>
                    </div>

                </section>
            </main>
        `;
    }
}

customElements.define('menu-d', menu);
