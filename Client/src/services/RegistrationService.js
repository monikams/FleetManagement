import * as axios from 'axios';

class RegisrationService {
    
    static registerUser(newUser) {
        return axios.post('http://localhost:19631/api/account/register', newUser);
    }
}

export default RegisrationService;