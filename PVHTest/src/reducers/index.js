import { combineReducers } from 'redux';
import { ActionConst } from 'react-native-router-flux';
import {userReducer}  from '../reducers/userReducer';

const sceneReducer = (state = {}, {type, scene}) => {

    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        case ActionConst.JUMP:
            return { ...state, scene };
        default:
            return state;
    }
};

  const appReducer = combineReducers({
    sceneReducer,
    userReducer
});

export default appReducer;