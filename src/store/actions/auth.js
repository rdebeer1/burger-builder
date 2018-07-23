import * as actionTypes from './actionTypes';
import axios from 'axios';

const config = require('../../config')
const key = config.API_KEY

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
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
      dispatch(authSuccess(response.data.idToken, response.data.localId))
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error))
    });
  };
};