import alt from '../alt.js';
import ServicesActions from '../actions/ServicesActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class ServicesStore {
    constructor() {
        this.bindActions(ServicesActions);
        this.state = new Immutable.Map({
            services: Immutable.List(),
            service: Immutable.Map(),
        }); 
        
        this.defaultService = Immutable.Map({
            Id: '',
            Name: '',
            Description: '',
            BasedOn: '',
            MileageRule: 0,
            MileageReminder: 0,
            TimeRule: 0,
            TimeRuleEntity: 1,
            TimeReminder: 0,
            TimeReminderEntity: 1,
        });
    }

    loadServices(services) {
        this.setState(this.state.set('services', Immutable.List(services)));
    }

    loadService(service) {
        this.setState(this.state.set('service', Immutable.Map(service)));
    }

    unloadService() {
        this.setState(this.state.set('service', this.defaultService));
    }

    static getServices() {
        return this.getState().get('services');
    }

    static getService() {
        return this.getState().get('service');
    }

}

export default alt.createStore(ImmutableUtil(ServicesStore));