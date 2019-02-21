import axios from 'axios';

const setAuthToken = token => {
  // check if we have a token
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorized'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorized'];
  }
}

export default setAuthToken;