const urlApi = "http://localhost:4000/vehiculos";

export const obtenerVehiculos = async function () {
  fetch(urlApi)
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Verifica que 'data' contiene un array de vehículos

      if (!data || data.length === 0) {
        console.error("No se encontraron vehículos en la respuesta.");
        return;
      }

      const gallery = this.shadowRoot.getElementById("gallery");

      data.forEach((vehiculo) => {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");

        const nameVehicle = document.createElement("h4");
        nameVehicle.textContent = `${vehiculo.modelo} - ${vehiculo.motor}`;

        const img = document.createElement("img");
        img.src = vehiculo.imagen1;
        img.alt = `${vehiculo.equipo} ${vehiculo.modelo}`;

        const description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = `
        <h3>${vehiculo.equipo} ${vehiculo.modelo}</h3>
        <p><strong>Motor:</strong> ${vehiculo.motor}</p>
        <p><strong>Velocidad Máxima:</strong> ${vehiculo.velocidad_maxima_kmh} km/h</p>
        <p><strong>Aceleración (0-100 km/h):</strong> ${vehiculo.aceleracion_0_100} segundos</p>
      `;

        galleryItem.style.setProperty("--imagen2", `url(${vehiculo.imagen2})`);
        galleryItem.appendChild(nameVehicle);
        galleryItem.appendChild(img);
        galleryItem.appendChild(description);
        gallery.appendChild(galleryItem);
      });
    })
    .catch((error) => console.error("Error fetching data: ", error));
};
