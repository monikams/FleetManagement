import * as axios from 'axios';
import AuthorizationStore from '../stores/AuthorizationStore';
import AuthorizationActions from '../actions/AuthorizationActions';

class CompaniesService {
    static getCompanies() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token,
            };
            return axios.get('http://localhost:19631/api/companies');
        } else {
            // TO DO: Redirect to login page
        } 
    }
}

export default CompaniesService;