import alt from '../alt.js';
import DriversActions from '../actions/DriversActions.js'
import Immutable from 'immutable';
import ImmutableUtil from 'alt-utils/lib/ImmutableUtil.js';

class DriversStore {
    constructor() {
        this.bindActions(DriversActions);
        this.state = new Immutable.Map({
            drivers: Immutable.List(),
            driver: Immutable.Map(),
        });

        this.defaultDriver = Immutable.Map({
            Id: '',
            Name: '',
            Email: '',
            Address: '',
            Telephone: '',
        });
    }

    loadDrivers(drivers) {
        this.setState(this.state.set('drivers', Immutable.List(drivers)));
    }

    unloadDrivers() {
        this.setState(this.state.set('drivers', Immutable.List()));
    }

    loadDriver(driver) {
        this.setState(this.state.set('driver', Immutable.Map(driver)));
    }

    unloadDriver() {
        this.setState(this.state.set('driver', this.defaultDriver));
    }

    static getDrivers() {
        return this.getState().get('drivers');
    }

     static getDriver() {
        return this.getState().get('driver');
    }
}

export default alt.createStore(ImmutableUtil(DriversStore));