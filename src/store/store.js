import { configureStore} from '@reduxjs/toolkit'
import { default as ReduxThunk } from 'redux-thunk';
import thunk from 'redux-thunk'
import logger from 'redux-thunk'
import { applyMiddleware, combineReducers, compose} from 'redux'
import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';
//const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewareEnhancer = applyMiddleware(thunk);
const reducers=combineReducers({
    auth:authReducer,
    ui:uiReducer,
    notes:notesReducer
})

export const store=configureStore({reducer:reducers})
//export const store=configureStore({reducer: reducers, middleware: [middlewareEnhancer, composeEnhancers]})
//export const store=configureStore({reducer:reducers});
//export const store=configureStore({reducer: reducers}, {middleware: [middlewareEnhancer, composeEnhancers]})
//export const store=configureStore({reducer:reducers, middleware: composeEnhancers(applyMiddleware(thunk))});
//export const store=configureStore({reducer:reducers}, composeEnhancers(applyMiddleware(thunk)));
//export const store=createStore({reducer:reducers, middleware: composeEnhancers(applyMiddleware(thunk))});
//export const store=configureStore({reducer:reducers}, composeEnhancers(applyMiddleware(thunk)));
//export const store=configureStore({reducer:reducers}, {middleware: [composeEnhancers(applyMiddleware(thunk))]});
//export const store=configureStore({reducer: reducers,
//  middleware: [thunk, logger, composeEnhancers]});
//export const store=configureStore({reducer: reducers, undefined, middleware: [thunk, applyMiddleware(thunk), composeEnhancers]});