import React from 'react';

import { mount } from "enzyme";
import { LoginScreen } from "../../../auth/LoginScreen";

import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";


jest.mock("../../../actions/auth", ()=>({ 
    startGoogleLogin: jest.fn() ,
    startLoginEmailPassword:jest.fn(),
    
}))
jest.setTimeout(9000);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={
    auth: {},
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
//Mmemory router finge la rutas
const wrapper=mount(
    <Provider store={store}>
        <MemoryRouter >
            <LoginScreen />
        </MemoryRouter>
    </Provider> );


describe('Pruebas en LoginScreen.js', ()=>{
    beforeEach(()=>{
        store=mockStore(initState);
        jest.clearAllMocks();
    })
    
    test('should mathc the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    
    })
    test('should dispatch the action with the google btn to login', () => { 
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    })
    test('should startLogin with the respective arguments (default)', () => {
        const formValues= {
            email:'fersy@gmail.com',
            password:'1hwdhid'
        }
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        expect(startLoginEmailPassword).toHaveBeenCalledWith(formValues.email, formValues.password);
       
    
    })
})