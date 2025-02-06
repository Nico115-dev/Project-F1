import { makeApiRequest } from "../../src/utils/iService.js"; // Asegúrate de que la ruta sea correcta

const ENDPOINT = "equipos"; // O el nombre del endpoint correspondiente para las escuderías

// Obtener todas las escuderías
export async function getTeams() {
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
export async function getTeamById(id) {
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
export async function saveTeam(team) {
   try {
      const response = await makeApiRequest({
        endPoint: ENDPOINT,
        method: "POST",
        body: team, // No usar JSON.stringify()
      });
    }catch (error) {
        console.error("Error al crear la pista:", error);
        throw error;
}
}

export async function obtenerNombresEscuderias() {
  try {
    const data = await getTeams(); 
    const teams = data.map(team => ({
      id: team.id,
      nombre: team.nombre
    }));
    return teams;
  } catch (error) {
    console.error("Error al obtener nombres:", error);
    return []; 
  }
}

export async function actualizarEscuderia(id, escData) {
  try {
    const response = await makeApiRequest({

      endPoint: `${ENDPOINT}/${id}`,
      method: "PUT",
      body: escData,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar la pista:", error);
    throw error;
  }
}



// Eliminar una escudería
export async function deleteTeam(id) {
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

// Obtener escuderías sin pilotos (si necesitas un filtrado similar al de los pilotos)
export async function obtenerEscuderiasSinPilotos() {
  const teams = await getTeams()

  // Filtra las escuderías donde el campo 'pilotos' sea null o undefined
  const escuderiasSinPilotos = teams.filter(team => !team.pilotos || team.pilotos.length === 0);
  return escuderiasSinPilotos;
}
