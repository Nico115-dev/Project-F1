
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

function createRaceCard(race) {
  return `
    <div class="race-card">
      <div class="race-info">
        <div class="race-header">
          <div>
            <div class="race-round">${race.round}</div>
            <div class="race-dates">
              ${race.dates}
              <span class="race-month">${race.month}</span>
            </div>
          </div>
          <div class="race-flag">${race.flag}</div>
        </div>  
        <div class="race-country">${race.country}</div>
        <div class="race-title">
          ${race.title}<br>${race.subtitle}
        </div>
      </div>
      <div class="race-circuit">
        <div class="circuit-grid"></div>
        <div class="circuit-image" style="background-image: url('${race.circuitImage}')"></div>
      </div>
    </div>
  `;
}


function renderRaceGrid(races) {
  const raceGrid = document.getElementById("raceGrid");


  if (!raceGrid) {
    console.error('El contenedor raceGrid no fue encontrado.');
    return;
  }


  if (races.length === 0) {
    raceGrid.innerHTML = "<p>No races available</p>";
    return;
  }

  raceGrid.innerHTML = races.map(createRaceCard).join("");
}

document.addEventListener("DOMContentLoaded", fetchAndRenderRaces);