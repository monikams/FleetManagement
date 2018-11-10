import alt from '../alt.js';
import AuthorizationService from '../services/AuthorizationService';

class AuthorizationActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    registerUser(newUser) {
        return (dispatch) => {
            AuthorizationService.registerUser(newUser)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
                // TO DO
            });
        }
    }

     getAuthToken(user) {
        return (dispatch) => {
            AuthorizationService.getAuthToken(user)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
                // TO DO
            });
        }
    }  
}

export default alt.createActions(AuthorizationActions);