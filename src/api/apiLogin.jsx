import { API, SERVERPATH } from "../config/configuracion";

const handleStatus = (status) => {
  if (status === 403) location.href = `${SERVERPATH}/unauthorized`;
  if (status === 401) { localStorage.clear(); location.href = `${SERVERPATH}/expired`; }
};

export const apiLogin = async (formData) => {
  try {
    const response = await fetch(`${API}/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.status === 200 || response.status === 400) return response.json();
    handleStatus(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const apiNewUser = async (formData) => {
  try {
    const response = await fetch(`${API}/Login/NewUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.status === 200 || response.status === 400) return response.json();
    handleStatus(response.status);
  } catch (error) {
    console.log(error);
  }
};
