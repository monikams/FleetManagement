import alt from '../alt.js';
import ServicesService from '../services/ServicesService';
import { baseURL } from '../Constants.js';

class ServicesActions {
  constructor() {
    this.generateActions('unloadServices');
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

    createService(service, companyId) {
        return (dispatch) => {
            ServicesService.createService(service)
            .then((response) => {
                window.location.href = `${baseURL}/companies/${companyId}/vehicles/${service.vehicleId}/services`;
                this.loadServices(service.vehicleId);                   
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    
}

export default alt.createActions(ServicesActions);