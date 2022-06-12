import React from 'react';
import '@testing-library/jest-dom';


import { mount } from "enzyme";
import { RegisterScreen } from "../../../auth/RegisterScreen";

import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";


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
      msgError: 'Invalid email'
    },
    notes: {
      notes: [],
      active: null
    }
  }
let store=mockStore(initState);

//store.dispatch=jest.fn()
//Mmemory router finge la rutas
const wrapper=mount(
    <Provider store={store}>
        <MemoryRouter >
            <RegisterScreen />
        </MemoryRouter>
    </Provider> );

describe('Pruebas en registerScreen.js', ()=>{
    beforeEach(()=>{
        store=mockStore(initState);
        jest.clearAllMocks();
    })
    test('should match the snapshot', () => { 
        expect(wrapper).toMatchSnapshot();
    })
    test('should do the respective action', () => {
        const emailField=wrapper.find('input[name="email"]');
        const nameField=wrapper.find('input[name="email"]');
        nameField.simulate('change', {
            target:{
                value:'Fersy',
                name:'name'
            }
        })
        console.log(emailField);
        emailField.simulate('change', {
            target:{
                value:'',
                name:'email'
            }
        })
        wrapper.find('form').prop('onSubmit')({preventDefault(){}});
        const actions=store.getActions();
        console.log(actions);
        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
        
        expect(wrapper.find('.auth__alert-error').text().trim()).toBe('Invalid email');
    })
    

})