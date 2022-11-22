import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { SERVERPATH } from '../config/configuracion';

const ProtectedRoute = ({children}) => {
    const {authState} = useContext(AuthContext);
    if (!authState.isLoggedIn) {
        return <Navigate to={`${SERVERPATH}/login`}/>
    }

    return children

}

export default ProtectedRoute