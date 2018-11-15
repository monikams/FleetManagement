import * as axios from 'axios';
import AuthorizationStore from '../stores/AuthorizationStore';
import AuthorizationActions from '../actions/AuthorizationActions';
import moment from 'moment';
import { baseURL } from '../Constants.js';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const expirationDate = moment(expiration).format('X');
    const currentDate = moment().format('X');
    const isLoggedIn = token && currentDate < expirationDate;
    return isLoggedIn;
}    

const logout = () => {    
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    window.location.href = baseURL;
}

async function authorizedGet (url) {
        const token = localStorage.getItem('token');
    
        if (isLoggedIn()) { 
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token,
            };
            return await axios.get(url)
        } else {
                logout();
        } 
    };

export { isLoggedIn, logout, authorizedGet };