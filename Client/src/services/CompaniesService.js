import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class CompaniesService {
    static async getCompanies() {   
        if (isLoggedIn()) { 
            return await axios.get('http://localhost:19631/api/companies');
        }

        logout();
    }
}

export default CompaniesService;