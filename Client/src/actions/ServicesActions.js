import alt from '../alt.js';
import ServicesService from '../services/ServicesService';
import { baseURL } from '../Constants.js';

class ServicesActions {
  constructor() {
    this.generateActions('unloadServices');
    this.generateActions('unloadService');
  }

    loadServices(vehicleId) {
        return (dispatch) => {
             ServicesService.getServices(vehicleId)
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadService(serviceId) {
        return (dispatch) => {
             ServicesService.getService(serviceId)
            .then((response) => {   
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    createService(service, companyId) {
        return (dispatch) => {
            ServicesService.createService(service)
            .then((response) => {
                window.location.href = `${baseURL}/companies/${companyId}/vehicles/${service.vehicleId}`;
                this.loadServices(service.vehicleId);                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    editService(service, companyId) {
        return (dispatch) => {
            ServicesService.editService(service)
            .then((response) => {
                this.loadServices(service.get('VehicleId'));
                window.location.href = `${baseURL}/companies/${companyId}/vehicles/${service.get('VehicleId')}`;                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    deleteService(vehicleId, serviceId) {
        return (dispatch) => {
            ServicesService.deleteService(serviceId)
            .then((response) => {
                this.loadServices(vehicleId);                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}

export default alt.createActions(ServicesActions);