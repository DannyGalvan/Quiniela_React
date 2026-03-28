import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedLogin = ({children}) => {
    const {authState} = useContext(AuthContext);
    if (authState.isLoggedIn) {
        return <Navigate to={`/`}/>
    }

    return children

}

export default ProtectedLogin;