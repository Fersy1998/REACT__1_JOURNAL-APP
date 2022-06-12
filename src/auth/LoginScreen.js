import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../hooks/useForm'
import {setError, removeError} from '../actions/ui';
import { startGoogleLogin, startLoginEmailPassword } from '../actions/auth'
import validator from 'validator';
export const LoginScreen = () => {
    
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {msgError, loading}=useSelector(state=>state.ui);
    const user=useSelector(state=>state.auth)
    
    const [formValues, handleInputChange]=useForm({
        email:'fersy@gmail.com',
        password:'1hwdhid'
    })
    const [userActive, setActiveUser] = useState(user);
    useEffect(() => {
        if(user?.uid){
            setActiveUser(true);
            navigate('/auth/journal', {
                replace:true
              }) ;
          }else{
            setActiveUser(false);
          }
    }, [setActiveUser])
    

    
    
    const {email, password}=formValues;
    const handleLogin=(e)=>{
        e.preventDefault();
        //dispatch(login(892183127, 'Fersy'));
        if (isFormValid()){
            dispatch(startLoginEmailPassword(email, password));
            navigate('/', {
                replace:true
              }) ;
        }
    }
    const handleGoogleLogin=()=>{
        if(isFormValid()){
            dispatch(startGoogleLogin());
            
        }
        
    }
    const isFormValid=()=>{
        if(!validator.isEmail(email)){
          dispatch(setError('Invalid email'));
          return false;
        }else if(password.length<6 ){
          dispatch(setError('password should have at least 6 characters and match'));
          return false
        }
        dispatch(removeError());
        return true
      
      }
  return (

    <div className='animate__animated animate__headShake'>
        <h3 className='auth__title'>
            Login
        </h3>
        <form onSubmit={handleLogin}>
            {
            msgError &&
            (<div className='auth__alert-error'>{msgError}</div>)
            }
            <input type='text' placeholder='email' onChange= {handleInputChange} name='email' className='auth__input' value={email}/>
            <input type='password' placeholder='password' onChange= {handleInputChange} name='password' className='auth__input' value={password}/>
            <button type='submit' className='btn btn-primary btn-block' disabled={loading}>Login</button><hr />
            <div className='auth__social-network'>
                <p>Login with social Network</p>
                <div className="google-btn" onClick={handleGoogleLogin}>
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>
            <Link to='/auth/register' className='link'>
                Create New Acount
            </Link>
        </form>
        
    </div>

  )
}
