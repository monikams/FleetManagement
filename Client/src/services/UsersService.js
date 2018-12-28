import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class UsersService {
    
    static async getUsers() {   
        if (isLoggedIn()) { 
            return await axios.get('http://localhost:19631/api/users');
        }

        logout();
    }

     static async getUser(userId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/users/${userId}`);
        }

        logout();
    }
}

export default UsersService;