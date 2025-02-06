import { makeApiRequest } from "../../src/utils/iService.js"; // Asegúrate de que la ruta sea correcta

const ENDPOINT = "pilotos";

// Obtener todos los pilotos
export async function getPilots() {
  return await makeApiRequest({ endPoint: ENDPOINT });
}

// Obtener un piloto por ID
export async function getPilotById(id) {
  return await makeApiRequest({ endPoint: `${ENDPOINT}/${id}` });
}

// Guardar o actualizar un piloto
export async function savePilot(pilot) {
  // Verificamos si el ID ya existe en la base de datos
  const existingPilot = await getPilotById(pilot.id).catch(() => null);
  
  const method = existingPilot ? "PUT" : "POST";
  const endPoint = existingPilot ? `${ENDPOINT}/${pilot.id}` : ENDPOINT;

  return await makeApiRequest({ endPoint, method, body: pilot });
}

// Eliminar un piloto
export async function deletePilot(id) {
  return await makeApiRequest({ endPoint: `${ENDPOINT}/${id}`, method: "DELETE" });
}


export async function obtenerPilotosSinEquipo() {
  const pilots = await getPilots()

  // Filtra los pilotos donde el campo 'team' sea null o undefined
  const pilotosSinEquipo = pilots.filter(piloto => piloto.equipo == null || piloto.equipo == "" || piloto.equipo == undefined );
  return pilotosSinEquipo;
}