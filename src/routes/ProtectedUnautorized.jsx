import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedUnautorized = ({children}) => {
    const {authState} = useContext(AuthContext);
    if (!authState.isLoggedIn) {
        return <Navigate to={`/login`}/>
    }
    
    if (!authState.isAdmin) {        
        return <Navigate to={`/unauthorized`}/>
    }

    return children
}

export default ProtectedUnautorized
