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

    static async getCompany(companyId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/companies/${companyId}`);
        }

        logout();
    }

    static async createCompany(company){
        if(isLoggedIn()){
            return await axios.post('http://localhost:19631/api/companies', company);
        }

         logout();
    }

     static async editCompany(company){
        if(isLoggedIn()){
            return await axios.put(`http://localhost:19631/api/companies/${company.get('Id')}`, company.toJS());
        }

         logout();
    }

    static async deleteCompany(companyId){
        if(isLoggedIn()){
            return await axios.delete(`http://localhost:19631/api/deleteCompany?companyId=${companyId}`);
        }

         logout();
    }
}

export default CompaniesService;