import { API, SERVERPATH } from "../config/configuracion";
import { getCookie } from "./localStorage";

const handleStatus = (status) => {
  if (status === 403) location.href = `${SERVERPATH}/unauthorized`;
  if (status === 401) { localStorage.clear(); location.href = `${SERVERPATH}/expired`; }
};

const apiFetch = async (url) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 || response.status === 400) return response.json();
    handleStatus(response.status);
  } catch (error) {
    console.log(error);
  }
};

/** GET /api/Usuario — usuarios del mismo país (punteo fase grupos) */
export const apiUsuarios = () => apiFetch(`${API}/Usuario`);

/** GET /api/Usuario/Pais/{id} — usuarios de un país específico */
export const apiCountryUsers = (idCountry) => apiFetch(`${API}/Usuario/Pais/${idCountry}`);
