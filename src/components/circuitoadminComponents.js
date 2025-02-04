class Circuitos extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
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
                        <button class="btn btn-primary" id="addRaceBtn">
                            <span>ADD</span>
                            <span>+</span>
                        </button>
                        <button class="btn btn-secondary">
                            <span>🗓</span>
                            SYNC CALENDAR
                        </button>
                    </div>
                </header>
                <div class="race-grid" id="raceGrid"></div>
            </div>

            <div id="modal" class="modal">
                <div class="modal-content">
                    <span class="close" id="closeModal">&times;</span>
                    <h2>Add New Circuit</h2>
                    <form id="raceForm">
                        <label>Round: <input type="text" id="round" value=""></label>
                        <label>Type: <input type="text" id="type" value=""></label>
                        <label>Dates: <input type="text" id="dates" value=""></label>
                        <label>Month: <input type="text" id="month" value=""></label>
                        <label>Country: <input type="text" id="country" value=""></label>
                        <label>Flag: <input type="text" id="flag" value=""></label>
                        <label>Title: <input type="text" id="title" value=""></label>
                        <label>Subtitle: <input type="text" id="subtitle" value=""></label>
                        <label>Circuit Image: <input type="text" id="circuitImage" value=""></label>
                        <label>Lap Record Time: <input type="text" id="lapTime" value=""></label>
                        <label>Lap Record Driver: <input type="text" id="lapDriver" value=""></label>
                        <label>Lap Record Year: <input type="text" id="lapYear" value=""></label>
                        <label>ID: <input type="text" id="raceId" value=""></label>

                        <button type="submit">Save</button>
                        <button type="button" id="deleteRaceBtn">Delete</button>
                    </form>
                </div>
            </div>
        `;
        
   
}
}

function fetchAndRenderRaces() {
    fetch('http://localhost:4000/circuitos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Datos obtenidos de la API:", data); 
  
       
        const races = Array.isArray(data) ? data : [];
  
  
        if (races.length === 0) {
          throw new Error('No races found or invalid data structure');
        }
  
        renderRaceGrid(races); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }


customElements.define('circuitos-d', Circuitos);

document.addEventListener("DOMContentLoaded", fetchAndRenderRaces);
  
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("modalOverlay");
  const addRaceBtn = document.getElementById("addRaceBtn");
  const closeModal = document.getElementById("closeModal");

  function openModal() {
      modal.style.display = "block";
      overlay.style.display = "block";

      const inputs = modal.querySelectorAll("input");
      inputs.forEach(input => {
          input.value = ""; 
      });
  }

 
  function closeModalFunc() {
      modal.style.display = "none";
      overlay.style.display = "none";
  }

  addRaceBtn.addEventListener("click", openModal);
  closeModal.addEventListener("click", closeModalFunc);
  overlay.addEventListener("click", closeModalFunc);
});

document.getElementById("raceForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const numerofactura = Math.floor(Math.random() * 1000);
    const newRace = {
        round: document.getElementById("round").value,
        type: document.getElementById("type").value,
        dates: document.getElementById("dates").value,
        month: document.getElementById("month").value,
        country: document.getElementById("country").value,
        flag: document.getElementById("flag").value,
        title: document.getElementById("title").value,
        subtitle: document.getElementById("subtitle").value,
        circuitImage: document.getElementById("circuitImage").value,
        lapTime: document.getElementById("lapTime").value,
        lapDriver: document.getElementById("lapDriver").value,
        lapYear: document.getElementById("lapYear").value,
        Id: numerofactura
    };
  
    fetch('http://localhost:4000/circuitos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRace)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos guardados correctamente:', data);
  
        closeModalFunc();
        fetchAndRenderRaces();
    })
    .catch(error => {
        console.error('Hubo un problema al guardar los datos:', error);
    });
  });

  document.getElementById('deleteRaceBtn').addEventListener('click', function() {
    const raceId = document.getElementById("raceId").value; 
    if (!raceId) {
        console.error('No race ID provided');
        return;
    }

    fetch(`http://localhost:4000/circuitos`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Circuito eliminado:', data);
        closeModalFunc(); // Cerrar el modal
        fetchAndRenderRaces(); // Refrescar la lista de carreras
    })
    .catch(error => {
        console.error('Hubo un problema con la eliminación:', error);
    });
});
