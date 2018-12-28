import alt from '../alt.js';
import UsersActions from '../actions/UsersActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class UsersStore {
    constructor() {
        this.bindActions(UsersActions);
        this.state = new Immutable.Map({
            users: Immutable.List(),
            user: Immutable.Map(),
        });
    }

    loadUsers(users) {
        this.setState(this.state.set('users', Immutable.List(users)));
    }

    loadUser(user) {
        this.setState(this.state.set('user', Immutable.Map(user)));
    }

    unloadUsers() {
        this.setState(this.state.set('users', Immutable.List()));
    }

    static getUsers() {
        return this.getState().get('users');
    }

     static getUser() {
        return this.getState().get('user');
    }
}

export default alt.createStore(ImmutableUtil(UsersStore));