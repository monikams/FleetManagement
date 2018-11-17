import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class CompaniesService {
    static async getCompanies() {
        const token = localStorage.getItem('token');
        
        if (!isLoggedIn()) { 
             logout();
             return;
        }
    
        setHeaders(token);
        return await axios.get('http://localhost:19631/api/companies')
    }
}

export default CompaniesService;