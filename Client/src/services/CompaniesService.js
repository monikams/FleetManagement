import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class CompaniesService {
    static async getCompanies() {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`http://localhost:19631/api/userCompanies/${userId}`);
        }

        logout();
    }
}

export default CompaniesService;