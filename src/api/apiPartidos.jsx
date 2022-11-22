import { API } from "../config/configuracion";
import { getCookie } from "./localStorage";

export const apiPartidos = async () => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiPartidosUser = async (idUser) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos/${idUser}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiPostPartidos = async (data) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiPutPartidos = async (data) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiComparationsUser = async (idUser) => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos/Comparacion/${idUser}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const apiTodosUser = async () => {
  const token = await getCookie("sesion");
  try {
    const response = await fetch(`${API}/Partidos/Todos`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const apiPostCalculo = async (id) => {
  const token = await getCookie("sesion");
  const data = {
    idPartido: id,
  };
  try {
    const response = await fetch(`${API}/Partidos/Calculo`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200 || response.status == 400) {
      const data = await response.json();
      return data;
    } else if (response.status == 403) {
      location.href = "#/unauthorized";
    } else if (response.status == 401) {
      localStorage.clear();
      location.href = "#/expired";
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
