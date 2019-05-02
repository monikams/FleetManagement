import alt from '../alt.js';

class MessagesActions {
	constructor() {
		this.generateActions('setShowErrorMessage');
		this.generateActions('getShowErrorMessage');
	}
}

export default alt.createActions(MessagesActions);