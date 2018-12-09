import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class VehiclesService {

    static async getVehicles(companyId) {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`http://localhost:19631/api/companies/${companyId}/vehicles`);
        }

        logout();
    }

    static async getVehicle(vehicleId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/vehicles/${vehicleId}`);
        }

        logout();
    }

    static async createVehicle(vehicle){
        if(isLoggedIn()){
            return await axios.post('http://localhost:19631/api/vehicles', vehicle);
        }

         logout();
    }

     static async editVehicle(vehicle){
        if(isLoggedIn()){
            return await axios.put(`http://localhost:19631/api/vehicles/${vehicle.get('Id')}`, vehicle.toJS());
        }

         logout();
    }

    static async deleteVehicle(vehicleId){
        if(isLoggedIn()){
            return await axios.delete(`http://localhost:19631/api/deleteVehicle?vehicleId=${vehicleId}`);
        }

         logout();
    }
}

export default VehiclesService;