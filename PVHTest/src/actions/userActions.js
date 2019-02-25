import { USER_ACTION_TYPES } from '../actiontypes/userActionTypes'

export const  getUserList = () => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_ACTION_TYPES.GET_USERS,
      resolve, 
      reject
    });      
  });

}

export const  addUser = (user) => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_ACTION_TYPES.ADD_USER,
      user,
      resolve, 
      reject
    });      
  });

}

export const  editUser = (user) => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_ACTION_TYPES.EDIT_USER,
      user,
      resolve, 
      reject
    });      
  });

}

export const  deleteUser = (userId) => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: USER_ACTION_TYPES.DELETE_USER,
      userId,
      resolve, 
      reject
    });      
  });

}