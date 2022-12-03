import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'AuthProvider.js';

const PrivateRoute = ({ children }) => {
    const { Auth } = useContext(AuthContext);
    
    return !Auth ? <Navigate to="/login" /> : children;
}

export { PrivateRoute };