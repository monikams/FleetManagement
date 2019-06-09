import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class TelematicsService {

    static async getTelematicsData(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/vehicles/${vehicleId}/telematicsData`);
        }

        logout();
    }

    static async getTelematicsDataHistory(vehicleId, period) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/vehicles/${vehicleId}/telematicsDataHistory/${period}`);
        }

        logout();
    }

    static async getAverageSpeed(vehicleId, period) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/vehicles/${vehicleId}/telematicsDataHistory/averageSpeed/${period}`);
        }

        logout();
    }
}

export default TelematicsService;