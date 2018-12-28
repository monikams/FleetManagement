import alt from '../alt.js';
import VehiclesService from '../services/VehiclesService';
import { baseURL } from '../Constants.js';

class VehiclesActions {
  constructor() {
    this.generateActions('unloadVehicle');
    this.generateActions('unloadVehicles');
  }

    loadVehicles(companyId) {
        return (dispatch) => {
             VehiclesService.getVehicles(companyId)
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadVehicle(vehicleId) {
        return (dispatch) => {
             VehiclesService.getVehicle(vehicleId)
            .then((response) => {   
                dispatch(response.data);
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
                window.location.href = `${baseURL}/companies/${vehicle.companyId}/vehicles`;                   
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
                window.location.href = `${baseURL}/companies/${vehicle.get('CompanyId')}/vehicles`;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteVehicle(vehicleId, companyId) {
        return (dispatch) => {
            VehiclesService.deleteVehicle(vehicleId)
            .then((response) => {
                this.loadVehicles();
                window.location.href = `${baseURL}/companies/${companyId}/vehicles`;                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(VehiclesActions);