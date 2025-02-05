import { makeApiRequest } from "../../src/utils/iService.js";

const ENDPOINT = "circuitos";

function fetchAndRenderRaces() {
  fetch("http://localhost:4000/circuitos")
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



export async function crearPista(pistaData) {
  try {
    const response = await makeApiRequest({
      endPoint: ENDPOINT,
      method: "POST",
      body: pistaData, // No usar JSON.stringify()
    });
    return response;
  } catch (error) {
    console.error("Error al crear la pista:", error);
    throw error;
  }
}



export async function obtenerPistas() {
  try {
    const response = await makeApiRequest({
      endPoint: ENDPOINT,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las pistas:", error);
    throw error;
  }
}

export async function obtenerNombresPistas() {
  try {
    const data = await obtenerPistas(); // Obtener datos
    const pistas = data.map(pista => ({
      id: pista.id,
      title: pista.title
    }));
    return pistas;
  } catch (error) {
    console.error("Error al obtener nombres:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}


// Obtener una pista por su ID
export async function obtenerPistaPorId(id) {
  try {
    const response = await makeApiRequest({
      endPoint: `${ENDPOINT}/${id}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener la pista por ID:", error);
    throw error;
  }
}

// Actualizar una pista
export async function actualizarPista(id, pistaData) {
  try {
    const response = await makeApiRequest({

      endPoint: `${ENDPOINT}/${id}`,
      method: "PUT",
      body: pistaData,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar la pista:", error);
    throw error;
  }
}

// Eliminar una pista
export async function eliminarPista(id) {
  try {
    const response = await makeApiRequest({
      endPoint: `${ENDPOINT}/${id}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error al eliminar la pista:", error);
    throw error;
  }
}



