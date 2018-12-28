import alt from '../alt.js';
import UsersService from '../services/UsersService';

class UsersActions {
	constructor() {
        this.generateActions('unloadUsers');
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

    loadUser(userId) {
        return (dispatch) => {
             UsersService.getUser(userId)
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