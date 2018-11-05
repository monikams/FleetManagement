import * as axios from 'axios';

class LoginService {
    
    static loginUser(user) {
        axios.defaults.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
         };
        return axios.post('http://localhost:19631/token', user);
    }
}

export default LoginService;