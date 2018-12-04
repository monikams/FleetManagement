import { isLoggedIn, logout, setHeaders } from '../utils/authorized-requests.js';
import * as axios from 'axios';

class DriversService {

    static async getDrivers(companyId) {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`http://localhost:19631/api/companies/${companyId}/drivers`);
        }

        logout();
    }

    static async getDriver(driverId) {   
        if (isLoggedIn()) { 
            return await axios.get(`http://localhost:19631/api/drivers/${driverId}`);
        }

        logout();
    }

    static async createDriver(driver){
        if(isLoggedIn()){
            return await axios.post('http://localhost:19631/api/drivers', driver);
        }

         logout();
    }

     static async editDriver(driver){
        if(isLoggedIn()){
            return await axios.put(`http://localhost:19631/api/drivers/${driver.get('Id')}`, driver.toJS());
        }

         logout();
    }

    static async deleteDriver(driverId){
        if(isLoggedIn()){
            return await axios.delete(`http://localhost:19631/api/deleteDriver?driverId=${driverId}`);
        }

         logout();
    }
}

export default DriversService;