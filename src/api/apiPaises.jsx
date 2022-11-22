import { API } from "../config/configuracion";

export const apiPaises = async () =>{   
    try {
        const response = await fetch(`${API}/Paises`,{
        'method': 'GET',
        'headers': 
        {
          'content-Type': 'application/json',
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

