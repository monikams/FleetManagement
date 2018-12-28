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
}

export default alt.createActions(ServicesActions);