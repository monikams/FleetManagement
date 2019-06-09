import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import "babel-polyfill";
import { apiURL } from '../Constants.js';

class ServicesService {

    static async getServices(vehicleId, filterByOverdue) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/vehicles/${vehicleId}/services/${filterByOverdue}`);
        }

        logout();
    }

    static async getService(serviceId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/services/${serviceId}`);
        }

        logout();
    }

    static async createService(service) {
        if(isLoggedIn()){
            return await axios.post(`${apiURL}/api/services`, service);
        }

         logout();
    }

    static async editService(service) {
        if(isLoggedIn()) {
            return await axios.put(`${apiURL}/api/services/${service.get('Id')}`, service.toJS());
        }

         logout();
    }

    static async deleteService(serviceId) {
        if(isLoggedIn()){
            return await axios.delete(`${apiURL}/api/deleteService/${serviceId}`);
        }

         logout();
    }

    static async markServiceAsDone(serviceId) {
        if(isLoggedIn()) {
            return await axios.put(`${apiURL}/api/services/markAsDone/${serviceId}`);
        }

         logout();
    }
}

export default ServicesService;