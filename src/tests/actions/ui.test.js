import '../../actions/ui';
import { removeError, setError,startLoading, finishLoading } from '../../actions/ui';
import {types} from '../../types/types';
describe('Pruebas en ui.js', ()=>{
    test('should do all actions ok', () => { 
        const action=setError('Flamingosis');
        expect(action).toEqual({
            type:types.uiSetError,
            payload:'Flamingosis'
        })
        const actionRem=removeError('Flamingosis');
        expect(actionRem).toEqual({
            type:types.uiRemoveError
        })
        const actionStar=startLoading('Flamingosis');
        expect(actionStar).toEqual({
            type:types.uiStartLoading,
        })
        const actionFinish=finishLoading('Flamingosis');
        expect(actionFinish).toEqual({
            type:types.uiFinishLoading
        })
    })
})