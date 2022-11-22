import { removeAllCookies, configStorage} from "../api/localStorage";

// generaEstado
export const authReducer = ( state,  action ) => {
    let newState;
    switch ( action.type ) {
        case 'signIn':
            newState = {
                ...state,
                isLoggedIn: true,
                name: action.login.nombre,
                user: action.login.idUsuario,
                sesion: action.login.token,
                isAdmin: action.login.isAdmin,
                pais: action.login.pais,
                isEncrypt: false,
            };
            configStorage(newState);
            return newState
        case 'logout':
            newState = {
                ...state,
                isLoggedIn: false,
                email: undefined,
                user: undefined,
                sesion: 'Logout',
                isAdmin: false,
                pais: undefined,
                isEncrypt: false,
            };
            localStorage.clear();
            removeAllCookies();
            return newState;    
        case 'changeUsername':
            return {
                ...state,
                username: action.payload
            }
        default:
            return state;
    }

}