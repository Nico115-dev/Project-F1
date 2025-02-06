export async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al cargar los datos");
      return await response.json();
    } catch (error) {
      console.error("Error en fetchData:", error);
      return {};
    }
  }
  
  export async function getPilots() {
    const data = await fetchData("http://localhost:4000/pilotos");
    // Retorna directamente el array si la respuesta es un array; de lo contrario, extrae la propiedad "pilotos"
    return Array.isArray(data) ? data : (data.pilotos || []);
  }
  
  export async function getTracks() {
    const data = await fetchData("http://localhost:4000/circuitos");
    // Retorna directamente el array o la propiedad "circuitos"
    return Array.isArray(data) ? data : (data.circuitos || []);
  }
  
  export async function getVehicles() {
    const data = await fetchData("http://localhost:4000/vehiculos");
    // Retorna directamente el array o la propiedad "vehiculos"
    return Array.isArray(data) ? data : (data.vehiculos || []);
  }
  
  export async function getTeams() {
    const data = await fetchData("http://localhost:4000/equipos");
    // Retorna directamente el array o la propiedad "equipos" (asegúrate de que tu API devuelva la propiedad "nombre" en cada equipo)
    return Array.isArray(data) ? data : (data.equipos || []);
  }