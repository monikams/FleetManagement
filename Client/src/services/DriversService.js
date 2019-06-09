import { isLoggedIn, logout } from '../utils/authorized-requests.js';
import * as axios from 'axios';
import { apiURL } from '../Constants.js';

class DriversService {

    static async getDrivers(companyId) {   
        if (isLoggedIn()) { 
            const userId = localStorage.getItem('userId');
            return await axios.get(`${apiURL}/api/companies/${companyId}/getdrivers`);
        }

        logout();
    }

    static async getDriver(driverId) {   
        if (isLoggedIn()) { 
            return await axios.get(`${apiURL}/api/drivers/${driverId}`);
        }

        logout();
    }

    static async createDriver(driver){
        if(isLoggedIn()) {
            return await axios.post(`${apiURL}/api/drivers`, driver);
        }

         logout();
    }

     static async editDriver(driver){
        if(isLoggedIn()) {
            return await axios.put(`${apiURL}/api/drivers/${driver.get('Id')}`, driver.toJS());
        }

         logout();
    }

    static async deleteDriver(driverId){
        if(isLoggedIn()) {
            return await axios.delete(`${apiURL}/api/deleteDriver/${driverId}`);
        }

         logout();
    }
}

export default DriversService;