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

        // Evento para abrir el modal con la información del vehículo
        galleryItem.addEventListener("click", () => {
          modal.style.display = "flex";
          modalTitle.textContent = `${vehiculo.equipo} ${vehiculo.modelo}`;
          modalImage.src = img.src; // Usar la imagen corregida

          modalDescription.innerHTML = `
            <p><strong>Motor:</strong> ${vehiculo.motor}</p>
            <p><strong>Velocidad Máxima:</strong> ${vehiculo.velocidad_maxima_kmh} km/h</p>
            <p><strong>Aceleración (0-100 km/h):</strong> ${vehiculo.aceleracion_0_100} segundos</p>

          `;
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


