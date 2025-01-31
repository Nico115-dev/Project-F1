class inicio extends HTMLElement {
    constructor(){

        super();
    }

    connectedCallback(){
        this.innerHTML =`
     
        <div class="video-background">
             <video autoplay loop muted playsinline>
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
                <img src="src/img/image.png" alt="">
                <a href="menu.html" class="menu-item">▶ Start </a>
            </nav>
        </div>
        `;
    }
}

customElements.define('inicio-d',inicio);

