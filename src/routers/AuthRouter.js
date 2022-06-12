import React from 'react'
import { Navigate, Routes, Route, Link} from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'

export const AuthRouter = () => {
  return (
    <div className="auth__main ">
    <div className="auth__box-container ">
   
     <Routes>
          <Route path="/auth/login" element={<LoginScreen />} />
           
    
          <Route path="/auth/register" element={<RegisterScreen />} />
            
        
         <Route exact path='/auth/*' element={<Navigate to="/auth/login"/>}/>
    
    </Routes>
    
    </div>
    </div>
  
  )
}

    
