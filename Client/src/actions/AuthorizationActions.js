import alt from '../alt.js';
import AuthorizationService from '../services/AuthorizationService';
import { baseURL } from '../Constants.js';

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
                console.log(error);
            });
        }
    }

     loginUser(user) {
        return (dispatch) => {
            AuthorizationService.loginUser(user)
            .then((response) => { 
                localStorage.setItem('token', response.data.access_token);
                window.location.href = baseURL + '/companies';           
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }  
}

export default alt.createActions(AuthorizationActions);