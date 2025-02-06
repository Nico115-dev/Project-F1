import { makeApiRequest } from "../../src/utils/iService.js";

const ENDPOINT = "circuitos";



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



