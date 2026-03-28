import { API, SERVERPATH } from "../config/configuracion";
import { getCookie } from "./localStorage";

// ── Helper compartido ────────────────────────────────────────────────────────
const handleStatus = (status) => {
  if (status === 403) location.href = `${SERVERPATH}/unauthorized`;
  if (status === 401) { localStorage.clear(); location.href = `${SERVERPATH}/expired`; }
};

const apiFetch = async (url, options = {}) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (response.status === 200 || response.status === 400) return response.json();
    handleStatus(response.status);
  } catch (error) {
    console.log(error);
  }
};

// ── Partidos de grupos ───────────────────────────────────────────────────────

/** GET /api/Partidos — todos los partidos de grupos (resultado oficial) */
export const apiPartidos = () =>
  apiFetch(`${API}/Partidos`);

/** GET /api/Partidos/{id} — predicciones del usuario */
export const apiPartidosUser = (idUser) =>
  apiFetch(`${API}/Partidos/${idUser}`);

/** GET /api/Partidos/Todos — todos los partidos + predicción del usuario autenticado */
export const apiTodosUser = () =>
  apiFetch(`${API}/Partidos/Todos`);

/** GET /api/Partidos/Comparacion/{id} — comparación predicciones vs resultado oficial */
export const apiComparationsUser = (idUser) =>
  apiFetch(`${API}/Partidos/Comparacion/${idUser}`);

/** POST /api/Partidos — guardar/actualizar predicción de usuario */
export const apiPostPartidos = (data) =>
  apiFetch(`${API}/Partidos`, { method: "POST", body: JSON.stringify(data) });

/** PUT /api/Partidos — ingresar resultado oficial (admin) */
export const apiPutPartidos = (data) =>
  apiFetch(`${API}/Partidos`, { method: "PUT", body: JSON.stringify(data) });

/** POST /api/Partidos/Calculo — calcular puntajes de un partido */
export const apiPostCalculo = (id) =>
  apiFetch(`${API}/Partidos/Calculo`, {
    method: "POST",
    body: JSON.stringify({ idPartido: id }),
  });

/** GET /api/Partidos/Equipos — catálogo de equipos */
export const apiEquipos = () =>
  apiFetch(`${API}/Partidos/Equipos`);

/** POST /api/Partidos/Nuevo — crear partido de grupos (admin) */
export const apiNuevoPartido = (data) =>
  apiFetch(`${API}/Partidos/Nuevo`, { method: "POST", body: JSON.stringify(data) });

// ── Finales / fases eliminatorias ────────────────────────────────────────────

/** GET /api/Finales — todos los partidos eliminatorios */
export const apiFinales = () =>
  apiFetch(`${API}/Finales`);

/** GET /api/Finales/{id} — predicciones del usuario para finales */
export const apiFinalesUser = (idUser) =>
  apiFetch(`${API}/Finales/${idUser}`);

/** GET /api/Finales/Todos — todos los finales + predicción del usuario autenticado */
export const apiTodosFinalesUser = () =>
  apiFetch(`${API}/Finales/Todos`);

/** GET /api/Finales/Comparacion/{id} — comparación finales */
export const apiComparationsFinalesUser = (idUser) =>
  apiFetch(`${API}/Finales/Comparacion/${idUser}`);

/** POST /api/Finales — guardar/actualizar predicción de final */
export const apiPostFinales = (data) =>
  apiFetch(`${API}/Finales`, { method: "POST", body: JSON.stringify(data) });

/** PUT /api/Finales — ingresar resultado oficial de final (admin) */
export const apiPutFinales = (data) =>
  apiFetch(`${API}/Finales`, { method: "PUT", body: JSON.stringify(data) });

/** POST /api/Finales/Calculo — calcular puntajes de un final */
export const apiPostCalculoFinal = (id) =>
  apiFetch(`${API}/Finales/Calculo`, {
    method: "POST",
    body: JSON.stringify({ idPartido: id }),
  });

/** POST /api/Finales/Nuevo — crear partido final (admin) */
export const apiNuevoFinal = (data) =>
  apiFetch(`${API}/Finales/Nuevo`, { method: "POST", body: JSON.stringify(data) });
