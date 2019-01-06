import * as axios from 'axios';
import moment from 'moment';
import { baseURL } from '../Constants.js';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const expirationDate = moment(expiration).format('X');
    const currentDate = moment().format('X');
    const isLoggedIn = token && currentDate < expirationDate;
    if (isLoggedIn)
    {
       setHeaders(token);   
    }
    return isLoggedIn;
}    

const logout = () => {    
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    window.location.href = baseURL;
}

const setHeaders = token => {
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
    };
}

const setLocalStorageItems = response => {
   localStorage.setItem('token', response.data.access_token);
   localStorage.setItem('expiration', response.data['.expires']);
   localStorage.setItem('userId', response.data.user_id);
}


export { isLoggedIn, logout, setHeaders, setLocalStorageItems };