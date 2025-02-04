const BASE_URL = "http://localhost:4000";

export async function makeApiRequest({
  endPoint,
  method = "GET",
  body = null,
  headers = {},
}) {
  const url = `${BASE_URL}/${endPoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la peticion del API", error);
    throw error;
  }
}
  