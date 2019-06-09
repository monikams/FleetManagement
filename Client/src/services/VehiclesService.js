import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class VehiclesService {

    static async getVehicles(companyId) {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`${apiURL}/api/companies/${companyId}/vehicles`);
        }

        logout();
    }

    static async getVehicle(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/vehicles/${vehicleId}`);
        }

        logout();
    }

    static async createVehicle(vehicle){
        if(isLoggedIn()){
            return await axios.post(`${apiURL}/api/vehicles`, vehicle);
        }

         logout();
    }

     static async editVehicle(vehicle){
        if(isLoggedIn()){
            return await axios.put(`${apiURL}/api/vehicles/${vehicle.get('Id')}`, vehicle.toJS());
        }

         logout();
    }

    static async deleteVehicle(vehicleId){
        if(isLoggedIn()){
            return await axios.delete(`${apiURL}/api/deleteVehicle/${vehicleId}`);
        }

         logout();
    }
}

export default VehiclesService;