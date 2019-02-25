import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../axios';
import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

function* addUser({ user, resolve, reject }){
  try{
    let newUser = yield call([axios,axios.post], '/users',user);
    if(!!newUser.data && newUser.data.ok){
        yield put({ type: USER_ACTION_TYPES.ADD_USER_SUCCESS, payload: newUser.data });
        resolve(newUser.data)
        yield put({ type: USER_ACTION_TYPES.GET_USERS });

    }else{
        yield put({ type: USER_ACTION_TYPES.ADD_USER_FAILED,payload: 'Something went wrong please try again!' });
        reject(newUser.data)
    }
  }catch(e){
    yield put({ type: USER_ACTION_TYPES.ADD_USER_FAILED,payload: 'Something went wrong please try again!' });
    reject({ok: false, message:'Something went wrong please try again!'})
  }
}

export function* addUserWatcher(){
    yield takeLatest(USER_ACTION_TYPES.ADD_USER, addUser);
}