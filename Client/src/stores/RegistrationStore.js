import alt from '../alt.js';
import RegistrationActions from '../actions/RegistrationActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class RegistrationStore {
    constructor() {
        this.bindActions(RegistrationActions);
        this.state = new Immutable.Map({
          users: Immutable.List(),
        });
    }

    registerUser(newUser) {
        const immutableCreatedUser = Immutable.fromJS(newUser);
        this.setState(this.state.update("users", usersList => usersList.push(immutableCreatedUser)));             
    }
}

export default alt.createStore(ImmutableUtil(RegistrationStore));