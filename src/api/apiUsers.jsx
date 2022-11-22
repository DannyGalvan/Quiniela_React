import { API } from "../config/configuracion";
import { getCookie } from "./localStorage";

export const apiUsuarios = async () =>{    
    const token = await getCookie('sesion');
    try {
        const response = await fetch(`${API}/Usuario`,{
        'method': 'GET',
        'headers': 
        {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status == 200 || response.status == 400) {
        const data = await response.json();
        return data;
    }else if (response.status == 403) {
        location.href = '#/unauthorized';
    }else if (response.status == 401){
        localStorage.clear();
        location.href = '#/expired'
    }else{
        const data = await response.json();
        return data;
    }
    
    } catch (error) {
        console.log(error);
    }
}

export const apiCountryUsers = async (idCountry) =>{    
    const token = await getCookie('sesion');
    try {
        const response = await fetch(`${API}/Usuario/Pais/${idCountry}`,{
        'method': 'GET',
        'headers': 
        {
          'content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
    });

    if (response.status == 200 || response.status == 400) {
        const data = await response.json();
        return data;
    }else if (response.status == 403) {
        location.href = '#/unauthorized';
    }else if (response.status == 401){
        localStorage.clear();
        location.href = '#/expired'
    }else{
        const data = await response.json();
        return data;
    }
    
    } catch (error) {
        console.log(error);
    }
}