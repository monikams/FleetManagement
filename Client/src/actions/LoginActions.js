import alt from '../alt.js';
import LoginService from '../services/LoginService';

class LoginActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    loginUser(user) {
        return (dispatch) => {
            LoginService.loginUser(user)
            .then((response) => {
                dispatch(response.data);
            })
            .catch((error) => {
                // TO DO
            });
        }
    } 
}

export default alt.createActions(LoginActions);