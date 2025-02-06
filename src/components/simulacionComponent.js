import { getVehicles, getPilots, getTracks, getTeams, getPodio, updatePodio } from "../controllers/simulacionController.js";

export class SimulacionCarrera extends HTMLElement {
  constructor() {
    super();
    this.teams = [];
    this.pilots = [];
    this.vehicles = [];
    this.tracks = [];
    this.selectedVehicleId = null;
    this.selectedTrackId = null;
    this.selectedPilotId = null;
    // Variables para configuración del vehículo con valores predeterminados
    this.selectedDrivingMode = "normal";
    this.selectedAerodynamic = "media";
    this.selectedTirePressure = "estandar";
    this.selectedFuelStrategy = "balanceada";
  }

  connectedCallback() {
    this.render();
    this.loadVehicleConfig(); // carga la configuración guardada (si existe)
    this.loadData();
    this.setupEventListeners();
    const formElement = this.querySelector("form");
    if (formElement) {
      formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    }
  }

  render() {
    this.innerHTML = `
      <style>
        .simulacion-container {
          background: linear-gradient(135deg,rgb(79, 75, 75), #f0f0f0);
          border-radius: 8px;
          padding: 20px;
          max-width: 800px;
          margin: 20px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          color: black;
        }
        .simulacion-container h1 {
          text-align: center;
          color: #ff2020;
        }

        label {
          display: block;
          margin: 10px 0 5px;
        }
          #selectTeam{  
            color: black;
          }
        select, button {
          padding: 8px;
          font-size: 1rem;
          margin-bottom: 10px;
          color: black;
        }

        .cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .card {
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
          flex: 1 0 45%;
          text-align: center;
        }
        .card.selected {
          border-color: #ff2020;
          transform: scale(1.05);
        }
        #raceResults {
          margin-top: 20px;
        }

        .card-image-container {
          width: 100%;
          height: 120px;
          border-radius: 4px;
          background-color:rgb(20, 19, 19);
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain; /* Se usa contain para que la imagen se vea completa */
          transition: transform 0.3s ease;
        }
        .card:hover .card-image-container img {
          transform: scale(1.05);
        }
        .card-info {
          padding: 5px;
        }
        /* Estilos para la sección de Configuración del Vehículo */
        .configurations {
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 15px;
          margin-top: 20px;
          background:rgb(21, 19, 19);
        }
        .configurations h2 {
          text-align: center;
          color: red;
          margin-bottom: 15px;
        }

        #fuelStrategySelect{
          color: black;
          background-color: rgb(241, 232, 232);
        }
        #tirePressureSelect{
          color: black;
          background-color: rgb(241, 232, 232);
        }
        #aerodynamicSelect{
          color: black;
          background-color: rgb(241, 232, 232);
        }
        #drivingModeSelect{
          color: black;
          background-color: rgb(241, 232, 232);
        }
      </style>
      

         <header class="nav-bar">

          <div class="logo">
            <img src="../img/image.png" alt="F1 Logo">
          </div>
          <nav>
            <ul>
              <li><a href="../../src/views/menu.html">Home</a></li>
              <li><a href="../../src/views/vehiculos.html">Vehiculos</a></li>
              <li><a href="../../src/views/pilotos.html">Teams</a></li>
              <li><a href="../../src/views/pistas.html">Circuits</a></li>
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

      <div class="simulacion-container">
        <h1>Simulación de Carrera</h1>
        <div>
          <label for="selectTeam">Elige Equipo:</label>
          <select id="selectTeam">
            <option value="">Seleccione Equipo</option>
          </select>
        </div>
        <div>
          <label>Elige Piloto:</label>
          <div id="pilotCards" class="cards-container"></div>
        </div>
        <div>
          <label>Elige Vehículo:</label>
          <div id="vehicleCards" class="cards-container"></div>
        </div>
        <div>
          <label>Elige Pista:</label>
          <div id="trackCards" class="cards-container"></div>
        </div>
        
        <!-- Sección de Configuración de Vehículo -->
        <div class="configurations">
          <h2>Configuración del Vehículo</h2>
          <div>
            <label for="drivingModeSelect">Modo de Conducción:</label>
            <select id="drivingModeSelect">
              <option value="normal">Normal</option>
              <option value="agresiva">Agresiva</option>
              <option value="ahorro">Ahorro de Combustible</option>
            </select>
          </div>
          <div>
            <label for="aerodynamicSelect">Carga Aerodinámica:</label>
            <select id="aerodynamicSelect">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label for="tirePressureSelect">Presión de Neumáticos:</label>
            <select id="tirePressureSelect">
              <option value="baja">Baja</option>
              <option value="estandar">Estándar</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div>
            <label for="fuelStrategySelect">Estrategia de Combustible:</label>
            <select id="fuelStrategySelect">
              <option value="agresiva">Agresiva</option>
              <option value="balanceada">Balanceada</option>
              <option value="ahorro">Ahorro</option>
            </select>
          </div>
        </div>
        
        <button type="button" id="startRaceBtn">Iniciar Carrera</button>
        <div id="raceResults"></div>
      </div>
    `;
  }

  async loadData() {
    try {
      // Cargar datos de los endpoints
      this.teams = await getTeams();
      this.pilots = await getPilots();
      this.vehicles = await getVehicles();
      this.tracks = await getTracks();

      // Poblar select de equipos
      this.populateSelect("selectTeam", this.teams, "nombre");
      // Poblar tarjetas de vehículos y pistas
      this.populateCards("vehicleCards", this.vehicles, "vehicle");
      this.populateCards("trackCards", this.tracks, "track");
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }

  populateSelect(selectId, dataArray, displayField) {
    const selectElement = this.querySelector(`#${selectId}`);
    selectElement.innerHTML = `<option value="">Seleccione ${selectId.replace("select", "")}</option>`;
    dataArray.forEach(item => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item[displayField];
      selectElement.appendChild(option);
    });
  }

  populateCards(containerId, dataArray, type) {
    const container = this.querySelector(`#${containerId}`);
    container.innerHTML = "";
    dataArray.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      
      if (type === "vehicle") {
        const imageUrl = item.imagen1;
        let imgSrc = imageUrl;
        if (!imageUrl.startsWith("http")) {
          imgSrc = imageUrl.replace("../src/img/", "../img/");
        }
        card.innerHTML = `
          <div class="card-image-container">
            <img src="${imgSrc}" alt="${item.modelo}">
          </div>
          <div class="card-info">
            <p>${item.modelo}</p>
            <p>Motor: ${item.motor}</p>
          </div>
        `;
        card.addEventListener("click", () => {
          this.selectCard(container, card, "vehicle", item.id);
        });
      } else if (type === "track") {
        const trackImageURL = item.circuitImage;
        let imgSrc = "";
        if (trackImageURL) {
          if (trackImageURL.startsWith("http")) {
            imgSrc = trackImageURL;
          } else {
            imgSrc = trackImageURL.replace("../src/img/", "../img/");
          }
        }
        card.innerHTML = `
          <div class="card-image-container">
            <img src="${imgSrc}" alt="${item.title}">
          </div>
          <div class="card-info">
            <p>${item.title}</p>
          </div>
        `;
        card.addEventListener("click", () => {
          this.selectCard(container, card, "track", item.id);
        });
      }
      
      container.appendChild(card);
    });
  }

  // Función para poblar las tarjetas de pilotos
  populatePilotCards(containerId, pilotArray) {
    const container = this.querySelector(`#${containerId}`);
    container.innerHTML = "";
    pilotArray.forEach(pilot => {
      const card = document.createElement("div");
      card.classList.add("card");
      let imgSrc = pilot.imagen;
      if (!imgSrc.startsWith("http")) {
        imgSrc = imgSrc.replace("../src/img/", "../img/");
      }
      card.innerHTML = `
        <div class="card-image-container">
          <img src="${imgSrc}" alt="${pilot.nombre}">
        </div>
        <div class="card-info">
          <p>${pilot.nombre}</p>
          <p>${pilot.equipo}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        this.selectPilotCard(container, card, pilot.id);
      });
      container.appendChild(card);
    });
  }

  // Selección de tarjetas de vehículos y pistas
  selectCard(container, selectedCard, cardType, id) {
    const cards = container.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("selected"));
    selectedCard.classList.add("selected");
    if (cardType === "vehicle") {
      this.selectedVehicleId = id;
    } else if (cardType === "track") {
      this.selectedTrackId = id;
    }
  }

  // Selección de tarjetas de pilotos
  selectPilotCard(container, selectedCard, id) {
    const cards = container.querySelectorAll(".card");
    cards.forEach(card => card.classList.remove("selected"));
    selectedCard.classList.add("selected");
    this.selectedPilotId = id;
  }

  setupEventListeners() {
    this.querySelector("#selectTeam").addEventListener("change", (e) => {
      const teamId = e.target.value;
      this.updatePilotOptions(teamId);
      this.updateVehicleOptions(teamId);
    });
    this.querySelector("#startRaceBtn").addEventListener("click", (event) => {
      event.preventDefault();
      this.handleRace();
    });
    this.querySelector("#drivingModeSelect").addEventListener("change", (e) => {
      this.selectedDrivingMode = e.target.value;
    });
    this.querySelector("#aerodynamicSelect").addEventListener("change", (e) => {
      this.selectedAerodynamic = e.target.value;
    });
    this.querySelector("#tirePressureSelect").addEventListener("change", (e) => {
      this.selectedTirePressure = e.target.value;
    });
    this.querySelector("#fuelStrategySelect").addEventListener("change", (e) => {
      this.selectedFuelStrategy = e.target.value;
    });
  }

  updatePilotOptions(teamId) {
    const pilotCardsContainer = this.querySelector("#pilotCards");
    // Si no se ha seleccionado un equipo, se oculta el contenedor de pilotos
    if (!teamId) {
      pilotCardsContainer.innerHTML = "";
      pilotCardsContainer.style.display = "none";
      return;
    }
    // Mostrar contenedor de pilotos al seleccionar un equipo
    pilotCardsContainer.style.display = "grid"; // o "block" según tu layout
    const selectedTeam = this.teams.find(team => String(team.id) === teamId);
    if (!selectedTeam) {
      pilotCardsContainer.innerHTML = "";
      pilotCardsContainer.style.display = "none";
      return;
    }
    const filteredPilots = this.pilots.filter(pilot => pilot.equipo === selectedTeam.nombre);
    this.populatePilotCards("pilotCards", filteredPilots);
  }

  updateVehicleOptions(teamId) {
    const vehicleCardsContainer = this.querySelector("#vehicleCards");
    // Si no se ha seleccionado un equipo, se oculta el contenedor de autos
    if (!teamId) {
      vehicleCardsContainer.innerHTML = "";
      vehicleCardsContainer.style.display = "none";
      return;
    }
    // Mostrar contenedor de autos al seleccionar un equipo
    vehicleCardsContainer.style.display = "grid"; // o "block" según tu layout
    const selectedTeam = this.teams.find(team => String(team.id) === teamId);
    if (!selectedTeam) {
      vehicleCardsContainer.innerHTML = "";
      vehicleCardsContainer.style.display = "none";
      return;
    }
    // Normalizamos el valor de motor del equipo (por ejemplo, "ferrari")
    const teamMotor = (selectedTeam.motor || "").toLowerCase().trim();
    // Filtrar vehículos cuyo motor coincida exactamente con el motor del equipo
    const filteredVehicles = this.vehicles.filter(vehicle => {
      const vehicleMotor = (vehicle.motor || "").toLowerCase().trim();
      return vehicleMotor === teamMotor;
    });
    this.populateCards("vehicleCards", filteredVehicles, "vehicle");
  }

  async handleRace() {
    // Validación de selección (asegúrate de que se hayan seleccionado equipo, piloto, vehículo y pista)
    const teamId = this.querySelector("#selectTeam").value;
    const pilotId = this.selectedPilotId;
    const vehicleId = this.selectedVehicleId;
    const trackId = this.selectedTrackId;
    
    if (!teamId || !pilotId || !vehicleId || !trackId) {
      alert("Por favor, selecciona un equipo, piloto, vehículo y pista.");
      return;
    }
    
    // Leer y guardar la configuración del vehículo
    const drivingMode = this.querySelector("#drivingModeSelect").value || "normal";
    const aerodynamic = this.querySelector("#aerodynamicSelect").value || "media";
    const tirePressure = this.querySelector("#tirePressureSelect").value || "estandar";
    const fuelStrategy = this.querySelector("#fuelStrategySelect").value || "balanceada";
    
    const vehicleConfig = { drivingMode, aerodynamic, tirePressure, fuelStrategy };
    localStorage.setItem("vehicleConfig", JSON.stringify(vehicleConfig));
    
    const selectedPilot = this.pilots.find(p => p.id === pilotId);
    const selectedVehicle = this.vehicles.find(v => v.id === vehicleId);
    const selectedTrack = this.tracks.find(t => String(t.id) === trackId);
    
    // Cálculos, efectos de pista, etc.
    const circuitEffects = this.calculateCircuitEffects(selectedTrack);
    const performance = selectedVehicle.rendimiento.conduccion_normal;
    const baseConsumo = performance.consumo_combustible[circuitEffects.condicion] || 1;
    const baseDesgaste = performance.desgaste_neumaticos[circuitEffects.condicion] || 1;
    const finalConsumo = baseConsumo * circuitEffects.consumptionModifier;
    const finalDesgaste = baseDesgaste * circuitEffects.tireWearModifier;
    
    console.log("Consumo ajustado:", finalConsumo);
    console.log("Desgaste ajustado:", finalDesgaste);
    
    // Simular la carrera y ordenar los resultados por tiempo
    const results = this.simulateRace(selectedPilot, selectedVehicle, selectedTrack, vehicleConfig);
    results.sort((a, b) => a.time - b.time);
    
    // Deshabilitar el botón para evitar reinicios
    const startRaceBtn = this.querySelector("#startRaceBtn");
    startRaceBtn.disabled = true;
    
    // Mostrar el podio en un modal (sin subir datos aún)
    this.displayResults(results);
  }

  simulateRace(selectedPilot, selectedVehicle, selectedTrack, vehicleConfig) {
    const baseTime = 120; // tiempo base en segundos
    const userSpeedFactor = selectedVehicle.velocidad_maxima_kmh || 300;
    let userTime = baseTime - (userSpeedFactor / 20) + Math.random() * 5;

    // Definición de multiplicadores según la configuración
    const drivingModeMultipliers = {
      normal: 1.0,
      agresiva: 0.95,
      ahorro: 1.05
    };
    const aerodynamicMultipliers = {
      baja: 0.98,
      media: 1.0,
      alta: 1.03
    };
    const tirePressureMultipliers = {
      baja: 1.02,
      estandar: 1.0,
      alta: 0.97
    };
    const fuelStrategyMultipliers = {
      agresiva: 0.96,
      balanceada: 1.0,
      ahorro: 1.04
    };
    
    const totalMultiplier = 
      drivingModeMultipliers[vehicleConfig.drivingMode] *
      aerodynamicMultipliers[vehicleConfig.aerodynamic] *
      tirePressureMultipliers[vehicleConfig.tirePressure] *
      fuelStrategyMultipliers[vehicleConfig.fuelStrategy];
      
    userTime = userTime * totalMultiplier;

    const competitorPilots = this.pilots.filter(pilot => pilot.id !== selectedPilot.id);
    const competitorVehicles = this.vehicles.filter(vehicle => vehicle.id !== selectedVehicle.id);

    const randomPilot1 = competitorPilots[Math.floor(Math.random() * competitorPilots.length)];
    const randomVehicle1 = competitorVehicles[Math.floor(Math.random() * competitorVehicles.length)];
    const compSpeedFactor1 = randomVehicle1.velocidad_maxima_kmh || 300;
    const competitorTime1 = baseTime - (compSpeedFactor1 / 20) + Math.random() * 5;

    let remainingPilots = competitorPilots.filter(pilot => pilot.id !== randomPilot1.id);
    let remainingVehicles = competitorVehicles.filter(vehicle => vehicle.id !== randomVehicle1.id);
    if (remainingPilots.length === 0) remainingPilots = competitorPilots;
    if (remainingVehicles.length === 0) remainingVehicles = competitorVehicles;
    
    const randomPilot2 = remainingPilots[Math.floor(Math.random() * remainingPilots.length)];
    const randomVehicle2 = remainingVehicles[Math.floor(Math.random() * remainingVehicles.length)];
    const compSpeedFactor2 = randomVehicle2.velocidad_maxima_kmh || 300;
    const competitorTime2 = baseTime - (compSpeedFactor2 / 20) + Math.random() * 5;

    const results = [
      { pilot: selectedPilot.nombre, vehicle: selectedVehicle.modelo, time: userTime },
      { pilot: randomPilot1.nombre, vehicle: randomVehicle1.modelo, time: competitorTime1 },
      { pilot: randomPilot2.nombre, vehicle: randomVehicle2.modelo, time: competitorTime2 }
    ];

    results.sort((a, b) => a.time - b.time);
    return results;
  }

  getRandomWeather() {
    const weatherOptions = [
      "Soleado",
      "Parcialmente nublado",
      "Nublado",
      "Lluvioso",
      "Tormentoso",
      "Nevado"
    ];
    const randomIndex = Math.floor(Math.random() * weatherOptions.length);
    return weatherOptions[randomIndex];
  }

  displayResults(results) {
    const weather = this.getRandomWeather();
    
    // Crear el overlay del modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
    modalOverlay.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          width: 90%;
          position: relative;
          text-align: center;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
        }
        .upload-btn {
          background: #4CAF50;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px 15px;
          cursor: pointer;
          margin-top: 15px;
        }
        .upload-btn:hover {
          background: #45a049;
        }
        .modal-header {
          margin-bottom: 20px;
        }
        .modal-header .weather-info {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #ff2020;
        }
        .modal-body .podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          margin: 20px auto;
        }
        .modal-body .podium-spot {
          width: 120px;
          margin: 0 10px;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
          background: #eaeaea;
          transition: transform 0.3s ease;
        }
        .modal-body .podium-spot:hover {
          transform: scale(1.05);
        }
        .modal-body .podium-spot.first {
          height: 180px;
          background: #ffd700;
        }
        .modal-body .podium-spot.second {
          height: 150px;
          background: #c0c0c0;
        }
        .modal-body .podium-spot.third {
          height: 140px;
          background: #cd7f32;
        }
        .modal-body .podium-rank {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .modal-body .podium-name {
          font-size: 1.1rem;
          margin: 5px 0;
          font-weight: bold;
        }
        .modal-body .podium-vehicle,
        .modal-body .podium-time {
          font-size: 0.9rem;
          margin: 2px 0;
        }
      </style>
      <div class="modal-content">
        <button class="close-btn" id="closeModal">Cerrar</button>
        <div class="modal-header">
          <div class="weather-info">Condición climática: ${weather}</div>
          <h2>Podio de la Carrera</h2>
        </div>
        <div class="modal-body">
          <div class="podium">
            <div class="podium-spot second">
              <div class="podium-rank">2º</div>
              <div class="podium-name">${results[1].pilot}</div>
              <div class="podium-vehicle">${results[1].vehicle}</div>
              <div class="podium-time">${results[1].time.toFixed(2)} seg</div>
            </div>
            <div class="podium-spot first">
              <div class="podium-rank">1º</div>
              <div class="podium-name">${results[0].pilot}</div>
              <div class="podium-vehicle">${results[0].vehicle}</div>
              <div class="podium-time">${results[0].time.toFixed(2)} seg</div>
            </div>
            <div class="podium-spot third">
              <div class="podium-rank">3º</div>
              <div class="podium-name">${results[2].pilot}</div>
              <div class="podium-vehicle">${results[2].vehicle}</div>
              <div class="podium-time">${results[2].time.toFixed(2)} seg</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="upload-btn" id="uploadResultsBtn">Subir Resultados</button>
        </div>
      </div>
    `;
    
    // Agregar el modal al documento
    document.body.appendChild(modalOverlay);
    
    // Cerrar el modal manualmente
    modalOverlay.querySelector("#closeModal").addEventListener("click", () => {
      modalOverlay.remove();
      this.querySelector("#startRaceBtn").disabled = false;
    });
    
    // Subir resultados al presionar "Subir Resultados"
    modalOverlay.querySelector("#uploadResultsBtn").addEventListener("click", () => {
      const winningPilotName = results[0].pilot;
      const winningPilot = this.pilots.find(p => p.nombre === winningPilotName);
      if (winningPilot) {
        const winningTeam = winningPilot.equipo;
        const puntosObtenidos = 25; // Ajusta este valor según tu sistema de puntuación
        updatePodio(winningTeam, puntosObtenidos)
          .then(data => {
            console.log("Podio actualizado:", data);
            alert("Resultados subidos exitosamente");
            modalOverlay.remove();
            this.querySelector("#startRaceBtn").disabled = false;
          })
          .catch(error => {
            console.error("Error al actualizar el podio:", error);
            alert("Error al subir los resultados");
          });
      }
    });
    
    // Auto-cerrar el modal después de 20 segundos si no se interactúa
    setTimeout(() => {
      if (document.body.contains(modalOverlay)) {
        modalOverlay.remove();
        this.querySelector("#startRaceBtn").disabled = false;
      }
    }, 20000);
  }

  // Carga la configuración guardada (si existe) y actualiza los selects
  loadVehicleConfig() {
    const storedConfig = localStorage.getItem("vehicleConfig");
    if (storedConfig) {
      const config = JSON.parse(storedConfig);
      this.selectedDrivingMode = config.drivingMode || "normal";
      this.selectedAerodynamic = config.aerodynamic || "media";
      this.selectedTirePressure = config.tirePressure || "estandar";
      this.selectedFuelStrategy = config.fuelStrategy || "balanceada";
      this.querySelector("#drivingModeSelect").value = this.selectedDrivingMode;
      this.querySelector("#aerodynamicSelect").value = this.selectedAerodynamic;
      this.querySelector("#tirePressureSelect").value = this.selectedTirePressure;
      this.querySelector("#fuelStrategySelect").value = this.selectedFuelStrategy;
    }
  }

  calculateCircuitEffects(selectedTrack) {
    // Se asume que 'selectedTrack' tiene una propiedad 'condicion'
    // que define el estado del circuito: "seco", "lluvioso" o "extremo"
    let consumptionModifier = 1;
    let tireWearModifier = 1;
    
    // Si no se ha definido la condición, se asume por defecto "seco"
    if (!selectedTrack || !selectedTrack.condicion) {
      return { consumptionModifier, tireWearModifier, condicion: "seco" };
    }
    
    const condicion = selectedTrack.condicion.toLowerCase().trim();
    
    switch (condicion) {
      case "seco":
        consumptionModifier = 1.0;
        tireWearModifier = 1.0;
        break;
      case "lluvioso":
        consumptionModifier = 1.1; // Incrementa en un 10% el consumo
        tireWearModifier = 0.9;    // Reduce en un 10% el desgaste
        break;
      case "extremo":
        consumptionModifier = 1.2; // Incrementa en un 20% el consumo
        tireWearModifier = 1.3;    // Incrementa en un 30% el desgaste
        break;
      default:
        consumptionModifier = 1.0;
        tireWearModifier = 1.0;
    }
    
    return { consumptionModifier, tireWearModifier, condicion };
  }
}

customElements.define("simulacion-carrera", SimulacionCarrera);