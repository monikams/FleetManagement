import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class ServicesService {

    static async getServices(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/vehicles/${vehicleId}/services`);
        }

        logout();
    }

    static async getService(serviceId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/services/${serviceId}`);
        }

        logout();
    }

    static async createService(service) {
        if(isLoggedIn()){
            return await axios.post('http://localhost:19631/api/services', service);
        }

         logout();
    }

    static async editService(service) {
        if(isLoggedIn()) {
            return await axios.put(`http://localhost:19631/api/services/${service.get('Id')}`, service.toJS());
        }

         logout();
    }

    static async deleteService(serviceId) {
        if(isLoggedIn()){
            return await axios.delete(`http://localhost:19631/api/deleteService/${serviceId}`);
        }

         logout();
    }

    static async markServiceAsDone(serviceId) {
        if(isLoggedIn()) {
            return await axios.put(`http://localhost:19631/api/services/markAsDone/${serviceId}`);
        }

         logout();
    }
}

export default ServicesService;