import alt from '../alt.js';
import ServicesActions from '../actions/ServicesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class ServicesStore {
    constructor() {
        this.bindActions(ServicesActions);
        this.state = new Immutable.Map({
            services: Immutable.List(),
        }); 
    }

    loadServices(services) {
        this.setState(this.state.set('services', Immutable.List(services)));
    }

    static getServices() {
        return this.getState().get('services');
    }

}

export default alt.createStore(ImmutableUtil(ServicesStore));