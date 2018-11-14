import * as axios from 'axios';
import AuthorizationStore from '../stores/AuthorizationStore';
import AuthorizationActions from '../actions/AuthorizationActions';
import moment from 'moment';
import { baseURL } from '../Constants.js';

class CompaniesService {
    static async getCompanies() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        const expirationDate = moment(expiration).format('X');
        const currentDate = moment().format('X');

        if (token && currentDate < expirationDate) {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token,
            };
            return await axios.get('http://localhost:19631/api/companies')
        } else {
            window.location.href = baseURL;
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');      
        } 
    }
}

export default CompaniesService;