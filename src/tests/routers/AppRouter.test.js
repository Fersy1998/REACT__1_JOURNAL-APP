import React from 'react';

import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';

import {firebase} from '../../firebase/firebase-config';

jest.mock("../../actions/auth", ()=>({ 
    login: jest.fn() 
    
}))
jest.setTimeout(9000);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={
    auth: {
        uid: 'JgkjFCpl1wfUfsBSXuPi70oUM3t',
        name: 'Zin'
    },
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      notes: [],
      active: null
    }
  }
let store=mockStore(initState);

store.dispatch=jest.fn()


describe('Pruebas en AppRouter.js',()=>{
    test('should first', async() => { 
       
        await act(async ()=>{
            let user;
            const userCred= await firebase.auth().signInWithEmailAndPassword('zin@gmail.com', 'ABC.123a');
            user=userCred.user;
            const wrapper=mount(
                <Provider store={store}>
                        <AppRouter />
                </Provider> );
        
        })
        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith('JgkjFCpl1wfUfsBSXuPi70oUM3t2', null)
      
    
    })
})
//Mmemory router finge la rutas

