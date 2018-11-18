import alt from '../alt.js';
import UsersActions from '../actions/UsersActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class UsersStore {
    constructor() {
        this.bindActions(UsersActions);
        this.state = new Immutable.Map({
            users: Immutable.List(),
        });
    }

    loadUsers(users) {
        this.setState(this.state.set("users", Immutable.List(users)));
    }

    static getUsers() {
        return this.getState().get("users");
    }
}

export default alt.createStore(ImmutableUtil(UsersStore));