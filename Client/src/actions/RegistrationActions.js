import alt from '../alt.js';
import RegistrationService from '../services/RegistrationService';

class RegistrationActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    registerUser(newUser) {
        return (dispatch) => {
            RegistrationService.registerUser(newUser)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
                // TO DO
            });
        }
    } 
}

export default alt.createActions(RegistrationActions);