import {types} from '../../types/types';

describe('Pruebas en types.js', ()=>{
    test('should say types is ok', () => { 
        expect(types.login).toBe('[auth] Login');
        expect(types).toEqual({
            login: '[auth] Login',
            logout: '[auth] Logout',
            
            uiSetError: '[UI] set Error',
            uiRemoveError: '[UI] remove Error',
            
            uiStartLoading:'[UI] start Loading',
            uiFinishLoading:'[UI] finish Loading',
            
            notesAddNew:'[Notes] new Note',
            notesActive:'[Notes] set active note',
            notesLoad:'[Notes] notes load',
            notesUpdated:'[Notes] updated note',
            notesFileURL:'[Notes] Updated image URL',
            notesDelete:'[Notes] delete note',
            notesLogOutCleaning:'[Notes] Logout cleaning'
            
        });
    })
}) 