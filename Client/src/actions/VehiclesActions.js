import alt from '../alt.js';
import VehiclesService from '../services/VehiclesService';
import { baseURL } from '../Constants.js';

class VehiclesActions {
  constructor() {
    this.generateActions('unloadVehicle');
  }

    loadVehicles() {
        return (dispatch) => {
             VehiclesService.getVehicles()
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadVehicle(vehicleId, clearList) {
        return (dispatch) => {
             VehiclesService.getVehicle(vehicleId)
            .then((response) => {   
                dispatch({ vehicle: response.data, clearList });
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

     createVehicle(vehicle){
        return (dispatch) => {
            VehiclesService.createVehicle(vehicle)
            .then((response) => {
                this.loadVehicles();
                window.location.href = baseURL + '/vehicles';                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    editVehicle(vehicle){
        return (dispatch) => {
            VehiclesService.editVehicle(vehicle)
            .then((response) => {
                this.loadVehicles();
                window.location.href = baseURL + '/vehicles';                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteVehicle(vehicleId) {
        return (dispatch) => {
            VehiclesService.deleteVehicle(vehicleId)
            .then((response) => {
                this.loadVehicles();                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(VehiclesActions);