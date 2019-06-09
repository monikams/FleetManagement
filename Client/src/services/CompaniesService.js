import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class CompaniesService {

    static async getCompanies() {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`${apiURL}/api/userCompanies/${userId}`);
        }

        logout();
    }

    static async getCompany(companyId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/companies/${companyId}`);
        }

        logout();
    }

    static async createCompany(company) {
        if(isLoggedIn()){
            return await axios.post(`${apiURL}/api/companies`, company);
        }

         logout();
    }

     static async editCompany(company) {
        if(isLoggedIn()){
            return await axios.put(`${apiURL}/api/companies/${company.get('Id')}`, company.toJS());
        }

         logout();
    }

    static async deleteCompany(companyId) {
        if(isLoggedIn()){
            return await axios.delete(`${apiURL}/api/deleteCompany/${companyId}`);
        }

         logout();
    }
}

export default CompaniesService;