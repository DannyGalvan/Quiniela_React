import apiClient from '../config/axiosConfig';

/** GET /api/Usuario — usuarios del mismo país (punteo fase grupos) */
export const apiUsuarios = () =>
  apiClient.get('/Usuario').then(response => response.data).catch(error => {
    console.log('apiUsuarios error:', error);
    throw error;
  });

/** GET /api/Usuario/Final — usuarios del mismo país (punteo eliminatorias) */
export const apiUsuariosFinales = () =>
  apiClient.get('/Usuario/Final').then(response => response.data).catch(error => {
    console.log('apiUsuariosFinales error:', error);
    throw error;
  });

/** GET /api/Usuario/Pais/{id} — usuarios de un país específico (fase grupos) */
export const apiCountryUsers = (idCountry) =>
  apiClient.get(`/Usuario/Pais/${idCountry}`).then(response => response.data).catch(error => {
    console.log('apiCountryUsers error:', error);
    throw error;
  });

/** GET /api/Usuario/Final/Pais/{id} — usuarios de un país específico (eliminatorias) */
export const apiCountryUsersFinales = (idCountry) =>
  apiClient.get(`/Usuario/Final/Pais/${idCountry}`).then(response => response.data).catch(error => {
    console.log('apiCountryUsersFinales error:', error);
    throw error;
  });
