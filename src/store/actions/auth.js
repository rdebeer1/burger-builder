import * as actionTypes from './actionTypes';
import axios from 'axios';

const config = require('../../config')
const key = config.API_KEY

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
    }
    axios.post(url, authData)
    .then(response => {
      console.log(authSuccess(response.data))
      dispatch(authSuccess(response.data))
    })
    .catch(error => {
      console.log(authFail(error))
      dispatch(authFail(error))
    });
  };
};