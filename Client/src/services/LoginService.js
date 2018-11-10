import * as axios from 'axios';

class LoginService {
    
    static loginUser(user) {
        axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
         };

         var parsedData = Object.keys(user).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(user[key])
        }).join('&');

      return axios.post('http://localhost:19631/token', parsedData);       
    }
}

export default LoginService;