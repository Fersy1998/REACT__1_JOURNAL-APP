import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter} from "react-router-dom";
import { firebase } from '../firebase/firebase-config'
import { JournalScreen } from '../journal/JournalScreen'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
export const AppRouter = () => {
  const dispatch=useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  useEffect(() => {
  
    firebase.auth().onAuthStateChanged((user)=>{
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid))
       
       
      }else{
        setIsLoggedIn(false);
      }
      setChecking(false);
    })
  }, [dispatch, setChecking, setIsLoggedIn]);
  
  
//  <AuthRouter />
/*
<Switch>
                    <Route path='/' componen={ AuthRouter } />
               </Switch>


*/
  if(checking){
    return (<h1>Espere...</h1>)
  
  }else{
    return (
     
      <BrowserRouter>   
            
            <Routes>
                {//<Route path="/auth" element={<AuthRouter />} />
                }
                
                <Route path="/" element={
                  <PrivateRoute isAuthenticated={isLoggedIn}>
                    <JournalScreen />
                  </PrivateRoute>
                }/>
                <Route path="/*" element={
                  <PublicRoute isAuthenticated={isLoggedIn}>
                    <AuthRouter />
                  </PublicRoute>
                }/>
            </Routes>

    </BrowserRouter>
   
       )
      }
}
      
       { /*
        //<AuthRouter />
        
         <Switch>
                <Route path='/auth' component={AuthRouter} />
                <Route path='/' component={JournalScreen} >
                //<Route to="auth/journal" component={JournalScreen}/>
        </Switch><*/
      }
 
 
