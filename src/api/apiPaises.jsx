import { API, SERVERPATH } from "../config/configuracion";

const handleStatus = (status) => {
  if (status === 403) location.href = `${SERVERPATH}/unauthorized`;
  if (status === 401) { localStorage.clear(); location.href = `${SERVERPATH}/expired`; }
};

/** GET /api/Paises — catálogo de países */
export const apiPaises = async () => {
  try {
    const response = await fetch(`${API}/Paises`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200 || response.status === 400) return response.json();
    handleStatus(response.status);
  } catch (error) {
    console.log(error);
  }
};
