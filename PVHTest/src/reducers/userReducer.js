
import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

const initialState = {
   users:[],
   error : ''
}

export function  userReducer (state = initialState, {type, payload}){

   switch(type){

      case USER_ACTION_TYPES.GET_USERS_SUCCESS:
        return { ...state, users: payload };
        
      case USER_ACTION_TYPES.ADD_USER_FAILED:
      case USER_ACTION_TYPES.EDIT_USER_FAILED:
      case USER_ACTION_TYPES.DELETE_USER_FAILED:
        return { ...state, error: payload };

      default:
          return state;
   }
};