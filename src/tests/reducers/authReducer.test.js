import {authReducer} from '../../reducers/authReducer';
import {types} from '../../types/types'

describe('Pruebas en authReducer', ()=>{
//Funcionaba antes de trabajar en notes.test.js
    test('should do the login', () => { 
        const initState={
        
        }
        const action={
            type:types.login,
            payload:{
                uid:'123',
                displayname:'Fersy'
            
            }
        }
        const state=authReducer(initState, action);
        expect(state).toEqual({
            uid:'123',
            name:'Fersy'
        
        })
    })
    test('should do the logout', () => { 
        const initState={
            uid:'123',
            name:'Fersy'
        
        }
        const action={
            type:types.logout
        }
        const state=authReducer(initState, action);
        expect(state).toEqual({});
    })
    test('shouldnt execute any action', () => { 
        const initState={
            uid:'123',
            name:'Fersy'
        
        }
        const action={
            type:'jojpk'
        }
        const state=authReducer(initState, action);
        expect(state).toEqual(initState);
    })
    
})