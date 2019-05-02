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

    setShowErrorMessage() {
        this.setState(this.state.set('showErrorMessage', true));
    }

    static getShowErrorMessage() {
        return this.getState().get('showErrorMessage');
    }

}

export default alt.createStore(ImmutableUtil(MessagesStore));