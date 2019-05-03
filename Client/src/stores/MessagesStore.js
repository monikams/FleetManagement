import alt from '../alt.js';
import MessagesActions from '../actions/MessagesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class MessagesStore {
    constructor() {
        this.bindActions(MessagesActions);
        this.state = new Immutable.Map({
            showErrorMessage: false,
        });
    }

    setShowErrorMessage(errorMessage) {
        this.setState(this.state.set('showErrorMessage', true).set('errorMessage', errorMessage));
    }

    static getShowErrorMessage() {
        return this.getState().get('showErrorMessage');
    }

    static getErrorMessage() {
        return this.getState().get('errorMessage');
    }

}

export default alt.createStore(ImmutableUtil(MessagesStore));