import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class ServicesService {

    static async getServices(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/vehicles/${vehicleId}/services`);
        }

        logout();
    }

}

export default ServicesService;