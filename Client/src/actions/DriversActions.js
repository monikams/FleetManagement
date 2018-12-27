import alt from '../alt.js';
import DriversService from '../services/DriversService';
import { baseURL } from '../Constants.js';

class DriversActions {
  constructor() {
    this.generateActions('unloadDriver');
    this.generateActions('unloadDrivers');
  }

    loadDrivers(companyId) {
        return (dispatch) => {
             DriversService.getDrivers(companyId)
            .then((response) => {   
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }
    
    loadDriver(driverId) {
        return (dispatch) => {
             DriversService.getDriver(driverId)
            .then((response) => {   
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

     createDriver(driver){
        return (dispatch) => {
            DriversService.createDriver(driver)
            .then((response) => {
                this.loadDrivers();
                window.location.href = `${baseURL}/companies/${driver.companyId}`;                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    editDriver(driver){
        return (dispatch) => {
            DriversService.editDriver(driver)
            .then((response) => {
                this.loadDrivers();
                window.location.href = `${baseURL}/companies/${driver.get('CompanyId')}`;                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteDriver(driverId, companyId) {
        return (dispatch) => {
            DriversService.deleteDriver(driverId)
            .then((response) => {
                this.loadDrivers();
                window.location.href = `${baseURL}/companies/${companyId}`;                    
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(DriversActions);