import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../axios';
import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

function* deleteUser({ userId, resolve, reject }){
  try{
    console.log('userId : ',userId)
    let deletedUser = yield call([axios,axios.delete], `/users/${userId}`);
    if(!!deletedUser.data && deletedUser.data.ok){
        yield put({ type: USER_ACTION_TYPES.DELETE_USER_SUCCESS, payload:deletedUser.data });
        yield put({ type: USER_ACTION_TYPES.GET_USERS });
        resolve(deletedUser.data)
    }else{
        yield put({ type: USER_ACTION_TYPES.DELETE_USER_FAILED,payload: 'Something went wrong please try again!' });
        reject({ok: false, message: 'Something went wrong please try again!'})
    }
  }catch(e){
    yield put({ type: USER_ACTION_TYPES.DELETE_USER_FAILED,payload: 'Something went wrong please try again!' });
    reject({ok: false, message: 'Something went wrong please try again!'})
  }
}

export function* deleteUserWatcher(){
    yield takeLatest(USER_ACTION_TYPES.DELETE_USER, deleteUser);
}