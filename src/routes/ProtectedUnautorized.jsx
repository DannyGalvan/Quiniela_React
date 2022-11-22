import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { SERVERPATH } from '../config/configuracion';

const ProtectedUnautorized = ({children}) => {
    const {authState} = useContext(AuthContext);
    if (!authState.isLoggedIn) {
        return <Navigate to={`${SERVERPATH}/login`}/>
    }
    
    if (!authState.isAdmin) {        
        return <Navigate to={`${SERVERPATH}/unauthorized`}/>
    }

    return children
}

export default ProtectedUnautorized
