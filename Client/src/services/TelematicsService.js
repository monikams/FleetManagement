import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class TelematicsService {

    static async getTelematicsData(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/vehicles/${vehicleId}/telematicsData`);
        }

        logout();
    }

    static async getTelematicsDataHistory(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/vehicles/${vehicleId}/telematicsDataHistory`);
        }

        logout();
    }
}

export default TelematicsService;