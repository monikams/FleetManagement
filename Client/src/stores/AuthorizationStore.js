import alt from '../alt.js';
import AuthorizationActions from '../actions/AuthorizationActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class AuthorizationStore {
    constructor() {
        this.bindActions(AuthorizationActions);
        //  this.bindListeners({
        //     registerUser: AuthorizationActions.registerUser,
        //     getAuthToken: AuthorizationActions.loginUser,
        //  })
        this.state = new Immutable.Map({
          users: Immutable.List(),
        });
    }

    registerUser(newUser) {
        debugger;
        const immutableCreatedUser = Immutable.fromJS(newUser);
        this.setState(this.state.update("users", usersList => usersList.push(immutableCreatedUser)));             
    }

    getAuthToken(user) {
          debugger;
        // const immutableCreatedUser = Immutable.fromJS(newUser);
        // this.setState(this.state.update("users", usersList => usersList.push(immutableCreatedUser)));             
    }
}

export default alt.createStore(ImmutableUtil(AuthorizationStore));