import * as axios from 'axios';

class LoginService {
    
    static loginUser(user) {
        return axios.post('http://localhost:19631/token', user);
    }
}

export default LoginService;