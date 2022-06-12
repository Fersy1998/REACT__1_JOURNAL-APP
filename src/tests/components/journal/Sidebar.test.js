import React from 'react';
import { Sidebar } from '../../../journal/Sidebar';
import '@testing-library/jest-dom';
import { mount } from "enzyme";

import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import {startNewNote, noteLogout } from '../../../actions/notes'

import {startLogOut } from '../../../actions/auth'
jest.mock("../../../actions/auth", ()=>({ 
    startLogOut : jest.fn() ,
    noteLogout : jest.fn() ,
}))
jest.mock("../../../actions/notes", ()=>({ 
    startNewNote : jest.fn() ,
}))
jest.setTimeout(9000);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initState={
    
        auth: {
          uid: 'tALkf4F0iidLjZAPc2suS9w2gzB3',
          name: 'Fersy'
        },
        ui: {
          loading: false,
          msgError: null
        },
        notes: {
          notes: [
            {
              id: 'wiE5xqElkfE0kJ1dA5kT',
              title: '',
              body: '',
              date: 1654747267844,
              url: 'https://res.cloudinary.com/dyyfc2gux/image/upload/v1654747279/original_-_2021-11-07T194242.528_yvsszx.jpg'
            }
          ],
          active: {
            id: 'wiE5xqElkfE0kJ1dA5kT',
            title: '',
            body: '',
            date: 1654747267844,
            url: 'https://res.cloudinary.com/dyyfc2gux/image/upload/v1654747279/original_-_2021-11-07T194242.528_yvsszx.jpg'
          }
        }
      
  }
  
let store=mockStore(initState);

store.dispatch=jest.fn()
  const wrapper=mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider> );


describe('Pruebas en el SideBar', ()=>{
    
    beforeEach(()=>{
        store=mockStore(initState);
        jest.clearAllMocks();
        
    })
    
    test('should mathc the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    
    })
    test('should startLogOut', () => { 
        wrapper.find('button').simulate('click');
        expect(startLogOut).toHaveBeenCalled();
    
    })
    test('should startNewNote', () => { 
        wrapper.find('.journal__new-entry').simulate('click');
        expect(startNewNote).toHaveBeenCalled();
    
    })
})