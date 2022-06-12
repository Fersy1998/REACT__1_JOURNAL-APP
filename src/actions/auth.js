import { types } from "../types/types"
import Swal from 'sweetalert2'
import React from 'react';

import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { finishLoading, startLoading } from "./ui";
import { Navigate, useNavigate } from "react-router-dom";
import { noteLogout } from "./notes";


export const startLoginEmailPassword=(email, password)=>{
    
    return (dispatch)=>{
        dispatch(startLoading());
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async ({user})=>{
            //console.log(res);
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch((e)=>{
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error')
        })
       
    }
/*
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(login(email, password));
        
        }, 3500)
    }*/
}

export const startRegisterWithEmalPasswordName=(email, password, name)=>{
    return (dispatch)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async ({user})=>{   
            //console.log(user);
            await user.updateProfile({displayName:name});
            dispatch(login(user.uid, user.displayName));
        
    }).catch((e)=>{
        //dispatch(finishLoading());
        Swal.fire('Error', e.message, 'error')
    })
    }
}
export const startGoogleLogin=()=>{
    return (dispatch)=>{
        firebase.auth().signInWithPopup(googleAuthProvider.setCustomParameters({prompt: "select_account"}))
        /*.then(userCred=>{
            console.log(userCred);
        })*/
      .then(({user})=>{   
            console.log(user);
            dispatch(login(user.uid, user.displayName));
        }
        )
    }
}

export const login=(uid, displayname)=>{
    
    
    return {
        type:types.login,
        payload:{
            uid,
            displayname
        }
    }
}

export const startLogOut=()=>{
    return async (dispatch)=>{
        await firebase.auth().signOut()
        dispatch(logOut());
        dispatch(noteLogout());
    }

}
export const logOut=()=>{
    return {
        type:types.logout
    } 
}
