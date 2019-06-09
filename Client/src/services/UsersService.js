import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class UsersService {
    
    static async getUsers() {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/users`);
        }

        logout();
    }

     static async getUser(userId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/users/${userId}`);
        }

        logout();
    }
}

export default UsersService;