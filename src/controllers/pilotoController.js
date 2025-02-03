async function getPilots() {
  const apiUrl = "http://localhost:4000/pilotos";
  const pilotsContainer = document.querySelector("#pilots-container");
  const modal = document.querySelector("#modal");
  const pilotName = document.querySelector("#pilot-name");
  const pilotTeam = document.querySelector("#pilot-team");
  const pilotRole = document.querySelector("#pilot-role");
  const pilotBirthdate = document.querySelector("#pilot-birthdate");
  const pilotNationality = document.querySelector("#pilot-nationality");
  const closeModal = document.querySelector("#close-modal");

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) { 
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const pilots = await response.json();
    pilotsContainer.innerHTML = ""; 


    pilots.forEach((pilot) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${pilot.imagen}" alt="${pilot.nombre}" class="piloto-img">
        <h3>${pilot.nombre}</h3>
        <p>${pilot.equipo}</p>
      `;
      card.addEventListener("click", () => {
        pilotName.textContent = pilot.nombre;
        pilotTeam.textContent = pilot.equipo;
        pilotRole.textContent = pilot.rol;
        pilotBirthdate.textContent = pilot["fecha de nacimiento"];
        pilotNationality.textContent = pilot.Nacionalidad;
        modal.style.display = "flex"; 
      });

      pilotsContainer.appendChild(card); 
    });
  } catch (error) {
    console.error("Error fetching pilots:", error); 
  }
}

getPilots();
