import * as axios from 'axios';
import AuthorizationStore from '../stores/AuthorizationStore';

class CompaniesService {
    static getCompanies() {
        return axios.get('http://localhost:19631/api/companies');
    }
}

export default CompaniesService;