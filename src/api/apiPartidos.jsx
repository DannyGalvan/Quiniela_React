import apiClient from '../config/axiosConfig';

// ── Partidos de grupos ───────────────────────────────────────────────────────

/** GET /api/Partidos — todos los partidos de grupos (resultado oficial) */
export const apiPartidos = () =>
  apiClient.get('/Partidos').then(response => response.data).catch(error => {
    console.log('apiPartidos error:', error);
    throw error;
  });

/** GET /api/Partidos/{id} — predicciones del usuario */
export const apiPartidosUser = (idUser) =>
  apiClient.get(`/Partidos/${idUser}`).then(response => response.data).catch(error => {
    console.log('apiPartidosUser error:', error);
    throw error;
  });

/** GET /api/Partidos/Todos — todos los partidos + predicción del usuario autenticado */
export const apiTodosUser = () =>
  apiClient.get('/Partidos/Todos').then(response => response.data).catch(error => {
    console.log('apiTodosUser error:', error);
    throw error;
  });

/** GET /api/Partidos/Comparacion/{id} — comparación predicciones vs resultado oficial */
export const apiComparationsUser = (idUser) =>
  apiClient.get(`/Partidos/Comparacion/${idUser}`).then(response => response.data).catch(error => {
    console.log('apiComparationsUser error:', error);
    throw error;
  });

/** POST /api/Partidos — guardar/actualizar predicción de usuario */
export const apiPostPartidos = (data) =>
  apiClient.post('/Partidos', data).then(response => response.data).catch(error => {
    console.log('apiPostPartidos error:', error);
    throw error;
  });

/** PUT /api/Partidos — ingresar resultado oficial (admin) */
export const apiPutPartidos = (data) =>
  apiClient.put('/Partidos', data).then(response => response.data).catch(error => {
    console.log('apiPutPartidos error:', error);
    throw error;
  });

/** POST /api/Partidos/Calculo — calcular puntajes de un partido */
export const apiPostCalculo = (id) =>
  apiClient.post('/Partidos/Calculo', { idPartido: id }).then(response => response.data).catch(error => {
    console.log('apiPostCalculo error:', error);
    throw error;
  });

/** GET /api/Partidos/Equipos — catálogo de equipos */
export const apiEquipos = () =>
  apiClient.get('/Partidos/Equipos').then(response => response.data).catch(error => {
    console.log('apiEquipos error:', error);
    throw error;
  });

/** POST /api/Partidos/Nuevo — crear partido de grupos (admin) */
export const apiNuevoPartido = (data) =>
  apiClient.post('/Partidos/Nuevo', data).then(response => response.data).catch(error => {
    console.log('apiNuevoPartido error:', error);
    throw error;
  });

// ── Finales / fases eliminatorias ────────────────────────────────────────────

/** GET /api/Finales — todos los partidos eliminatorios */
export const apiFinales = () =>
  apiClient.get('/Finales').then(response => response.data).catch(error => {
    console.log('apiFinales error:', error);
    throw error;
  });

/** GET /api/Finales/{id} — predicciones del usuario para finales */
export const apiFinalesUser = (idUser) =>
  apiClient.get(`/Finales/${idUser}`).then(response => response.data).catch(error => {
    console.log('apiFinalesUser error:', error);
    throw error;
  });

/** GET /api/Finales/Todos — todos los finales + predicción del usuario autenticado */
export const apiTodosFinalesUser = () =>
  apiClient.get('/Finales/Todos').then(response => response.data).catch(error => {
    console.log('apiTodosFinalesUser error:', error);
    throw error;
  });

/** GET /api/Finales/Comparacion/{id} — comparación finales */
export const apiComparationsFinalesUser = (idUser) =>
  apiClient.get(`/Finales/Comparacion/${idUser}`).then(response => response.data).catch(error => {
    console.log('apiComparationsFinalesUser error:', error);
    throw error;
  });

/** POST /api/Finales — guardar/actualizar predicción de final */
export const apiPostFinales = (data) =>
  apiClient.post('/Finales', data).then(response => response.data).catch(error => {
    console.log('apiPostFinales error:', error);
    throw error;
  });

/** PUT /api/Finales — ingresar resultado oficial de final (admin) */
export const apiPutFinales = (data) =>
  apiClient.put('/Finales', data).then(response => response.data).catch(error => {
    console.log('apiPutFinales error:', error);
    throw error;
  });

/** POST /api/Finales/Calculo — calcular puntajes de un final */
export const apiPostCalculoFinal = (id) =>
  apiClient.post('/Finales/Calculo', { idPartido: id }).then(response => response.data).catch(error => {
    console.log('apiPostCalculoFinal error:', error);
    throw error;
  });

/** POST /api/Finales/Nuevo — crear partido final (admin) */
export const apiNuevoFinal = (data) =>
  apiClient.post('/Finales/Nuevo', data).then(response => response.data).catch(error => {
    console.log('apiNuevoFinal error:', error);
    throw error;
  });
