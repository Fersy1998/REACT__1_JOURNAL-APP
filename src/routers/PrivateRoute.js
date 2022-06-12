import React, { useSelector } from 'react'
import {Navigate } from 'react-router-dom';



//Children son los componentes que envuelve PrivateRoute en AppRoutes
export const PrivateRoute = ({isAuthenticated, children}) => {
    
 
  return isAuthenticated ? children : <Navigate to="/auth/login" />;      
}
