import apiClient from '../config/axiosConfig';

/** POST /api/Login — login de usuario */
export const apiLogin = async (formData) => {
  try {
    const response = await apiClient.post('/Login', formData);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 400) {
      return error.response.data;
    }
    console.log('apiLogin error:', error);
    throw error;
  }
};

/** POST /api/Login/NewUser — crear nuevo usuario */
export const apiNewUser = async (formData) => {
  try {
    const response = await apiClient.post('/Login/NewUser', formData);
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 400) {
      return error.response.data;
    }
    console.log('apiNewUser error:', error);
    throw error;
  }
};
