import { API } from "../config/configuracion";

export const apiLogin = async (formData) =>{    
    try {
        const response = await fetch(`${API}/Login`,{
        'method': 'POST',
        'headers': 
        {
          'content-Type': 'application/json',
        },
        'body' : JSON.stringify(formData), 
    })
    
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

export const apiNewUser = async (formData) =>{    
    try {
        const response = await fetch(`${API}/Login/NewUser`,{
        'method': 'POST',
        'headers': 
        {
          'content-Type': 'application/json',
        },
        'body' : JSON.stringify(formData), 
    })
    
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
