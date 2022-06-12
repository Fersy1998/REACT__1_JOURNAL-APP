import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../hooks/useForm'
import validator from 'validator';
import {setError, removeError} from '../actions/ui';
import { startRegisterWithEmalPasswordName } from '../actions/auth';
export const RegisterScreen = () => {

  const [formValues, handleInputChange]=useForm({name:'Fersy', email:'fersy@yahoo.com', password:'123', password2:'123'});
  const dispatch=useDispatch();
  
  //const state=useSelector(state=>state.ui); extrae el estado de Redux del navegador
  const {msgError}=useSelector(state=>state.ui);
  const {name, email, password, password2}=formValues;
  
  
  const handleRegister=(e)=>{
    e.preventDefault();
    
    if(isFormValid()){
      dispatch(startRegisterWithEmalPasswordName(email, password, name));
      //console.log(formValues);
    }
  
  }
  const isFormValid=()=>{
    if(name.trim().length===0){
      dispatch(setError('name is required'));
      return false;
    }else if(!validator.isEmail(email)){
      dispatch(setError('Invalid email'));
      return false;
    }else if(password!==password2 || password.length<6 ){
      dispatch(setError('password should have at least 6 characters and match'));
      return false
    }
    dispatch(removeError());
    return true
  
  }
  return (
    
    <div className='animate__animated animate__headShake'>
        <h3 className='auth__title' >
            Register
        </h3>
        <form onSubmit={handleRegister}>
            {
            msgError &&
            (<div className='auth__alert-error'>{msgError}</div>)
            }
            <input type='text' placeholder='name' name='name' className='auth__input'value={name} onChange={handleInputChange}/>
            <input type='text' placeholder='email' name='email' className='auth__input'value={email} onChange={handleInputChange}/>
            <input type='password' placeholder='password' name='password' className='auth__input' value={password} onChange={handleInputChange}/>
            <input type='password' placeholder='confirm password' name='password2' className='auth__input' value={password2} onChange={handleInputChange}/>
            <button type='submit' className='btn btn-primary btn-block'>Login</button><hr />
            <Link to='auth/login' className='link'>
                Already register?
            </Link>
        </form>
        
    </div>
 
  )
}
