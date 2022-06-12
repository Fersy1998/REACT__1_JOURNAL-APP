import { types } from "../types/types";

/*
    state={
        uid:'9y78iyyigi877',
        name:'FERSY'
    }
*/



export const authReducer = (state={}, action) => {
  switch (action.type) {
      case types.login:
          
          return {
            uid:action.payload.uid,
            name: action.payload.displayname
          }
    
    case types.logout:
        return {}
      default:
          return state;
  }
}
