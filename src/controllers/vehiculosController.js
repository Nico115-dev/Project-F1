const urlApi = "http://localhost:4000/vehiculos";


export const obtenerVehiculos = async function () {
  fetch(urlApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (!data || data.length === 0) {
        console.error("No se encontraron vehículos en la respuesta.");
        return;
      }

      const gallery = document.getElementById("gallery");
      const modal = document.getElementById("modal");
      const modalTitle = document.getElementById("modal-title");
      const modalImage = document.getElementById("modal-image");
      const modalDescription = document.getElementById("modal-description");
      const closeModal = document.querySelector(".close");

      data.forEach((vehiculo) => {
        console.log(vehiculo.imagen1);

        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const nameVehicle = document.createElement("h4");
        nameVehicle.classList.add("name");
        nameVehicle.textContent = `${vehiculo.modelo} - ${vehiculo.motor}`;

        const img = document.createElement("img");

        // Normalizar la ruta de la imagen eliminando '../' al inicio
        const imagenPath = vehiculo.imagen1.replace(/^(\.\.\/)+/, "");
        img.src = `http://127.0.0.1:5502/${imagenPath}`;
        img.alt = `${vehiculo.equipo} ${vehiculo.modelo}`;

        const description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = `
          <h3>${vehiculo.equipo} ${vehiculo.modelo}</h3>
          <p><strong>Motor:</strong> ${vehiculo.motor}</p>
        `;

        // Normalizar la ruta de la segunda imagen
        const imagen2Path = vehiculo.imagen2.replace(/^(\.\.\/)+/, "");
        galleryItem.style.setProperty("--imagen2", `url(http://127.0.0.1:5502/${imagen2Path})`);

        // Estadísticas de progreso (puedes cambiar estos valores según los campos reales)
        const velocidadMaxima = vehiculo.velocidad_maxima_kmh; // Asegúrate de que estos datos existan
        const aceleracion = vehiculo.aceleracion_0_100;

        // Crea los contenedores para los progresos
        const statsSection = document.createElement("div");
        statsSection.classList.add("stats-section");

        // Progreso de velocidad máxima
        const progressVelocidad = createProgressCircle(velocidadMaxima, 400, "Velocidad Maxima"); // Asumiendo 400 km/h como máximo
        statsSection.appendChild(progressVelocidad);

        // Progreso de aceleración
        const progressAceleracion = createProgressCircle(aceleracion, 10, "Aceleración Maxima"); // Asumiendo 10 segundos como máximo
        statsSection.appendChild(progressAceleracion);

        // Agregar todo al modal
        galleryItem.addEventListener("click", () => {
          modal.style.display = "flex";
          modalTitle.textContent = `${vehiculo.equipo} ${vehiculo.modelo}`;
          modalImage.src = img.src; // Usar la imagen corregida
          const consumoCombustibles = vehiculo.rendimiento.conduccion_normal.consumo_combustible.seco;
          const consumoCombustiblell = vehiculo.rendimiento.conduccion_normal.consumo_combustible.lluvioso;
          const consumoCombustibleEx = vehiculo.rendimiento.conduccion_normal.consumo_combustible.extremo;

          modalDescription.innerHTML = `
          
    <p><strong>Equipo:</strong> ${vehiculo.equipo}</p>
    <p><strong>Motor:</strong> ${vehiculo.motor}</p>
    <p><strong>Modelo:</strong> ${vehiculo.modelo}</p>
      <p><strong>Consumo (seco):</strong> ${consumoCombustibles} L/100 km</p>
             <p><strong>Consumo (Lluvioso):</strong> ${consumoCombustiblell} L/100 km</p>
              <p><strong>Consumo (Extremo):</strong> ${consumoCombustibleEx} L/100 km</p>
  
  `;

          // Incluir las estadísticas en el modal
          modalDescription.appendChild(statsSection);
        });

        // Cerrar el modal al hacer clic en la "X"
        closeModal.addEventListener("click", () => {
          modal.style.display = "none";
        });

        // Cerrar el modal si se hace clic fuera del contenido
        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });

        galleryItem.appendChild(nameVehicle);
        galleryItem.appendChild(img);
        galleryItem.appendChild(description);
        gallery.appendChild(galleryItem);
      });
    })
    .catch((error) => console.error("Error fetching data: ", error));
};

function createProgressCircle(value, maxValue, label) {
  const progressContainer = document.createElement("div");
  progressContainer.classList.add("progress-container", "animate-entry"); // Animación de entrada

  const progressSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  progressSvg.setAttribute("width", "140");
  progressSvg.setAttribute("height", "140");
  progressSvg.setAttribute("viewBox", "0 0 100 100");

  const circleBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circleBackground.setAttribute("r", "40");
  circleBackground.setAttribute("cx", "50");
  circleBackground.setAttribute("cy", "50");
  circleBackground.setAttribute("fill", "transparent");
  circleBackground.setAttribute("stroke", "#2a2a2a");
  circleBackground.setAttribute("stroke-width", "8");

  const circleProgress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circleProgress.setAttribute("r", "40");
  circleProgress.setAttribute("cx", "50");
  circleProgress.setAttribute("cy", "50");
  circleProgress.setAttribute("fill", "transparent");
  circleProgress.setAttribute("stroke-width", "8");
  circleProgress.setAttribute("stroke-linecap", "round");
  circleProgress.setAttribute("stroke-dasharray", "251.2");
  circleProgress.setAttribute("stroke-dashoffset", "251.2");
  circleProgress.classList.add("progress-animation");

  // Animación de gradiente
  circleProgress.setAttribute("stroke", "url(#gradient)");

  // Definir el gradiente animado
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  linearGradient.setAttribute("id", "gradient");
  linearGradient.setAttribute("x1", "0%");
  linearGradient.setAttribute("y1", "0%");
  linearGradient.setAttribute("x2", "100%");
  linearGradient.setAttribute("y2", "0%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#ff5733");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "50%");
  stop2.setAttribute("stop-color", "#ffcc00");

  const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop3.setAttribute("offset", "100%");
  stop3.setAttribute("stop-color", "#33ff57");

  linearGradient.appendChild(stop1);
  linearGradient.appendChild(stop2);
  linearGradient.appendChild(stop3);
  defs.appendChild(linearGradient);
  progressSvg.appendChild(defs);

  // Calcular porcentaje
  const pct = (value / maxValue) * 100;
  const offset = 251.2 - (pct / 100) * 251.2;

  setTimeout(() => {
    circleProgress.style.transition = "stroke-dashoffset 1.2s ease-in-out, transform 0.5s ease-in-out";
    circleProgress.setAttribute("stroke-dashoffset", offset);
    if (pct >= 100) {
      circleProgress.classList.add("bounce-animation");
    }
  }, 200);

  // Texto de porcentaje en el centro
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", "50%");
  text.setAttribute("y", "50%");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "16");
  text.setAttribute("fill", "#fff");
  text.setAttribute("font-weight", "bold");
  text.textContent = `${Math.round(pct)}%`;

  progressSvg.appendChild(circleBackground);
  progressSvg.appendChild(circleProgress);
  progressSvg.appendChild(text);
  progressContainer.appendChild(progressSvg);

  const labelElement = document.createElement("div");
  labelElement.classList.add("progress-label");
  labelElement.textContent = label;
  progressContainer.appendChild(labelElement);

  return progressContainer;
}

