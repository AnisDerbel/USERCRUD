
import { all } from 'redux-saga/effects';
import { getUserListWatcher } from './getUserListSaga';
import { addUserWatcher } from './addUserSaga';
import { editUserWatcher } from './editUserSaga';
import { deleteUserWatcher } from './deleteUserSaga';

export function* rootSaga(){
    yield all([
      getUserListWatcher(),
      addUserWatcher(),
      editUserWatcher(),
      deleteUserWatcher()
    ])
}