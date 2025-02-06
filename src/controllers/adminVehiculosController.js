
import { makeApiRequest } from "../../src/utils/iService.js"; // Asegúrate de que la ruta sea correcta

const ENDPOINT = "vehiculos"; // O el nombre del endpoint correspondiente para las escuderías

// Obtener todas las escuderías
export async function getVehiculos() {
 try {
    const response = await makeApiRequest({
      endPoint: ENDPOINT,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error al obtener las escuderias:", error);
    throw error;
  }
}

// Obtener una escudería por ID
export async function getVehiculoById(id) {
    try {
        const response = await makeApiRequest({
          endPoint: `${ENDPOINT}/${id}`,
          method: "GET",
        });
        return response;
      } catch (error) {
        console.error("Error al obtener la escuderia por ID:", error);
        throw error;
      }
}

// Guardar o actualizar una escudería
export async function saveVehiculo(vehiculo) {
   try {
      const response = await makeApiRequest({
        endPoint: ENDPOINT,
        method: "POST",
        body: vehiculo, // No usar JSON.stringify()
      });
    }catch (error) {
        console.error("Error al crear la pista:", error);
        throw error;
}
}

export async function obtenerNombresVehiculos() {
  try {
    const data = await getVehiculos(); 
    const pilots = data.map(vehiculo => ({
      id: vehiculo.id,
      nombre: vehiculo.modelo
    }));
    return pilots;
  } catch (error) {
    console.error("Error al obtener nombres:", error);
    return []; 
  }
}

export async function actualizarVehiculo(id, vehiData) {
  try {
    const response = await makeApiRequest({

      endPoint: `${ENDPOINT}/${id}`,
      method: "PUT",
      body: vehiData,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar la pista:", error);
    throw error;
  }
}



// Eliminar una escudería
export async function deleteVehiculo(id) {
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



