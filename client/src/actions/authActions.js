import {
  GET_ERRORS,
  SET_CURRENT_USER
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        // payload is assumed Data, which is the errors data
        payload: err.response.data
      })
    );
};


// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // save to localStorage
      const {
        token
      } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decodedUser = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decodedUser));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        // payload is assumed Data
        payload: err.response.data
      })
    );
}


// set logged in user
export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  }
}


export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  // remove auth header for future request
  setAuthToken(false);
  // Set current user to an empty obj {} which will set isAuthenticated to false 
  dispatch(setCurrentUser({}));
}