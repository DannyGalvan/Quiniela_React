import React, { createContext, useReducer} from 'react';
import { authReducer } from './authReducer'
import { getStogare} from '../api/localStorage';

// Estado inicial
export const authInitialState = {
    isLoggedIn: false,
    name: undefined,
    sesion: undefined,
    user: undefined,
    isAdmin: false,
    pais: undefined,
    isEncrypt: false,
}

// Lo usaremos para decirle a React cómo luce y qué expone el context
export const AuthContextProps = {
    authState: authInitialState,
    signIn: () => {},
    logout: () => {},
    changeEnterprice: (enterprice) => {},
    changeUsername: (username) => {},
}


// Crear el contexto
export const AuthContext = createContext(AuthContextProps);

// Componente proveedor del estado
export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer( authReducer, getStogare('auth') || authInitialState );

    const signIn = (login) => {  
        dispatch({ type: 'signIn', login: login });   
    }

    const logout = () => {
        dispatch({ type: 'logout' });
    }

    const changeUsername = ( username ) => {
        dispatch({ type: 'changeUsername', payload: username })
    }

    return (
        <AuthContext.Provider value={{
            authState,
            signIn,
            logout,
            changeUsername,
        }}>
            { children }
        </AuthContext.Provider>
    )

}