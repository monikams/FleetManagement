import alt from '../alt.js';
import TelematicsService from '../services/TelematicsService';
import { baseURL } from '../Constants.js';

class TelematicsActions {
  constructor() {
     this.generateActions('unloadTelematicsData');
     this.generateActions('unloadTelematicsDataHistory');
  }

    loadTelematicsData(vehicleId) {
        return (dispatch) => {
             TelematicsService.getTelematicsData(vehicleId)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }

    loadTelematicsDataHistory(vehicleId, period) {
        return (dispatch) => {
             TelematicsService.getTelematicsDataHistory(vehicleId, period)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }
}

export default alt.createActions(TelematicsActions);