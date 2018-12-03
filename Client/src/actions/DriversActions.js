import alt from '../alt.js';
import DriversService from '../services/DriversService';
import { baseURL } from '../Constants.js';

class DriversActions {
  constructor() {
    this.generateActions('unloadDriver');
  }

    loadDrivers() {
        return (dispatch) => {
             DriversService.getDrivers()
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadDriver(driverId, clearList) {
        return (dispatch) => {
             DriversService.getDriver(driverId)
            .then((response) => {   
                dispatch({ driver: response.data, clearList });
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
                window.location.href = baseURL + '/drivers';                   
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
                window.location.href = baseURL + '/drivers';                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteDriver(driverId) {
        return (dispatch) => {
            DriversService.deleteDriver(driverId)
            .then((response) => {
                this.loadDrivers();                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(DriversActions);