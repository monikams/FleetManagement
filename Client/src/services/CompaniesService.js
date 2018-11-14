import { authorizedGet } from '../utils/authorized-requests.js';

class CompaniesService {
    static async getCompanies() {
       await authorizedGet('http://localhost:19631/api/companies');
    }
}

export default CompaniesService;