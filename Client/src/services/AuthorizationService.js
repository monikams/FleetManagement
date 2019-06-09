import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class AuthorizationService {
    
    static registerUser(newUser) {
        return axios.post(`${apiURL}/api/account/register`, newUser);
    }

    static loginUser(user) {
        axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
         };

         var parsedData = Object.keys(user).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
        }).join('&');

      return axios.post(`${apiURL}/token`, parsedData);       
    }
}

export default AuthorizationService;