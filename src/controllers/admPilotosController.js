
import { makeApiRequest } from "../../src/utils/iService.js"; // Asegúrate de que la ruta sea correcta

const ENDPOINT = "pilotos"; // O el nombre del endpoint correspondiente para las escuderías

// Obtener todas las escuderías
export async function getPilots() {
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
export async function getPilotoById(id) {
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
export async function savePiloto(piloto) {
   try {
      const response = await makeApiRequest({
        endPoint: ENDPOINT,
        method: "POST",
        body: piloto, // No usar JSON.stringify()
      });
    }catch (error) {
        console.error("Error al crear la pista:", error);
        throw error;
}
}

export async function obtenerNombresPilotos() {
  try {
    const data = await getPilots(); 
    const pilots = data.map(piloto => ({
      id: piloto.id,
      nombre: piloto.nombre
    }));
    return pilots;
  } catch (error) {
    console.error("Error al obtener nombres:", error);
    return []; 
  }
}

export async function actualizarPilotos(id, pilotoData) {
  try {
    const response = await makeApiRequest({

      endPoint: `${ENDPOINT}/${id}`,
      method: "PUT",
      body: pilotoData,
    });
    return response;
  } catch (error) {
    console.error("Error al actualizar la pista:", error);
    throw error;
  }
}



// Eliminar una escudería
export async function deletePiloto(id) {
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




export async function obtenerPilotosSinEquipo() {
  const pilots = await getPilots()

  // Filtra los pilotos donde el campo 'team' sea null o undefined
  const pilotosSinEquipo = pilots.filter(piloto => piloto.equipo == null || piloto.equipo == "" || piloto.equipo == undefined );

  return pilotosSinEquipo;
}

export async function obtenerNuevoIdPiloto() {
  try {
    const pilotos = await getPilots();

    if (pilotos.length === 0) {
      return 1;
    }

    const maxId = Math.max(...pilotos.map(piloto => piloto.id));
    const result = maxId + 1;
    const utltimate = String(result);

    return utltimate ;
  } catch (error) {
    console.error("Error al obtener el nuevo ID para el piloto:", error);
    throw error;
  }
}
