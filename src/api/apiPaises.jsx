import apiClient from '../config/axiosConfig';

/** GET /api/Paises — catálogo de países */
export const apiPaises = async () => {
  try {
    const response = await apiClient.get('/Paises');
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 400) {
      return error.response.data;
    }
    console.log('apiPaises error:', error);
    throw error;
  }
};
