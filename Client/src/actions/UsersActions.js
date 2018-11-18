import alt from '../alt.js';
import UsersService from '../services/UsersService';

class UsersActions {
	constructor() {
		// Here add the actions which will be invoked by components
        // but won't have implementation in the actions file
	}

    loadUsers() {
        return (dispatch) => {
             UsersService.getUsers()
            .then((response) => {    
                dispatch(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
        }
    }
}

export default alt.createActions(UsersActions);