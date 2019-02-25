import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../axios';
import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

function* getUserList({ resolve, reject }){
    try{
      let users = yield call([axios,axios.get], '/users');
      if(!!users.data && users.data.ok){
          yield put({ type: USER_ACTION_TYPES.GET_USERS_SUCCESS, payload:users.data.list });
          resolve(users.data.list)
      }else{
          yield put({ type: USER_ACTION_TYPES.GET_USERS_FAILED,payload: 'Something went wrong please try again!' });
          reject({ok: false, message: 'Something went wrong please try again!'})
      }
    }catch(e){
      yield put({ type: USER_ACTION_TYPES.GET_USERS_FAILED,payload: 'Something went wrong please try again!' });
      reject({ok: false, message: 'Something went wrong please try again!'})
    }
}

export function* getUserListWatcher(){
    yield takeLatest(USER_ACTION_TYPES.GET_USERS, getUserList);
}