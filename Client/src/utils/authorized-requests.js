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
    window.location.href = baseURL;
}

const setHeaders = (token) => {
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token,
    };
}

export { isLoggedIn, logout, setHeaders };