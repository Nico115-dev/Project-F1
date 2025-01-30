const API_URL = "http://localhost:4000/pilotos";

export const obtenerPilotos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const agregarPiloto = async (piloto) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(piloto),
  });
  return await res.json();
};

export const eliminarPiloto = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
