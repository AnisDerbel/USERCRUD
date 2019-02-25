import { call, put, takeLatest } from "redux-saga/effects";
import axios from '../axios';
import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

function* editUser({ user, resolve, reject }){
  try{

    let editUser = yield call([axios,axios.put], `/users/${user.id}`, user );
    if(!!editUser.data && editUser.data.ok ){
        yield put({ type: USER_ACTION_TYPES.EDIT_USER_SUCCESS, payload:editUser.data });
        yield put({ type: USER_ACTION_TYPES.GET_USERS });
        resolve(editUser.data)
    }else{
        yield put({ type: USER_ACTION_TYPES.EDIT_USER_FAILED, payload: 'Something went wrong please try again!' });
        reject({ok: false, message: 'Something went wrong please try again!'})
    }
  }catch(e){
    console.log(e)
    yield put({ type: USER_ACTION_TYPES.EDIT_USER_FAILED, payload: 'Something went wrong please try again!' });
    reject({ok: false, message: 'Something went wrong please try again!'})
  }
}

export function* editUserWatcher(){
    yield takeLatest(USER_ACTION_TYPES.EDIT_USER, editUser);
}