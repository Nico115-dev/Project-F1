class Inicio extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = /*html*/ `
        <div class="video-background">
            <video id="backgroundVideo" autoplay loop muted playsinline>
                <source src="src/img/F1.mp4">
            </video>
        </div>

        <div class="welcome-screen">
            <div class="welcome-text">
                <span>W</span><span>E</span><span>L</span><span>C</span><span>O</span><span>M</span><span>E</span>
                <span class="f1-style">F1</span>
            </div>
        </div>

        <div class="menu-container">
            <nav class="f1-menu">
                <img src="src/img/image.png" alt="Logo">
                <a href="../../src/views/menu.html" class="menu-item">▶ User</a>
                <a href="../../src/views/indexAdmin.html" class="menu-item">▶ Admin</a>
            </nav>
        </div>

        <div class="volumen-container">
            <button class="volumen-btn">🔊 Volumen</button>
            <div class="volumen-slider">
                <input type="range" id="controlVolumen" min="0" max="1" step="0.1" value="1">
            </div>
        </div>

        <script>
            let video = document.getElementById("backgroundVideo");
            let slider = document.getElementById("controlVolumen");
            video.volume = 1; // Volumen inicial al máximo

            slider.addEventListener("input", function() {
                video.volume = slider.value;
            });
        </script>
        `;
    }
}

customElements.define('inicio-d', Inicio);
