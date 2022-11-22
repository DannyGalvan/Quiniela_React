export const getStogare = (key) => {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    try {
      const data = localStorage.getItem(key);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const addStogare = (name, data) => {
  try {
    const info = JSON.stringify(data);
    localStorage.setItem(name, info);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const addCookie = (name, value) => {
  try {
    window.cookieStore
      ? cookieStore.set(name, value)
      : sessionStorage.setItem(name, value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCookie = async (name) => {
  try {
    const response = Window.cookieStore
      ? await cookieStore.get(name)
      : sessionStorage.getItem(name);
    const cookie = response.value ?? response;
    return JSON.parse(cookie);
  } catch (error) {
    try {
      const response = Window.cookieStore
        ? await cookieStore.get(name)
        : sessionStorage.getItem(name);
      const cookie = response.value ?? response;
      return cookie;
    } catch (error) {
      const response = getStogare("auth") || null;
      if (response[name] != null) {
        try {
          addCookie(name, JSON.stringify(response[name]));
          const cookie = response[name];
          return JSON.parse(cookie);
        } catch (error) {
          addCookie(name, response[name]);
          const cookie = response[name];
          return cookie;
        }
      } else {
        console.log("sin respuesta");
        return false;
      }
    }
  }
};

export const removeCookie = (name) => {
  try {
    window.cookieStore
      ? cookieStore.delete(name)
      : sessionStorage.removeItem(name);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeAllCookies = () => {
  try {
    removeCookie("auth");
    removeCookie("sesion");
    removeCookie("user");
    removeCookie("enterprise");
    removeCookie("isAdmin");
  } catch (error) {
    console.log(error);
  }
};

export const configStorage = (newState) => {
  try {
    const correo = newState.emal;
    const empresa = newState.enterprise
      ? JSON.stringify(newState.enterprise)
      : undefined;
    const stateEncript = {
      isLoggedIn: newState.isLoggedIn,
      email: newState.email,
      sesion: newState.sesion,
      user: newState.user,
      enterprise: empresa,
      isAdmin: newState.isAdmin,
      pais: newState.pais,
      isEncrypt: correo == newState.email ? false : true,
      rfc: true,
    };
    addStogare("auth", stateEncript);
    localStorage.setItem("@rafc", newState.isAdmin);
    addCookie("auth", JSON.stringify(stateEncript));
    addCookie("sesion", stateEncript.sesion);
    addCookie("user", stateEncript.user);
    addCookie("isAdmin", stateEncript.isAdmin);
    return stateEncript;
  } catch (error) {
    console.log("no se encripto", error);
  }
};
