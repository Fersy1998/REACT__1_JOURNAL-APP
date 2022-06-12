import { login, logOut, startLogOut, startLoginEmailPassword } from "../../actions/auth";
import { types } from "../../types/types";
import '@testing-library/jest-dom';

import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';

jest.setTimeout(9000);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState={
    /*auth: {
        uid: 'j3sUsRiXSwZStTQ52OCGI3OokbK2',
        name: 'Xin'
      }
    ,
    notes:{
        id:'Bezkf2QMDcxB0xtbHowD',
        title:'Hola',
        body:'mundo'
    }*/
    }
let store=mockStore(initState);

describe('Pruebas en auth.js actions', ()=>{
    beforeEach(()=>{
        store=mockStore(initState);
    
    })
    test('Login and logout should create their respective actions', () => {
        const uid='12345';
        const displayName='Fersy';
        const actionLogin=login(uid, displayName);
        const actionLogout=logOut();
        
        expect(actionLogin).toEqual({
            type:types.login,
            payload:{
                uid:uid,
                displayname:displayName
            }
        })
        
        expect(actionLogout).toEqual({
            type:types.logout
        })

    })
    test('should startLogout', async() => { 
        await store.dispatch(startLogOut());
        const actions=store.getActions();
        //console.log(actions);
        expect(actions[0]).toEqual({ type: types.logout });
    })
    test('should start startLoginEmailPassword', async() => { 
        await store.dispatch(startLoginEmailPassword('fer@gmail.com', '12345678'));
        const actions=store.getActions();
        //console.log(actions);
        expect(actions[0]).toEqual({ type: types.uiStartLoading });
        expect(actions[1].type).toEqual('[auth] Login');
        expect(actions[2]).toEqual({ type: types.uiFinishLoading });
        expect(actions[1].payload.uid).toEqual('U0yIynIyuYZqKohq39apSxTrl6w1');
    })
})